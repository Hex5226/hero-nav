/**
 * 贪吃蛇小游戏（Hex 导航站内嵌页）
 * - 20x20 网格，方向键 / WASD / 触屏滑动控制
 * - 撞墙或撞到自己即结束，最高分存 localStorage
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconSnake } from './Icons'

const SIZE = 20
const TICK_MS = 200
const STORAGE_KEY = 'hex-snake-best'

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
}

function randCell() {
  return { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) }
}

function randomFood(snake) {
  let p = randCell()
  while (snake.some((s) => s.x === p.x && s.y === p.y)) p = randCell()
  return p
}

const initSnake = () => [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
]

export default function GamePage({ onBack }) {
  const [snake, setSnake] = useState(initSnake)
  const [food, setFood] = useState(() => randomFood(initSnake()))
  const [dir, setDir] = useState('right')
  const [status, setStatus] = useState('ready') // ready | running | over
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem(STORAGE_KEY)) || 0
    } catch {
      return 0
    }
  })

  const snakeRef = useRef(snake)
  const dirRef = useRef(dir)
  const statusRef = useRef(status)
  const foodRef = useRef(food)
  const scoreRef = useRef(score)
  const touchStartRef = useRef(null)

  snakeRef.current = snake
  dirRef.current = dir
  statusRef.current = status
  foodRef.current = food
  scoreRef.current = score

  const reset = useCallback(() => {
    const s = initSnake()
    setSnake(s)
    setFood(randomFood(s))
    setDir('right')
    setScore(0)
    setStatus('ready')
  }, [])

  const turn = useCallback((d) => {
    if (statusRef.current !== 'running' && statusRef.current !== 'ready') return
    const cur = dirRef.current
    const back = { up: 'down', down: 'up', left: 'right', right: 'left' }
    if (d === cur || back[d] === cur) return
    dirRef.current = d
    setDir(d)
    if (statusRef.current === 'ready') {
      statusRef.current = 'running'
      setStatus('running')
    }
  }, [])

  const step = useCallback(() => {
    if (statusRef.current !== 'running') return
    const s = snakeRef.current
    const d = DIRS[dirRef.current]
    const head = { x: s[0].x + d.x, y: s[0].y + d.y }
    const hitWall = head.x < 0 || head.x >= SIZE || head.y < 0 || head.y >= SIZE
    const hitSelf = s.some((seg) => seg.x === head.x && seg.y === head.y)
    if (hitWall || hitSelf) {
      statusRef.current = 'over'
      setStatus('over')
      const final = scoreRef.current
      setBest((b) => {
        const nb = Math.max(b, final)
        try {
          localStorage.setItem(STORAGE_KEY, String(nb))
        } catch {
          /* ignore */
        }
        return nb
      })
      return
    }
    const ate = head.x === foodRef.current.x && head.y === foodRef.current.y
    const next = [head, ...s]
    if (!ate) next.pop()
    else {
      setScore(scoreRef.current + 10)
      scoreRef.current += 10
      setFood(randomFood(next))
    }
    snakeRef.current = next
    setSnake(next)
  }, [])

  useEffect(() => {
    const id = setInterval(step, TICK_MS)
    return () => clearInterval(id)
  }, [step])

  useEffect(() => {
    const onKey = (e) => {
      const map = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        w: 'up',
        s: 'down',
        a: 'left',
        d: 'right',
        W: 'up',
        S: 'down',
        A: 'left',
        D: 'right',
      }
      const d = map[e.key]
      if (d) {
        e.preventDefault()
        turn(d)
      }
      if (e.key === 'Enter' && statusRef.current === 'over') reset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [turn, reset])

  const onTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e) => {
    const s = touchStartRef.current
    if (!s) return
    const dx = e.changedTouches[0].clientX - s.x
    const dy = e.changedTouches[0].clientY - s.y
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
    if (Math.abs(dx) > Math.abs(dy)) turn(dx > 0 ? 'right' : 'left')
    else turn(dy > 0 ? 'down' : 'up')
    touchStartRef.current = null
  }

  const grid = []
  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      const isHead = snake[0] && snake[0].x === x && snake[0].y === y
      const isBody = !isHead && snake.some((s) => s.x === x && s.y === y)
      const isFood = food.x === x && food.y === y
      let cls = 'bg-white/[0.02]'
      if (isHead) cls = 'bg-gradient-to-br from-gold to-[#ff7a18] shadow-[0_0_10px_rgba(240,185,11,.55)]'
      else if (isBody) cls = 'bg-gold/70'
      else if (isFood) cls = 'bg-[#ff4d6d] rounded-full shadow-[0_0_8px_rgba(255,77,109,.6)]'
      grid.push(<div key={`${x}-${y}`} className={cls} />)
    }
  }

  return (
    <div className="animate-fade-up">
      {/* 顶栏 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#2dd4a0] to-[#38bdf8] text-[#141821] shadow-lg">
            <IconSnake className="size-6" />
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-4 py-1.5 text-[13px] font-medium text-[#9aa4bf] transition-colors hover:border-gold/50 hover:text-gold"
          >
            ← 返回导航
          </button>
        </div>
        <div className="flex items-center gap-5 text-right">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#4d5568]">分数</div>
            <div className="font-display text-2xl font-bold text-gold">{score}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#4d5568]">最高</div>
            <div className="font-display text-2xl font-bold text-[#e6edf3]">{best}</div>
          </div>
        </div>
      </div>

      {/* 状态提示 */}
      <div className="mb-4 flex items-center justify-center gap-2 text-[13px] text-[#7f8aa3]">
        {status === 'ready' && <span>按方向键 / WASD / 滑动开始</span>}
        {status === 'running' && <span className="text-gold">游戏中 · Enter 无效，点击重开</span>}
        {status === 'over' && (
          <span className="text-[#ff4d6d]">
            游戏结束，得分 {score} · 按 Enter 或点下方按钮重开
          </span>
        )}
      </div>

      {/* 棋盘 */}
      <div
        className="mx-auto w-full max-w-[520px] touch-none select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="grid aspect-square w-full gap-px rounded-2xl border border-line bg-card p-2 shadow-[0_18px_44px_-16px_rgba(0,0,0,.5)]"
          style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
        >
          {grid}
        </div>
      </div>

      {/* 底部操作 */}
      <div className="mt-6 flex justify-center gap-3">
        {status === 'over' ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-gradient-to-r from-gold to-[#ff7a18] px-6 py-2 text-sm font-semibold text-[#141821] shadow-[0_10px_24px_-10px_rgba(240,185,11,.6)] transition-transform hover:scale-105"
          >
            再来一局
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (statusRef.current === 'ready' || statusRef.current === 'running') {
                statusRef.current = 'running'
                setStatus('running')
              }
            }}
            className="rounded-full border border-gold/40 bg-gold/10 px-6 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
          >
            {status === 'ready' ? '开始游戏' : '继续'}
          </button>
        )}
      </div>
    </div>
  )
}
