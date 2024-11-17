<template>
  <div class="mention-input w-full h-full flex flex-col border border-base-300 shadow p-2">
    <!-- 提示框 -->
    <div v-if="showSuggestions" class="suggestions" :style="suggestionsStyle">
      <div v-for="(item, index) in filteredOptions" :key="item.value" class="suggestion-item"
        :class="{ active: index === activeIndex }" @click="selectSuggestion(item)">
        {{ item.value }} - {{ item.label }}
      </div>
    </div>
    <!-- 输入框 -->
    <textarea ref="textareaRef" class="textarea textarea-lg" :placeholder="placeholder" :value="modelValue"
      @input="handleInput" @keydown="handleKeydown" rows="1"></textarea>
    <!-- 扩展工具栏 -->
    <div class="flex items-center justify-between">
      <div>
        osoos
      </div>
      <!-- 提交按钮 -->
      <button class="btn btn-primary">提交</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'

// 定义接口类型
interface SuggestionItem {
  value: string
  label: string
}

interface SuggestionsStyle {
  bottom?: string
  left?: string
  width?: string
}

// 优化 props 定义
const props = defineProps<{
  modelValue: string
  suggestions: SuggestionItem[]
  prefix?: string
  placeholder?: string
  maxLines?: number
}>()

// 添加默认值
const prefix = computed(() => props.prefix ?? '@')  // 使用 '@' 作为默认值
const maxLines = computed(() => props.maxLines ?? 5)  // 使用 5 作为默认行数

// 优化 emits 定义
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'submit': []
}>()

const showSuggestions = ref<boolean>(false)
const activeIndex = ref<number>(0)
const mentionStart = ref<number>(-1)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const suggestionsStyle = ref<SuggestionsStyle>({})

const filteredOptions = computed<SuggestionItem[]>(() => {
  if (mentionStart.value === -1) return []
  const searchText = props.modelValue.slice(mentionStart.value + prefix.value.length)
  return props.suggestions.filter(option =>
    option.value.toLowerCase().includes(searchText.toLowerCase())
  )
})

function handleInput(event: Event): void {
  const target = event.target as HTMLTextAreaElement;
  const value = target.value;
  emit('update:modelValue', value);

  // 添加检测 @ 符号的逻辑
  const cursorPosition = target.selectionStart;
  const textBeforeCursor = value.slice(0, cursorPosition);
  const lastAtSymbol = textBeforeCursor.lastIndexOf(prefix.value);

  if (lastAtSymbol !== -1) {
    const textAfterAt = textBeforeCursor.slice(lastAtSymbol);
    // 检查 @ 后是否紧跟着空格或换行
    if (!/\s/.test(textAfterAt)) {
      mentionStart.value = lastAtSymbol;
      showSuggestions.value = true;
      activeIndex.value = 0;
      updateSuggestionsPosition();
      return;
    }
  }

  showSuggestions.value = false;
  mentionStart.value = -1;
  adjustTextareaHeight();
}

function handleKeydown(e: KeyboardEvent): void {
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

function selectSuggestion(item: SuggestionItem): void {
  if (!textareaRef.value) return;

  // 使用 textarea 的实际值作为备份
  const currentValue = textareaRef.value.value || props.modelValue || '';

  // 获取@符号之前的文本
  const beforeMention = currentValue.slice(0, mentionStart.value);

  // 获取光标位置之后的文本
  const cursorPosition = textareaRef.value.selectionStart;
  const afterCursor = currentValue.slice(cursorPosition);

  // 构建新的文本值
  const insertText = `${prefix.value}${item.value} `;
  const newValue = beforeMention + insertText + afterCursor;

  // 先设置 textarea 的值
  textareaRef.value.value = newValue;

  // 更新父组件的值
  emit('update:modelValue', newValue);

  // 重置状态
  showSuggestions.value = false;
  mentionStart.value = -1;

  // 等待 DOM 更新
  nextTick(() => {
    if (!textareaRef.value) return;

    // 计算新的光标位置
    const newCursorPosition = beforeMention.length + insertText.length;

    // 设置光标位置
    textareaRef.value.selectionStart = newCursorPosition;
    textareaRef.value.selectionEnd = newCursorPosition;
    textareaRef.value.focus();

    adjustTextareaHeight();
  });
}

function updateSuggestionsPosition(): void {
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

function adjustTextareaHeight(): void {
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
  const maxHeight = lineHeight * maxLines.value + totalPadding

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

// 优化 focus 方法
function focus(): void {
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
  /* 1.5em 为行高，20px 上 padding 总和 */
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
