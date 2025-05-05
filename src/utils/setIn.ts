/**
 * Hàm cập nhật đối tượng lồng nhau theo đường dẫn
 * @param obj Đối tượng cần cập nhật
 * @param path Đường dẫn đến giá trị cần cập nhật
 * @param value Giá trị mới
 * @returns Đối tượng mới đã cập nhật
 */
export default function setIn<T extends Record<string, unknown>, V>(obj: T, path: string, value: V): T {
  const pathArray = path.split('.');
  const result = { ...obj };
  let current: Record<string, unknown> = result;

  for (let i = 0; i < pathArray.length - 1; i += 1) {
    const key = pathArray[i];
    current[key] = current[key] !== undefined ? { ...(current[key] as Record<string, unknown>) } : {};
    current = current[key] as Record<string, unknown>;
  }

  current[pathArray[pathArray.length - 1]] = value;
  return result;
}
