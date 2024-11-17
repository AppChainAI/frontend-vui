export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// 格式化时间
export function formatDuration(seconds: number): string {
    const days = Math.floor(seconds / (24 * 60 * 60))
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))
    const minutes = Math.floor((seconds % (60 * 60)) / 60)
    const remainingSeconds = seconds % 60

    const parts: string[] = []
    if (days > 0) parts.push(`${days}天`)
    if (hours > 0) parts.push(`${hours}时`)
    if (minutes > 0) parts.push(`${minutes}分`)
    if (remainingSeconds > 0) parts.push(`${remainingSeconds}秒`)

    return parts.join('')
}