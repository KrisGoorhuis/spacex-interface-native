export const formatLargeNumber = (number: number, decimals: number = 2) => {
   const shortenedNumber = parseFloat(number.toFixed(decimals))
   return shortenedNumber.toLocaleString()
}