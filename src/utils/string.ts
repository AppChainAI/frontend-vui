/**
 * 格式化文件大小, 输出成带单位的字符串
 * @param {Number} size 文件大小
 * @param {Number} [pointLength=2] 精确到的小数点数。
 * @param {Array} [units=[ 'B', 'K', 'M', 'G', 'TB' ]] 单位数组。从字节，到千字节，一直往上指定。
 *    如果单位数组里面只指定了到了K(千字节)，同时文件大小大于M, 此方法的输出将还是显示成多少K.
 */
export function formatSize(
  size: number,
  pointLength?: number,
  units?: string[]
): string {
  let unit: string | undefined;
  units = units || ['B', 'K', 'M', 'G', 'TB'];
  while ((unit = units.shift()) && size > 1024) {
    size = size / 1024;
  }
  return (unit === 'B' ? size : size.toFixed(pointLength === undefined ? 2 : pointLength)) + (unit || 'TB');
}

/**
 * 生成一个 UUID
 * @returns {string}
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string): string {
    const r: number = Math.random() * 16 | 0;
    const v: number = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}