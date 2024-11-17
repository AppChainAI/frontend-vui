<script setup lang="ts">
import { ref } from 'vue'
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconTooling from '@/components/icons/IconTooling.vue'
import IconSupport from '@/components/icons/IconSupport.vue'
import IconEcosystem from '@/components/icons/IconEcosystem.vue'
import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
import MentionInput from '@/components/MentionInput.vue'
import { toast } from '@/utils/toast'
import { formatSize, generateUUID } from '@/utils/string'
import { formatDuration } from '@/utils/time'

const options = ref([
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'pear', label: 'Pear' },
  { value: 'peach', label: 'Peach' },
])

const inputValue = ref('')

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
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- 主题切换 -->
    <div class="join join-vertical rounded-box">
      <input type="radio" name="theme-buttons" class="btn theme-controller join-item" aria-label="Default"
        value="default" />
      <input type="radio" name="theme-buttons" class="btn theme-controller join-item" aria-label="Light"
        value="light" />
      <input type="radio" name="theme-buttons" class="btn theme-controller join-item" aria-label="Dark" value="dark" />
      <input type="radio" name="theme-buttons" class="btn theme-controller join-item" aria-label="Cupcake"
        value="cupcake" />
      <input type="radio" name="theme-buttons" class="btn theme-controller join-item" aria-label="MyTheme"
        value="mytheme" />
    </div>
    <!-- 图标 -->
    <div class="flex items-center justify-center gap-4 flex-wrap p-4 rounded-box border border-base-300">
      <IconTooling />
      <IconCommunity />
      <IconSupport />
      <IconEcosystem />
      <DocumentationIcon />
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
    </div>
  </div>
</template>

<style scoped></style>
