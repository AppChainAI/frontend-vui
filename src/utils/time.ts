export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * 格式化给定的秒数为天、时、分和秒的字符串表示。
 *
 * @param seconds - 要格式化的总秒数。
 * @returns 格式化后的时间字符串，例如 "1天2时3分4秒"。
 */
export function formatDuration(seconds: number): string {
    /**
     * 计算总天数。
     * 使用总秒数除以每一天的秒数，向下取整得到完整的天数。
     */
    const days = Math.floor(seconds / (24 * 60 * 60));

    /**
     * 计算剩余的小时数。
     * 使用总秒数对一天的秒数取余，得到剩余秒数，再除以每小时的秒数，向下取整。
     */
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));

    /**
     * 计算剩余的分钟数。
     * 使用总秒数对一小时的秒数取余，得到剩余秒数，再除以每分钟的秒数，向下取整。
     */
    const minutes = Math.floor((seconds % (60 * 60)) / 60);

    /**
     * 计算剩余的秒数。
     * 使用总秒数对一分钟的秒数取余，得到最终的秒数。
     */
    const remainingSeconds = seconds % 60;

    /**
     * 存储各个时间部分的数组。
     * 根据计算的天、时、分、秒，动态添加非零的时间部分。
     */
    const parts: string[] = [];

    // 如果天数大于0，添加天数到数组
    if (days > 0) parts.push(`${days}天`);

    // 如果小时数大于0，添加小时数到数组
    if (hours > 0) parts.push(`${hours}时`);

    // 如果分钟数大于0，添加分钟数到数组
    if (minutes > 0) parts.push(`${minutes}分`);

    // 如果剩余秒数大于0，添加秒数到数组
    if (remainingSeconds > 0) parts.push(`${remainingSeconds}秒`);

    /**
     * 将各个时间部分连接成一个完整的字符串。
     * 使用空字符串作为分隔符，将数组中的部分拼接起来。
     */
    return parts.join('');
}