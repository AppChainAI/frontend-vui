<template>
  <article class="prose prose-code:before:content-none 
    prose-code:after:content-none 
    max-w-none prose-pre:bg-neutral-100 prose-pre:p-4 
    prose-pre:rounded-lg prose-code:text-neutral-900">
    <div v-html="renderContent()"></div>
  </article>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'

const props = defineProps<{
  content: string
}>()

const md: MarkdownIt = new MarkdownIt({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const copyButton = `<button class="copy-button text-blue-500">复制</button>`;
        const languageTitle = `<div class="flex justify-between items-center min-w-80 code-title bg-base-200 px-4 py-2 text-sm font-mono rounded-t-lg">${lang}${copyButton}</div>`;
        return `${languageTitle}<pre class="hljs my-0 rounded-t-none"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
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
  return md.render(props.content)
}

</script>

<style scoped>
:deep(.hljs) {
  counter-reset: line;
}
</style>