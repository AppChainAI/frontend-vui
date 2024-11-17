<script setup lang="ts">
import { ref } from 'vue'
import IconCommunity from '@/components/icons/IconCommunity.vue';
import IconTooling from '@/components/icons/IconTooling.vue'
import IconSupport from '@/components/icons/IconSupport.vue'
import IconEcosystem from '@/components/icons/IconEcosystem.vue'
import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
import MentionInput from '@/components/MentionInput.vue'

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
    </div>
  </div>
</template>

<style scoped></style>
