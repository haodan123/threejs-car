
/**
 * 获取一个范围内的 随机整数
 * @param {*} max 最大值
 * @param {*} min 最小值
 */
export const randomFn = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min)

}


/**
 * 获取rgb颜色的随机数
 * @returns
 */
export  const colorRandomFn = () => {
  return Math.floor(Math.random() * 256)
}
