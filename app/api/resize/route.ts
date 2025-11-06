// app/api/convert/route.ts
import { verifySession } from '@/app/actions/auth/verify-session'
import { execFile as execFileCb } from 'child_process'
import { readFile, unlink, writeFile } from 'fs/promises'
import { NextRequest } from 'next/server'
import os from 'os'
import path from 'path'
import { promisify } from 'util'

const execFile = promisify(execFileCb)

export async function POST(req: NextRequest) {
  const isAuth = await verifySession()
  if (!isAuth) return Response.json('Unauthorized request', { status: 401 })
  // 1) read form data
  const formData = await req.formData()
  // cast defensively so TS won't complain if your tsconfig lacks "DOM" lib
  const file = formData.get('file') as unknown as File | null
  const quality = (formData.get('quality') as string) ?? ''
  const resize = (formData.get('resize') as string) ?? ''
  const strip = formData.get('strip') === 'true'

  if (!file || typeof (file as any).name !== 'string') {
    return new Response(JSON.stringify({ error: 'No file received' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // 2) write input temp file (unique name to avoid collisions)
  const originalName = (file as any).name as string
  const fileType = file.type.split('/')[1]
  const parsed = path.parse(originalName)
  const stamp = Date.now()
  const tmpIn = path.join(os.tmpdir(), `${parsed.name}-${stamp}${parsed.ext}`)
  // ensure we write a .jpg output (change if you want dynamic output format)
  const tmpOut = path.join(os.tmpdir(), `${parsed.name}-${stamp}.${fileType}`)

  const inputBuffer = Buffer.from(await file.arrayBuffer())
  await writeFile(tmpIn, inputBuffer)

  // 3) build ImageMagick arg array (safe: execFile avoids shell expansion)
  const imArgs: string[] = [tmpIn]
  if (resize && resize !== '0') imArgs.push('-resize', resize)
  if (quality) imArgs.push('-quality', quality)
  if (strip) imArgs.push('-strip')
  imArgs.push(tmpOut)

  try {
    // 4) run ImageMagick. try `magick` (v7) and fallback to `convert` (v6)
    await execFile('convert', imArgs)

    // 5) read output and return as binary response
    const outputBuffer = await readFile(tmpOut)
    return new Response(outputBuffer as BodyInit, {
      headers: new Headers({
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="converted-${parsed.name}.${fileType}"`,
      }),
    })
  } finally {
    // 6) cleanup (always attempt)
    await unlink(tmpIn).catch(() => {})
    await unlink(tmpOut).catch(() => {})
  }
}
