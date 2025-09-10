'use client'

import CircularProgress from '@/components/monitor/gauge'
import { Bandwith } from '@/lib/dashboard/utils'
import { fetcher } from '@/lib/fetcher'
import useSWR from 'swr'

export default function DashboardPage() {
  const { data, error, isLoading } = useSWR<
    { cpu: string; memory: string; bandwith: Bandwith[] } | undefined
  >('/api/hwinfo', fetcher, {
    refreshInterval: 5000,
  })

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  if (data) {
    const memString = data.memory.split(' ').filter((val) => val)
    const totalMem = Number(memString[6])
    const usedMem = Number(memString[7])
    const calcMem = ((usedMem / totalMem) * 100).toFixed(1)

    const cpuString = data.cpu.trim().split(' ')
    const cpuUser = Number(cpuString[2])
    const cpuSys = Number(cpuString[5])

    return (
      <main className="font-mono p-5">
        <h1 className="text-5xl text-center">Dashboard</h1>
        <div className="flex gap-4">
          <CircularProgress
            label="MEMORY"
            value={Number(calcMem) / 2}
          >
            <p className="text-center">
              {totalMem} / {usedMem} MB {`(${usedMem}%)`}
            </p>
          </CircularProgress>
          <CircularProgress
            label="CPU"
            value={(cpuUser + cpuSys) / 2}
          >
            <p className="text-center">{cpuUser + cpuSys} / 100 %</p>
            <p className="text-center">
              sys: {cpuSys}, usr: {cpuUser}
            </p>
          </CircularProgress>
        </div>
        <div className="flex gap-4 flex-col">
          {data.bandwith.map((process) => (
            <table
              key={process.iface}
              className="[&_tr]:border [&_td]:border [&_th]:border [&_*]:w-32 [&_*]:text-center"
            >
              <thead>
                <tr>
                  <th>Iface</th>
                  <th>Download MB/s</th>
                  <th>Upload MB/s</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{process.iface}</td>
                  <td>{process.download_mbps}</td>
                  <td>{process.upload_mbps}</td>
                  <td>{process.total_mbps}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </main>
    )
  }
}
