<script setup lang="ts">
import { ref, onMounted } from 'vue'
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconTooling from '@/components/icons/IconTooling.vue'
import IconSupport from '@/components/icons/IconSupport.vue'
import IconEcosystem from '@/components/icons/IconEcosystem.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconSettingsGear from '@/components/icons/IconSettingsGear.vue'

import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
import MentionInput from '@/components/MentionInput.vue'
import { toast } from '@/utils/toast'
import { formatSize, generateUUID } from '@/utils/string'
import { formatDuration } from '@/utils/time'
import MarkdownView from '@/components/MarkdownView.vue'
import { useDark, useToggle } from '@vueuse/core'

const options = ref([
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
  { value: 'peach', label: 'Peach' },
])

const inputValue = ref('')

const markdownContent = ref('')

// 添加暗黑模式控制
const isDark = useDark()
const toggleDark = useToggle(isDark)

onMounted(() => {
  markdownContent.value = `
  # 标题
  ## 副标题
  \`\`\`typescript
  const a = 1
  console.log(a)
  \`\`\`
  - 解释
  - 解释
  `
})

function handleSubmit(): void {
  console.log('提交事件', inputValue.value)
}

function showToast(): void {
  // 生成一个uuid
  console.log(generateUUID())
  // 测试格式化文件大小
  const fileSize = 23 * 1024 * 1024 * 1024
  console.log(formatSize(fileSize))
  // 3天10小时的秒数
  const threeDays = 3 * 24 * 60 * 60 + 10 * 60 * 60
  // 测试格式化时间
  console.log(formatDuration(threeDays))
  toast('提交成功', 'success')
}

function changeTheme(): void {
  toggleDark()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- 主题切换 -->
    <label class="flex cursor-pointer gap-2" @click="changeTheme()">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
      <input type="checkbox" :value="isDark ? 'dark' : 'light'" class="toggle theme-controller" />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </label>
    <!-- 图标 -->
    <div class="flex items-center justify-center gap-4 flex-wrap p-4 rounded-box border border-base-300">
      <IconTooling />
      <IconCommunity />
      <IconSupport />
      <IconEcosystem />
      <DocumentationIcon />
      <IconSearch />
      <IconSettingsGear />
    </div>
    <div class="flex gap-4 flex-wrap">
      <!-- 输入框 -->
      <div class="w-[600px]">
        <MentionInput v-model="inputValue" :suggestions="options" placeholder="请输入内容" @submit="handleSubmit"
          class="rounded-btn">
          <div>
            回车键提交
          </div>
        </MentionInput>
      </div>
      <!-- 按钮,调用 Toast 组件 -->
      <div class="flex gap-4">
        <button class="btn" @click="showToast">Button</button>
        <button class="btn btn-neutral">Neutral</button>
        <button class="btn btn-primary">Primary</button>
        <button class="btn btn-secondary">Secondary</button>
        <button class="btn btn-accent">Accent</button>
        <button class="btn btn-ghost">Ghost</button>
        <button class="btn btn-link">Link</button>
      </div>
      <!-- Chat -->
      <div class="chat chat-start">
        <div class="chat-bubble chat-bubble-primary">
          It's over Anakin,
          <br />
          I have the high ground.
        </div>
      </div>
      <!-- Markdown -->
      <MarkdownView :content="markdownContent" />
    </div>
  </div>
</template>

<style scoped></style>
