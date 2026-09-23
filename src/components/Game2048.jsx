/**
 * 2048 小游戏（Hex 导航站内嵌页）
 * - 4x4 棋盘，方向键 / WASD / 触屏滑动控制
 * - 相同数字合并翻倍，拼到 2048 胜利，无空格且无法合并即结束
 * - 最高分存 localStorage
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon2048 } from './Icons'

const SIZE = 4
const STORAGE_KEY = 'hex-2048-best'

const emptyBoard = () => Array.from({ length: SIZE }, () => Array(SIZE).fill(0))

function addTile(board) {
  const cells = []
  board.forEach((row, y) =>
    row.forEach((v, x) => {
      if (!v) cells.push({ x, y })
    })
  )
  if (!cells.length) return board
  const { x, y } = cells[Math.floor(Math.random() * cells.length)]
  const next = board.map((r) => [...r])
  next[y][x] = Math.random() < 0.9 ? 2 : 4
  return next
}

function slideRow(row) {
  const vals = row.filter(Boolean)
  const out = []
  let gain = 0
  for (let i = 0; i < vals.length; i += 1) {
    if (i + 1 < vals.length && vals[i] === vals[i + 1]) {
      out.push(vals[i] * 2)
      gain += vals[i] * 2
      i += 1
    } else {
      out.push(vals[i])
    }
  }
  while (out.length < SIZE) out.push(0)
  return { row: out, gain }
}

function moveBoard(board, dir) {
  let gain = 0
  const next = emptyBoard()
  for (let i = 0; i < SIZE; i += 1) {
    let line = []
    if (dir === 'left' || dir === 'right') line = board[i].slice()
    else line = [0, 1, 2, 3].map((j) => board[j][i])
    if (dir === 'right' || dir === 'down') line = line.reverse()
    const { row, gain: g } = slideRow(line)
    gain += g
    let final = row
    if (dir === 'right' || dir === 'down') final = row.reverse()
    if (dir === 'left' || dir === 'right') next[i] = final
    else final.forEach((v, j) => {
      next[j][i] = v
    })
  }
  const moved = JSON.stringify(next) !== JSON.stringify(board)
  return { board: next, gain, moved }
}

function canMove(board) {
  for (const dir of ['left', 'right', 'up', 'down']) {
    if (moveBoard(board, dir).moved) return true
  }
  return false
}

const CELL_STYLE = (v) => {
  const base = 'grid place-items-center rounded-lg text-[clamp(20px,8vw,40px)] font-bold'
  if (!v) return `${base} bg-white/[0.03]`
  if (v === 2) return `${base} bg-[#3b3244] text-[#f0e9d8]`
  if (v === 4) return `${base} bg-[#4a3f55] text-[#f0e9d8]`
  if (v === 8) return `${base} bg-[#b0653a] text-white`
  if (v === 16) return `${base} bg-[#c07a35] text-white`
  if (v === 32) return `${base} bg-[#d08a2e] text-white`
  if (v === 64) return `${base} bg-[#e09a24] text-white`
  if (v === 128) return `${base} bg-gradient-to-br from-gold to-[#e09a24] text-[#141821]`
  if (v === 256) return `${base} bg-gradient-to-br from-gold to-[#ff7a18] text-[#141821]`
  if (v === 512) return `${base} bg-gradient-to-br from-[#ffd25e] to-[#ff7a18] text-[#141821]`
  return `${base} bg-gradient-to-br from-[#ffe08a] to-[#ff7a18] text-[#141821]`
}

export default function Game2048({ onBack }) {
  const [board, setBoard] = useState(() => addTile(addTile(emptyBoard())))
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem(STORAGE_KEY)) || 0
    } catch {
      return 0
    }
  })
  const [over, setOver] = useState(false)
  const [won, setWon] = useState(false)

  const boardRef = useRef(board)
  const scoreRef = useRef(score)
  const overRef = useRef(over)
  const wonRef = useRef(won)
  const touchStartRef = useRef(null)

  boardRef.current = board
  scoreRef.current = score
  overRef.current = over
  wonRef.current = won

  const reset = useCallback(() => {
    const b = addTile(addTile(emptyBoard()))
    setBoard(b)
    setScore(0)
    setOver(false)
    setWon(false)
    boardRef.current = b
    scoreRef.current = 0
    overRef.current = false
    wonRef.current = false
  }, [])

  const turn = useCallback(
    (dir) => {
      if (overRef.current || wonRef.current) return
      const { board: nb, gain, moved } = moveBoard(boardRef.current, dir)
      if (!moved) return
      const withTile = addTile(nb)
      setBoard(withTile)
      boardRef.current = withTile
      const ns = scoreRef.current + gain
      setScore(ns)
      scoreRef.current = ns
      setBest((b) => {
        const nb2 = Math.max(b, ns)
        try {
          localStorage.setItem(STORAGE_KEY, String(nb2))
        } catch {
          /* ignore */
        }
        return nb2
      })
      if (!wonRef.current && withTile.some((r) => r.includes(2048))) {
        setWon(true)
        wonRef.current = true
      }
      if (!canMove(withTile)) {
        setOver(true)
        overRef.current = true
      }
    },
    []
  )

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
      if (e.key === 'Enter' && (overRef.current || wonRef.current)) reset()
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

  return (
    <div className="animate-fade-up">
      {/* 顶栏 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-gold to-[#ff7a18] text-[#141821] shadow-lg">
            <Icon2048 className="size-6" />
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-4 py-1.5 text-[13px] font-medium text-[#9aa4bf] transition-colors hover:border-gold/50 hover:text-gold"
          >
            ← 返回游戏列表
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
        {won && <span className="text-gold">达成 2048！按 Enter 或点下方按钮再来一局</span>}
        {!won && over && <span className="text-[#ff4d6d]">无路可走，游戏结束 · 按 Enter 或点下方按钮重开</span>}
        {!won && !over && <span>方向键 / WASD / 滑动棋盘移动 · 相同数字合并翻倍</span>}
      </div>

      {/* 棋盘 */}
      <div
        className="mx-auto w-full max-w-[520px] touch-none select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid aspect-square w-full grid-cols-4 gap-2 rounded-2xl border border-line bg-card p-3 shadow-[0_18px_44px_-16px_rgba(0,0,0,.5)]">
          {board.flat().map((v, i) => (
            <div key={i} className={CELL_STYLE(v)}>
              {v || ''}
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作 */}
      <div className="mt-6 flex justify-center gap-3">
        {over || won ? (
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
            onClick={reset}
            className="rounded-full border border-gold/40 bg-gold/10 px-6 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
          >
            重新开始
          </button>
        )}
      </div>
    </div>
  )
}
