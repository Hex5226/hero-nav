import { useState } from 'react'
import NavCard from './components/NavCard'
import QRModal from './components/QRModal'
import GameHub from './components/GameHub'
import GamePage from './components/GamePage'
import Game2048 from './components/Game2048'
import {
  IconBlog,
  IconDouyin,
  IconBilibili,
  IconWechat,
  IconGithub,
  IconSteam,
  IconLeetCode,
  IconGame,
} from './components/Icons'

const DOUYIN_URL =
  'https://www.douyin.com/user/MS4wLjABAAAAEYdy6T5lnP4Rbj66A7NhJmE-Szl-zzMLIq_L9QJhnTU?from_tab_name=main'
const BILIBILI_URL = 'https://space.bilibili.com/1281580497'
const BLOG_URL = 'https://hexblog.top'
const GITHUB_URL = 'https://github.com/Hex5226'
const STEAM_URL = 'https://steamcommunity.com/profiles/76561199470348897'
const LEETCODE_URL = 'https://leetcode.cn/u/hex-s'

export default function App() {
  const [qrOpen, setQrOpen] = useState(false)
  const [view, setView] = useState('nav') // nav | hub | snake | 2048

  return (
    <div className="relative min-h-screen">
      {/* 背景网格纹理 */}
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <main className="relative mx-auto w-full max-w-3xl px-6 pb-24 pt-20 sm:pt-28">
        {view === 'hub' && <GameHub onBack={() => setView('nav')} onSelect={(g) => setView(g)} />}
        {view === 'snake' && <GamePage onBack={() => setView('hub')} />}
        {view === '2048' && <Game2048 onBack={() => setView('hub')} />}
        {view === 'nav' && (
          <>
        {/* ---------- 头部 ---------- */}
        <header className="animate-fade-up text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#9aa4bf]">
            <span className="size-1.5 rounded-full bg-gold" />
            Personal Nav
          </span>
          <h1 className="font-display mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
            <span className="text-gradient-gold">Hex导航站</span>
          </h1>
          <p className="mt-4 text-[15px] text-[#9aa4bf] sm:text-base">
            字句与光影相逢，人心亦有归处
          </p>
        </header>

        {/* ---------- 导航卡片 ---------- */}
        <div className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
          <NavCard
            index={0}
            brand="gold"
            icon={<IconBlog className="size-6" />}
            label="个人博客"
            desc="文字 · 想法 · 手记"
            href={BLOG_URL}
          />
          <NavCard
            index={1}
            brand="douyin"
            icon={<IconDouyin className="size-6" />}
            label="抖音"
            desc="短视频 · 日常记录"
            href={DOUYIN_URL}
          />
          <NavCard
            index={2}
            brand="bili"
            icon={<IconBilibili className="size-6" />}
            label="B站"
            desc="视频 · 收藏与充电"
            href={BILIBILI_URL}
          />
          <NavCard
            index={3}
            brand="github"
            icon={<IconGithub className="size-6" />}
            label="GitHub"
            desc="代码仓库 · 开源足迹"
            href={GITHUB_URL}
          />
          <NavCard
            index={4}
            brand="steam"
            icon={<IconSteam className="size-6" />}
            label="Steam"
            desc="游戏生涯 · 库存与徽章"
            href={STEAM_URL}
          />
          <NavCard
            index={5}
            brand="leetcode"
            icon={<IconLeetCode className="size-6" />}
            label="LeetCode"
            desc="刷题 · 算法成长记录"
            href={LEETCODE_URL}
          />
          <NavCard
            index={6}
            brand="wechat"
            icon={<IconWechat className="size-6" />}
            label="加我微信"
            desc="展示二维码 · 扫码成为好友"
            onClick={() => setQrOpen(true)}
          />
          <NavCard
            index={7}
            brand="game"
            icon={<IconGame className="size-6" />}
            label="小游戏"
            desc="贪吃蛇 · 2048 · 摸鱼也要讲基本法"
            onClick={() => setView('hub')}
          />
        </div>

        {/* ---------- 底部 ---------- */}
        <footer className="mt-16 text-center text-xs text-[#4d5568]">
          <p>© 2026 · 构建于 React + Vite · 金色即正义</p>
          <p className="mt-2 opacity-60">把常用的入口放在一起，就是数字生活的最小单元</p>
        </footer>
          </>
        )}
      </main>

      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  )
}
