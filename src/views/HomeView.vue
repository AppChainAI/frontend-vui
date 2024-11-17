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
  { value: 'banana', label: 'Banana' }
])
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
    <div class="flex items-center justify-center gap-4 flex-wrap">
      <MentionInput :options="options" placeholder="请输入内容" />
    </div>
  </div>
</template>

<style scoped></style>
