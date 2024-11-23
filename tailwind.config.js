import daisyui from "daisyui"
import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    typography,
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "primary": "#2563eb",    // 明亮的科技蓝
          "secondary": "#7c3aed",   // 未来感紫色
          "accent": "#06b6d4",      // 霓虹青色
          "neutral": "#1e293b",     // 深空灰
          "base-100": "#f8fafc",    // 洁净白
          "base-200": "#e2e8f0",    // 柔和的灰白色
          "base-300": "#cbd5e1",    // 更柔和的灰蓝色
          "--rounded-box": "1rem",      // 适中的圆角
          "--rounded-btn": "0.5rem",    // 稍微锐利的按钮边角
          "--rounded-badge": "1.5rem",  
          "--animation-btn": "0.2s",    // 快速的动画响应
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",  // 轻微的按压效果
          "--border-btn": "1.5px",      // 适中的边框
          "--tab-border": "2px",        // 突出的标签边框
          "--tab-radius": "0.5rem",     // 现代感的标签圆角
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          "primary": "#3b82f6",    // 明亮的蓝色，在暗色主题中保持可见度
          "secondary": "#6d28d9",   // 深紫色，与亮色主题呼应但更深沉
          "accent": "#0891b2",      // 青色调整，确保在暗背景上的可见性
          "neutral": "#cbd5e1",     // 更柔和的灰白色，减少对比度
          "base-100": "#0f172a",    // 暗蓝色背景，比纯黑更柔和
          "base-200": "#1e293b",    // 更深的灰色背景，减少对比度
          "base-300": "#475569",    // 深灰色，用于强调元素
          "--rounded-box": "1rem",      // 适中的圆角
          "--rounded-btn": "0.5rem",    // 稍微锐利的按钮边角
          "--rounded-badge": "1.5rem",  
          "--animation-btn": "0.2s",    // 快速的动画响应
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.98",  // 轻微的按压效果
          "--border-btn": "1.5px",      // 适中的边框
          "--tab-border": "2px",        // 突出的标签边框
          "--tab-radius": "0.5rem",     // 现代感的标签圆角
        },
      },
      "dark",
    ],
  },
  darkMode: ['selector', '[data-theme="dark"]']
}

