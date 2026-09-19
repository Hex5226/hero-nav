import { useEffect, useRef } from 'react'
import { IconWechat } from './Icons'

/**
 * 微信二维码弹窗
 * - 点击遮罩 / 按 ESC / 点 ✕ 均可关闭
 * - 打开时锁定背景滚动，并为对话框设置焦点（键盘可达）
 */
export default function QRModal({ open, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 遮罩 */}
      <div
        className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* 对话框 */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="微信好友二维码"
        className="relative w-full max-w-xs animate-pop-in rounded-2xl border border-line bg-card p-6 text-center shadow-card outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-[#5b6377] transition hover:bg-white/5 hover:text-white"
        >
          ✕
        </button>

        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-wechat/10">
          <IconWechat className="size-6" />
        </span>
        <h3 className="mt-3 text-lg font-semibold text-[#e6edf3]">加我微信</h3>
        <p className="mt-1 text-[13px] text-[#7f8aa3]">扫一扫，成为好友</p>

        <img
          src="/vx.png"
          alt="微信好友二维码"
          className="mx-auto mt-5 w-56 max-w-full rounded-xl border border-line"
        />

        <p className="mt-4 text-xs leading-relaxed text-[#5b6377]">
          提示：右键（或长按）图片可保存，方便直接转发给别人
        </p>
      </div>
    </div>
  )
}
