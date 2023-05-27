export const arrayRange = (start: string, stop: string, step: number) =>
  Array.from(
    { length: (parseInt(stop) - parseInt(start)) / step + 1 },
    (value, index) => (parseInt(start) + index * step).toString()
  )
