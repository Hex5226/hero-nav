/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0e14',      // 页面底色（深空）
        card: '#11151f',     // 卡片底色
        line: '#232a3a',     // 卡片描边
        gold: { DEFAULT: '#f0b90b', deep: '#ff7a18' },  // 品牌金 → 橙渐变
        ice: '#59c2ff',      // 冰蓝点缀
        violet: '#7c5cff',   // 紫色点缀
        douyin: '#25f4ee',   // 抖音青
        pill: '#fb7299',     // B站粉
        wechat: '#07c160',   // 微信绿
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Noto Sans SC"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 22px 44px -20px rgba(0,0,0,.85)',
        'glow-gold': '0 0 0 1px rgba(240,185,11,.28), 0 10px 36px -8px rgba(240,185,11,.35)',
        'glow-brand': '0 0 0 1px rgba(105,110,255,.3), 0 10px 36px -8px rgba(105,110,255,.35)',
      },
      animation: {
        'fade-up': 'fadeUp .7s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fadeIn .3s ease-out both',
        'pop-in': 'popIn .35s cubic-bezier(.22,1.2,.36,1) both',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(18px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        popIn: { '0%': { opacity: 0, transform: 'scale(.94) translateY(10px)' }, '100%': { opacity: 1, transform: 'scale(1) translateY(0)' } },
        floatSlow: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
    },
  },
  plugins: [],
}
