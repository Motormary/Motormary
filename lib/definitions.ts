export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

export type TerminalHistory = {
  type: 'system' | 'user'
  value: string
}
