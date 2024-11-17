<template>
  <div class="mention-input w-full h-full">
    <div v-if="showSuggestions" class="suggestions" :style="suggestionsStyle">
      <div v-for="(item, index) in filteredOptions" :key="item.value" class="suggestion-item"
        :class="{ active: index === activeIndex }" @click="selectSuggestion(item)">
        {{ item.value }} - {{ item.label }}
      </div>
    </div>
    <textarea ref="textareaRef" class="textarea textarea-lg" :placeholder="placeholder" :value="modelValue"
      @input="handleInput" @keydown="handleKeydown" rows="1"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { PropType } from 'vue'

// 添加新的 props: maxLines 和 prefix
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Array as PropType<Array<{ value: string; label: string }>>,
    default: () => []
  },
  maxLines: { // 新增的 prop
    type: Number,
    default: 5 // 可以根据需求调整默认值
  },
  prefix: { // 新增的 prop
    type: String,
    default: '@'
  },
  placeholder: { // 可选的 prop，用于自定义 placeholder
    type: String,
    default: 'Bio'
  }
})

// 使用 JS 方式声明 emits
const emit = defineEmits(['submit', 'update:modelValue'])

const showSuggestions = ref(false)
const activeIndex = ref(0)
const mentionStart = ref(-1)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const suggestionsStyle = ref({})

const filteredOptions = computed(() => {
  if (mentionStart.value === -1) return []
  const searchText = props.modelValue.slice(mentionStart.value + props.prefix.length)
  return props.options.filter(option =>
    option.value.toLowerCase().includes(searchText.toLowerCase())
  )
})

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  const cursorPosition = target.selectionStart
  const textBeforeCursor = target.value.slice(0, cursorPosition)
  const lastPrefixIndex = textBeforeCursor.lastIndexOf(props.prefix)

  if (
    lastPrefixIndex !== -1 &&
    !textBeforeCursor.slice(lastPrefixIndex + props.prefix.length).includes(' ')
  ) {
    mentionStart.value = lastPrefixIndex
    showSuggestions.value = true
    activeIndex.value = 0
    updateSuggestionsPosition()
  } else {
    showSuggestions.value = false
    mentionStart.value = -1
  }

  emit('update:modelValue', target.value)
  adjustTextareaHeight()
}

function handleKeydown(e: KeyboardEvent) {
  // 处理 shift+enter 换行
  if (e.key === 'Enter' && e.shiftKey) {
    return // 允许默认的换行行为
  }

  if (!showSuggestions.value) {
    // 如果正在使用输入法输入，不触发 submit 事件
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault()
      emit('submit')
      return
    }
    return
  }

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % filteredOptions.value.length
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + filteredOptions.value.length) % filteredOptions.value.length
      break
    case 'Enter':
      e.preventDefault()
      selectSuggestion(filteredOptions.value[activeIndex.value])
      break
    case 'Escape':
      showSuggestions.value = false
      break
  }
}

function selectSuggestion(item: { value: string; label: string }) {
  if (!textareaRef.value) return;

  const beforeMention = props.modelValue.slice(0, mentionStart.value)
  const afterMention = props.modelValue.slice(textareaRef.value.selectionStart)
  const newValue = `${beforeMention}${props.prefix}${item.value} ${afterMention}`
  emit('update:modelValue', newValue)
  showSuggestions.value = false
  mentionStart.value = -1
  adjustTextareaHeight()
}

function updateSuggestionsPosition() {
  if (!textareaRef.value) return

  const textarea = textareaRef.value
  const textareaRect = textarea.getBoundingClientRect()
  const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight)
  const currentLineNumber = textarea.value.substr(0, textarea.selectionStart).split('\n').length

  suggestionsStyle.value = {
    bottom: `${textareaRect.height - (currentLineNumber - 1) * lineHeight}px`,
    left: '0px',
    width: `${textareaRect.width}px`
  }
}

function adjustTextareaHeight() {
  const textarea = textareaRef.value
  if (!textarea) return

  // 重置高度为 'auto' 以重新计算 scrollHeight
  textarea.style.height = 'auto'

  const computedStyle = getComputedStyle(textarea)
  const lineHeight = parseFloat(computedStyle.lineHeight)
  const paddingTop = parseFloat(computedStyle.paddingTop)
  const paddingBottom = parseFloat(computedStyle.paddingBottom)
  const borderTop = parseFloat(computedStyle.borderTopWidth)
  const borderBottom = parseFloat(computedStyle.borderBottomWidth)

  const totalPadding = paddingTop + paddingBottom + borderTop + borderBottom

  // 计算最大高度
  const maxHeight = lineHeight * props.maxLines + totalPadding

  // 计算新的高度
  const newHeight = props.modelValue.trim() === ''
    ? lineHeight + totalPadding // 空内容时高度为一行
    : Math.min(textarea.scrollHeight, maxHeight) // 内容不超过 maxHeight

  textarea.style.height = `${newHeight}px`

  // 控制是否显示滚动条
  if (textarea.scrollHeight > maxHeight) {
    textarea.style.overflowY = 'auto'
  } else {
    textarea.style.overflowY = 'hidden'
  }
}

onMounted(() => {
  adjustTextareaHeight()
})

watch(() => props.modelValue, () => {
  adjustTextareaHeight()
})

watch(() => props.maxLines, () => {
  adjustTextareaHeight()
})

watch(() => props.prefix, () => {
  // 当 prefix 改变时，重新调整 textarea 高度
  adjustTextareaHeight()
})

// 添加 focus 方法
function focus() {
  textareaRef.value?.focus()
}

// 暴露 focus 方法
defineExpose({
  focus
})
</script>

<style scoped>
.mention-input {
  position: relative;
}

.textarea {
  width: 100%;
  min-height: calc(1.5em + 20px);
  /* 1.5em 为行高，20px 为上 padding 总和 */
  padding: 10px;
  border: none;
  outline: none;
  line-height: 1.5;
  resize: none;
  background-color: transparent;
  overflow-y: hidden;
  /* 初始隐藏垂直滚动条 */
  font-size: 1rem;
  /* 确保字体大小符合 textarea-lg */
  box-sizing: border-box;
  /* 包含 padding 在内 */
}

.suggestions {
  position: absolute;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.suggestion-item {
  padding: 5px 10px;
  cursor: pointer;
}

.suggestion-item.active {
  background-color: #f5f7fa;
}
</style>
