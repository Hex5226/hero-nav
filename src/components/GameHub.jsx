/**
 * 小游戏大厅（Hex 导航站内嵌页）
 * - 展示可选游戏列表，点击卡片进入对应游戏
 * - 新增游戏只需在此追加卡片
 */
import { IconSnake, Icon2048 } from './Icons'

const GAMES = [
  {
    id: 'snake',
    icon: IconSnake,
    title: '贪吃蛇',
    desc: '经典街机 · 方向键 / WASD / 滑动',
    accent: 'from-[#2dd4a0] to-[#38bdf8]',
  },
  {
    id: '2048',
    icon: Icon2048,
    title: '2048',
    desc: '数字合并 · 拼出 2048 方块',
    accent: 'from-gold to-[#ff7a18]',
  },
]

export default function GameHub({ onBack, onSelect }) {
  return (
    <div className="animate-fade-up">
      {/* 顶栏 */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-4 py-1.5 text-[13px] font-medium text-[#9aa4bf] transition-colors hover:border-gold/50 hover:text-gold"
        >
          ← 返回导航
        </button>
        <span className="text-[11px] uppercase tracking-[0.22em] text-[#4d5568]">Game Hub</span>
      </div>

      {/* 标题 */}
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="text-gradient-gold">小游戏</span>
        </h2>
        <p className="mt-3 text-[14px] text-[#9aa4bf]">摸鱼也要讲基本法，挑一款开玩</p>
      </div>

      {/* 游戏列表 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {GAMES.map((g, i) => {
          const Icon = g.icon
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onSelect(g.id)}
              className="group relative overflow-hidden rounded-2xl border border-line bg-card/70 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_18px_44px_-16px_rgba(0,0,0,.55)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* 角标渐变光晕 */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br ${g.accent} opacity-[0.12] blur-2xl transition-opacity group-hover:opacity-25`}
              />
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${g.accent} text-[#141821] shadow-lg`}
                >
                  <Icon className="size-6" />
                </div>
                <span className="rounded-full border border-line bg-black/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-[#7f8aa3]">
                  Play
                </span>
              </div>
              <h3 className="font-display mt-5 text-xl font-bold text-[#e6edf3]">{g.title}</h3>
              <p className="mt-1.5 text-[13px] text-[#7f8aa3]">{g.desc}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
