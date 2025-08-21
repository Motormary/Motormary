type typewriterProps = {
  setState: (val: string) => void
  text: string
  speed?: number
}

export function Typewriter({
  setState,
  text,
  speed = 80,
}: typewriterProps): Promise<boolean> | void {
  return new Promise((resolve) => {
    let cur = ''
    const typing = setInterval(async () => {
      cur = cur + text[cur.length]
      setState(cur)
      if (cur.length === text.length) {
        clearInterval(typing)
        resolve(true)
      }
    }, speed)
  })
}
