/**
 * 导航卡片：单行语义化、纯色系低干扰的高质感卡片
 * - href 存在 → 渲染 <a>（外链新开页）
 * - onClick 存在 → 渲染 <button>（如：微信弹二维码）
 * - 品牌色通过 CSS 变量注入，hover 时卡片 + 图标 + 底部光条统一换装
 */

const BRAND = {
  gold: {
    chip: 'bg-gold/10',
    glow: '0 0 0 1px rgba(240,185,11,.32), 0 18px 44px -16px rgba(240,185,11,.45)',
    bar: 'from-gold to-gold-deep',
  },
  douyin: {
    chip: 'bg-douyin/10',
    glow: '0 0 0 1px rgba(37,244,238,.28), 0 18px 44px -16px rgba(37,244,238,.4)',
    bar: 'from-douyin to-[#fe2c55]',
  },
  bili: {
    chip: 'bg-pill/10',
    glow: '0 0 0 1px rgba(251,114,153,.28), 0 18px 44px -16px rgba(251,114,153,.42)',
    bar: 'from-pill to-violet',
  },
  wechat: {
    chip: 'bg-wechat/10',
    glow: '0 0 0 1px rgba(7,193,96,.28), 0 18px 44px -16px rgba(7,193,96,.42)',
    bar: 'from-wechat to-[#25d3ee]',
  },
  steam: {
    chip: 'bg-[#66c0f4]/10',
    glow: '0 0 0 1px rgba(102,192,244,.3), 0 18px 44px -16px rgba(102,192,244,.4)',
    bar: 'from-[#66c0f4] to-[#2a9dcc]',
  },
  github: {
    chip: 'bg-white/[0.06]',
    glow: '0 0 0 1px rgba(214,220,229,.26), 0 18px 44px -16px rgba(214,220,229,.36)',
    bar: 'from-[#b8c0cc] to-[#6b7280]',
  },
  leetcode: {
    chip: 'bg-[#ffa116]/10',
    glow: '0 0 0 1px rgba(255,161,22,.3), 0 18px 44px -16px rgba(255,161,22,.42)',
    bar: 'from-[#ffa116] to-[#f26d21]',
  },
  game: {
    chip: 'bg-gold/10',
    glow: '0 0 0 1px rgba(240,185,11,.32), 0 18px 44px -16px rgba(240,185,11,.45)',
    bar: 'from-gold to-[#ff7a18]',
  },
}

export default function NavCard({ index = 0, brand = 'gold', icon, label, desc, href, onClick }) {
  const b = BRAND[brand]
  const Comp = href ? 'a' : 'button'
  const extra =
    href != null
      ? { href, target: '_blank', rel: 'noreferrer noopener' }
      : { type: 'button', onClick }

  return (
    <Comp
      {...extra}
      style={{ '--glow': b.glow, animationDelay: `${140 + index * 90}ms` }}
      className="group relative flex animate-fade-up items-center gap-4 rounded-2xl border border-line bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#131827] hover:shadow-[var(--glow)]"
    >
      {/* 图标徽章 */}
      <span
        className={`grid size-13 shrink-0 place-items-center rounded-xl ${b.chip} transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </span>

      {/* 文案区 */}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-[#e6edf3]">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[13px] text-[#7f8aa3]">{desc}</span>
      </span>

      {/* 右下角指示 */}
      <span className="shrink-0 text-[#46506b] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold">
        {href != null ? '↗' : '＋'}
      </span>

      {/* 底部品牌色光条：hover 显现 */}
      <span
        className={`pointer-events-none absolute inset-x-1 bottom-0 h-[2px] rounded-b-2xl bg-gradient-to-r ${b.bar} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
    </Comp>
  )
}
