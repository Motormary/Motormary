import 'server-only'

export function getBaseApi(param: string = ""): string {
  const url =
    process.env.NODE_ENV === 'production'
      ? `http://127.0.0.1:9000/${param}`
      : `https://api.eskimoen.no/${param}`
  return url
}