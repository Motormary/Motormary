import { getBandwidth } from '@/lib/dashboard/utils'
import { exec } from 'child_process'
import util from 'util'
const execAsync = util.promisify(exec)

export async function GET() {
  try {
    const { stdout: memInfo } = await execAsync('free -m')
    const { stdout: cpuInfo } = await execAsync("top -bn1 | grep 'Cpu(s)'")
    const bandwith = await getBandwidth()

    return Response.json(
      {
        cpu: cpuInfo.trim(),
        memory: memInfo.trim(),
        bandwith,
      },
      {
        status: 200,
      },
    )
  } catch (error) {
    throw new Error('Something went wrong', error ?? '')
  }
}
