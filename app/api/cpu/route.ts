import { NextResponse } from "next/server"
import { exec } from "child_process"
import util from "util"

// Promisify exec for async/await
const execAsync = util.promisify(exec)

export async function GET() {
    try {
        // Get memory usage
        const { stdout: memInfo } = await execAsync("free -m") // -m = show in MB
        console.log("🚀 ~ GET ~ memInfo:", memInfo)
        // Get CPU usage (first line of top -bn1)
        const { stdout: cpuInfo } = await execAsync("top -bn1 | grep 'Cpu(s)'")
        console.log("🚀 ~ GET ~ cpuInfo:", cpuInfo)

        return NextResponse.json({
            memory: memInfo,
            cpu: cpuInfo,
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
