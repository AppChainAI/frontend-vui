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
    <div class="flex items-center justify-center gap-4 flex-wrap">
      <IconTooling />
      <IconCommunity />
      <IconSupport />
      <IconEcosystem />
      <DocumentationIcon />
    </div>
    <div class="flex gap-4 flex-wrap">
      <!-- 输入框 -->
      <div class="w-[600px]">
        <MentionInput v-model="inputValue" :suggestions="options" placeholder="请输入内容" @submit="handleSubmit">
          <div>
            回车键提交
          </div>
        </MentionInput>
      </div>
      <!-- 按钮,调用 Toast 组件 -->
      <div class="w-[600px]">
        <button class="bg-blue-500 text-white p-2 rounded-md" @click="showToast">Toast</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
