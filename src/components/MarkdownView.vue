<template>
  <article class="prose prose-code:before:content-none 
    prose-code:after:content-none 
    max-w-none min-w-80 prose-pre:bg-base-100 prose-pre:p-4 
    prose-pre:rounded-lg prose-pre:text-base-content">
    <div v-html="renderContent()"></div>
  </article>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'

const props = defineProps<{
  content: string
}>()

// 添加复制功能
function setupCopyButtons() {
  nextTick(() => {
    const copyButtons = document.querySelectorAll('.copy-button')
    copyButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        const codeBlock = (e.target as HTMLElement)
          .closest('.code-block')
          ?.querySelector('code')

        if (codeBlock) {
          try {
            await navigator.clipboard.writeText(codeBlock.textContent || '')
            const btn = e.target as HTMLElement
            btn.textContent = '已复制!'
            setTimeout(() => {
              btn.textContent = '复制'
            }, 2000)
          } catch (err) {
            console.error('复制失败:', err)
          }
        }
      })
    })
  })
}

// 修改高亮函数部分
const md: MarkdownIt = new MarkdownIt({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const copyButton = `<button class="copy-button text-blue-500 hover:text-blue-700 transition-colors">复制</button>`;
        const languageTitle = `<div class="flex justify-between items-center bg-base-200 px-4 py-2 text-sm font-mono rounded-t-lg">${lang}${copyButton}</div>`;
        return `<div class="code-block">${languageTitle}<pre class="hljs my-0 rounded-t-none"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre></div>`;
      } catch (error) {
        console.warn(`语法高亮错误: ${error}`)
      }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
  html: true,
  linkify: true,
  breaks: true
})

const renderContent = () => {
  const html = md.render(props.content)
  // 在内容渲染后设置复制按钮
  setupCopyButtons()
  return html
}

</script>

<style scoped></style>