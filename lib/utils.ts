import fs from 'fs/promises'

type NetStats = {
  iface: string
  rxBytes: number
  txBytes: number
}

export type Bandwith = {
  iface: string
  download_mbps: number
  upload_mbps: number
  total_mbps: number
}

async function readNetDev(): Promise<NetStats[]> {
  const data = await fs.readFile('/proc/net/dev', 'utf8')
  const lines = data.split('\n').slice(2) // skip headers

  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [iface, stats] = line.split(':')
      const fields = stats.trim().split(/\s+/)
      return {
        iface: iface.trim(),
        rxBytes: parseInt(fields[0]), // received bytes
        txBytes: parseInt(fields[8]), // transmitted bytes
      }
    })
}

export async function getBandwidth(intervalMs = 1000) {
  const start = await readNetDev()
  await new Promise((r) => setTimeout(r, intervalMs))
  const end = await readNetDev()

  return start.map((s) => {
    const e = end.find((x) => x.iface === s.iface)!

    const rxPerSec = (e.rxBytes - s.rxBytes) / (intervalMs / 1000)
    const txPerSec = (e.txBytes - s.txBytes) / (intervalMs / 1000)

    // Convert bytes/sec → Mbps
    const downloadMbps = (rxPerSec * 8) / 1e6
    const uploadMbps = (txPerSec * 8) / 1e6

    return {
      iface: s.iface,
      download_mbps: +downloadMbps.toFixed(2),
      upload_mbps: +uploadMbps.toFixed(2),
      total_mbps: +(downloadMbps + uploadMbps).toFixed(2),
    }
  })
}
