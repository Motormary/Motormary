'use server'
import { exec } from 'child_process'
import 'server-only'
import util from 'util'
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
  'help',
  'docker',
  'who', 
  'last', 
  'shutdown'
]

export async function Execute(command: string) {
  const cmd = command.replace('sudo ', '')
  const isAllowed = allowedCommands.some(
    (allowed) => allowed === cmd.split(' ')[0],
  )
  const session = await verifySession()
  if (!session || !isAllowed)
    return { stdout: null, stderr: `Command not found ${command}` }

  if (cmd == 'help') return {stderr: null, stdout: JSON.stringify(allowedCommands, null, 2)}
  
  try {
    const { stdout, stderr } = await execAsync(cmd, {
      timeout: 10000,
      maxBuffer: 10 * 1024 * 1024,
    })
    return { stdout, stderr }
  } catch (error) {
    return { stdout: null, stderr: error as string }
  }
}
