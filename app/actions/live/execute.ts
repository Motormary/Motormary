'use server'
import 'server-only'
import util from 'util'
import { exec } from 'child_process'
import { verifySession } from '../auth/verify-session'

const execAsync = util.promisify(exec)

export async function Execute(command: string) {
  console.log('verifying before executing')
  const session = await verifySession()
  if (!session) return
  console.log('executing')
  const { stdout, stderr } = await execAsync(command)
  console.log('error:', stderr)
  console.log('out:', stdout)
}
