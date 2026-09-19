---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 0c7dbeb585f6008cc37be2d80691fbbb_5001fc5eaf4611f1ac01525400e6dd8f
    ReservedCode1: SXTcjFbo4WdKg5NnNyNqafR9kxvTam8VQVvqdjMqgoLvS6aLL1bu3KWFBKxo0vHuyvfra7uZALD0DA31EZRuYlfNYKHj0BvtY6NgwR3kho1gnW8ohX8bCrMQF/TD1/EaOivbhx/dgCp2nWZ8CUmhx2OBPbgrAX9rePzIVJn7bu0mnlNOZIpeKY8gf8o=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 0c7dbeb585f6008cc37be2d80691fbbb_5001fc5eaf4611f1ac01525400e6dd8f
    ReservedCode2: SXTcjFbo4WdKg5NnNyNqafR9kxvTam8VQVvqdjMqgoLvS6aLL1bu3KWFBKxo0vHuyvfra7uZALD0DA31EZRuYlfNYKHj0BvtY6NgwR3kho1gnW8ohX8bCrMQF/TD1/EaOivbhx/dgCp2nWZ8CUmhx2OBPbgrAX9rePzIVJn7bu0mnlNOZIpeKY8gf8o=
---

# 🧭 Hero Nav · 个人导航页

一个极简、克制的个人导航站，部署到 Vercel 即可上线。
配色延续「深空 + 金色渐变」风格：深底 `#0b0e14`、卡片 `#11151f`、金橙品牌渐变、蓝紫点缀。

技术栈：**React 18 + Vite 5 + Tailwind CSS 3**。

## 功能一览

| 入口 | 形态 | 说明 |
|---|---|---|
| 个人博客 → hexblog.top | 外链卡片 | 新标签页打开 |
| 抖音 | 外链卡片 | 新标签页打开 |
| B站 | 外链卡片 | 新标签页打开 |
| 加我微信 | 弹窗卡片 | 点击弹出二维码图片（`public/vx.png`），支持右键/长按保存 |

交互细节：hover 上浮 + 品牌色光晕 + 底部光条；弹窗支持 ESC / 点遮罩 / ✕ 关闭；键盘焦点环完整；移动端自动单列。

## 本地开发

```bash
cd hero-nav
npm install        # 安装依赖（已装好则跳过）
npm run dev        # 启动开发服（默认 http://localhost:5173）
npm run build      # 生产构建，产物在 dist/
npm run preview    # 本地预览构建产物
```

## 修改你自己的信息

所有可配置内容都集中在 `src/App.jsx` 顶部：

```js
const DOUYIN_URL = '...'   // 换成你的抖音主页地址
const BILIBILI_URL = '...' // 换成你的 B站主页地址
const BLOG_URL = '...'     // 换成你的博客地址
```

- 标题 / 副标题：改 `App.jsx` 里 `<h1>` 与 `<p>` 的文案。
- 微信二维码图片：直接替换 `public/vx.png`（保持文件名不变即可，JPG/PNG 都行）。
- 卡片文案：改 `App.jsx` 中每个 `<NavCard>` 的 `label` / `desc`。

## 部署到 Vercel

> Vercel 会自动识别 Vite 项目，构建命令与输出目录都已内置，无需额外配置。

### 方式一：Vercel CLI（最快，免 GitHub）

```bash
npm i -g vercel        # 全局安装 Vercel CLI
vercel                 # 在项目目录内运行，按提示登录授权
vercel --prod          # 确认无误后发布正式版，会得到一个 xxx.vercel.app 域名
```

### 方式二：GitHub + Vercel 网页导入（推荐，改动可自动重新部署）

1. 在 GitHub 新建仓库，把 `hero-nav` 整个文件夹推上去：

   ```bash
   cd hero-nav
   git init
   git add .
   git commit -m "init: personal hero nav"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 打开 vercel.com → 登录 → **Add New → Project** → 选择刚推上去的仓库 → **Import**。
3. Vercel 自动识别为 Vite，直接点 **Deploy** 即可。之后每次 `git push` 自动重新部署。
4. 想要自己的域名：项目设置 → Domains → 添加 `hexblog.top` 之类的域名并按提示配置 DNS。

## 常见问题

- **二维码图片不显示**：确认图片在 `public/vx.png`，且文件名正确（代码里引用的是 `/vx.png`）。
- **想改 favicon**：替换 `public/favicon.svg` 即可。
- **字体**：使用 Google Fonts（Noto Sans SC + Space Grotesk），在线环境自动加载，无需本地字体文件。

---

© 2026 · 你的个人导航站
*（内容由AI生成，仅供参考）*
