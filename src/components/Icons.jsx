/**
 * 常见品牌图标（内联 SVG，统一 24x24 视觉框）
 * 每种图标带品牌专属渐变，与卡片 hover 高光呼应。
 */
const gold = { id: 'ig', colors: ['#f0b90b', '#ff7a18'] }
const douyinG = { id: 'id', colors: ['#25f4ee', '#fe2c55'] }
const biliG = { id: 'ib', colors: ['#fb7299', '#a05dff'] }
const wechatG = { id: 'iw', colors: ['#07c160', '#25d3ee'] }

function Defs({ g }) {
  return (
    <defs>
      <linearGradient id={g.id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={g.colors[0]} />
        <stop offset="1" stopColor={g.colors[1]} />
      </linearGradient>
    </defs>
  )
}

/** 个人博客：文档 + 星标 */
export function IconBlog(props) {
  const g = gold
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={`url(#${g.id})`} strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <Defs g={g} />
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="M9 12h6l-.5 2.2-.5 2.2-.6 2.2H10.6l-.6-2.2-.5-2.2L9 12z" fill={`url(#${g.id})`} stroke="none" />
      <path d="M12 9.5l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z" fill={`url(#${g.id})`} stroke="none" />
    </svg>
  )
}

/** 抖音：音符便签（官方标准图形，垂直渐变更贴官方四格配色） */
export function IconDouyin(props) {
  const g = douyinG
  return (
    <svg viewBox="0 0 24 24" fill={`url(#${g.id})`} {...props} aria-hidden="true">
      <defs>
        <linearGradient id={g.id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={g.colors[0]} />
          <stop offset="1" stopColor={g.colors[1]} />
        </linearGradient>
      </defs>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

/** B站：小电视（近似官方图形） */
export function IconBilibili(props) {
  const g = biliG
  return (
    <svg viewBox="0 0 24 24" fill={`url(#${g.id})`} {...props} aria-hidden="true">
      <Defs g={g} />
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v4.026c-.036 1.51-.556 2.769-1.56 3.773-.995 1.004-2.254 1.524-3.773 1.56H7.377c-1.51-.036-2.769-.556-3.773-1.56-1.004-.995-1.524-2.254-1.56-3.773V9.987c.036-1.51.556-2.769 1.56-3.773.995-1.004 2.254-1.524 3.765-1.56h.443l-1.336-1.336a1.073 1.073 0 1 1 1.517-1.518l2.218 2.218c.139.14.225.335.273.586l.007.047h.487l2.22-2.218a1.073 1.073 0 1 1 1.517 1.518l-1.336 1.336zm-4.178 8.74V7.66a.393.393 0 0 0-.134-.305.458.458 0 0 0-.327-.122.46.46 0 0 0-.322.122.396.396 0 0 0-.139.305v5.735c0 .121.045.227.139.317.086.09.194.135.322.135a.47.47 0 0 0 .327-.139.4.4 0 0 0 .134-.317zm-3.78-2.315v-3.42a.396.396 0 0 0-.138-.305.47.47 0 0 0-.323-.122.46.46 0 0 0-.327.122.393.393 0 0 0-.134.305v3.42c0 .122.045.228.134.318s.194.134.327.134a.47.47 0 0 0 .323-.134.393.393 0 0 0 .138-.318z" />
    </svg>
  )
}

/** 微信：双气泡 */
export function IconWechat(props) {
  const g = wechatG
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
      <Defs g={g} />
      <path fill={`url(#${g.id})`} d="M8.6 3.5C4.7 3.5 1.5 6.2 1.5 9.6c0 1.9 1.1 3.6 2.8 4.7L3.6 17l2.9-1.5c.65.2 1.34.3 2.08.3h.42a5.4 5.4 0 0 1-.29-1.75c0-3.2 2.9-5.8 6.5-5.8.36 0 .71.03 1.05.08C15.4 5.4 12.3 3.5 8.6 3.5z" opacity=".95" />
      <path fill={`url(#${g.id})`} d="M22.5 14.1c0-2.9-2.8-5.2-6.1-5.2s-6.1 2.3-6.1 5.2 2.8 5.2 6.1 5.2c.72 0 1.42-.1 2.05-.3l2.63 1.37-.63-1.95c1.6-1 2.55-2.5 2.55-4.12z" opacity=".9" />
    </svg>
  )
}

/** GitHub：Octocat（近似官方图形） */
export function IconGithub(props) {
  const g = { id: 'igh', colors: ['#d6dce5', '#8e97ab'] }
  return (
    <svg viewBox="0 0 24 24" fill={`url(#${g.id})`} {...props} aria-hidden="true">
      <Defs g={g} />
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

/** Steam：蒸汽机偏心轮徽章（官方图形，右上圆环位置微调+略放大） */
export function IconSteam(props) {
  const g = { id: 'ist', colors: ['#94d1fa', '#57a6dd'] }
  return (
    <svg viewBox="0 0 24 24" fill={`url(#${g.id})`} {...props} aria-hidden="true">
      <Defs g={g} />
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 12-5.373 12-12s-5.373-12-12-12zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.455 1.012zM12.5 8.6 A3 3 0 1 1 18.5 8.6 A3 3 0 1 1 12.5 8.6 ZM13.05 8.6 A2.45 2.45 0 1 0 17.95 8.6 A2.45 2.45 0 1 0 13.05 8.6 Z" />
    </svg>
  )
}

/** LeetCode：代码括号 `< >` + 竖线（自定义简约风） */
export function IconLeetCode(props) {
  const g = { id: 'ilc', colors: ['#ffb02e', '#ff7a18'] }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={`url(#${g.id})`} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props} aria-hidden="true">
      <Defs g={g} />
      <path d="M8 5L3 12l5 7" />
      <path d="M16 5l5 7-5 7" />
      <path d="M11.5 8v8" />
    </svg>
  )
}

/** 小游戏：游戏手柄（简约风） */
export function IconGame(props) {
  const g = { id: 'igm', colors: ['#f0b90b', '#ff7a18'] }
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
      <Defs g={g} />
      <path
        d="M7.6 7h8.8a5.4 5.4 0 0 1 5.36 6.2l-.66 4.4a2.35 2.35 0 0 1-4.08 1.2L14.6 16H9.4l-2.42 2.8a2.35 2.35 0 0 1-4.08-1.2l-.66-4.4A5.4 5.4 0 0 1 7.6 7z"
        stroke={`url(#${g.id})`}
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M8.2 9.6v3.4M6.5 11.3h3.4" stroke={`url(#${g.id})`} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16.2" cy="10.4" r="0.9" fill={`url(#${g.id})`} />
      <circle cx="17.6" cy="12.6" r="0.9" fill={`url(#${g.id})`} />
    </svg>
  )
}

/** 贪吃蛇：像素方块蛇（深色实心 + 白色眼睛，S 形身体，游戏感强） */
export function IconSnake(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
      {/* 尾巴 */}
      <rect x="12.6" y="12.6" width="4.6" height="4.6" rx="1.3" fill="#0e1116" opacity=".55" />
      {/* 身体3 */}
      <rect x="12.6" y="8" width="4.6" height="4.6" rx="1.3" fill="#0e1116" opacity=".75" />
      {/* 身体2 */}
      <rect x="8" y="8" width="4.6" height="4.6" rx="1.3" fill="#0e1116" opacity=".9" />
      {/* 身体1 */}
      <rect x="8" y="3.4" width="4.6" height="4.6" rx="1.3" fill="#0e1116" />
      {/* 蛇头 */}
      <rect x="3" y="3" width="5.2" height="5.2" rx="1.7" fill="#0e1116" />
      {/* 眼睛 */}
      <circle cx="4.55" cy="5.05" r="0.65" fill="#fff" />
      <circle cx="6.55" cy="5.05" r="0.65" fill="#fff" />
    </svg>
  )
}

/** 2048：四宫格数字块（深色实心，在浅色渐变徽章上高对比） */
export function Icon2048(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props} aria-hidden="true">
      <rect x="4" y="4" width="7.2" height="7.2" rx="1.6" fill="#0e1116" opacity=".95" />
      <rect x="12.8" y="4" width="7.2" height="7.2" rx="1.6" fill="#0e1116" opacity=".7" />
      <rect x="4" y="12.8" width="7.2" height="7.2" rx="1.6" fill="#0e1116" opacity=".7" />
      <rect x="12.8" y="12.8" width="7.2" height="7.2" rx="1.6" fill="#0e1116" opacity=".45" />
    </svg>
  )
}

