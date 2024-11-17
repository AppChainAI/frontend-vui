import daisyui from "daisyui"

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
  ],
  daisyui: {
    themes: [
        {
          mytheme: {
            "primary": "#2563eb",    // 明亮的科技蓝
            "secondary": "#7c3aed",   // 未来感紫色
            "accent": "#06b6d4",      // 霓虹青色
            "neutral": "#1e293b",     // 深空灰
            "base-100": "#f8fafc",    // 洁净白
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
      "light", "dark", "cupcake"
    ],
  },
}

