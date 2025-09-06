'use server'
import 'server-only'
import util from 'util'
import { exec } from 'child_process'
import { verifySession } from '../auth/verify-session'

const execAsync = util.promisify(exec)

const allowedCommands = [
  'lsblk',
  'ss',
  'netstat',
  'pm2',
  'tree',
  'lshw',
  'free',
  'lscpu',
]

export async function Execute(command: string) {
  const cmd = command.replace('sudo ', '')
  const isAllowed = allowedCommands.some(
    (allowed) => allowed === cmd.split(' ')[0],
  )
  const session = await verifySession()
  if (!session || !isAllowed)
    return { stdout: null, stderr: `Command not found ${command}` }

  try {
    const { stdout, stderr } = await execAsync(cmd, {
      timeout: 5000,
      maxBuffer: 1024 * 1024,
    })
    return { stdout, stderr }
  } catch (error) {
    return { stdout: null, stderr: error as string }
  }
}
