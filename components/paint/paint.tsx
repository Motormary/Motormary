'use client'

import React, { useRef, useState, useEffect } from 'react'

export default function PaintCanvas({ open }: { open: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [color, setColor] = useState('black')
  const [lineWidth, setLineWidth] = useState(8)
  const [isDrawing, setIsDrawing] = useState(false)

  function getContext() {
    const canvas = canvasRef.current
    if (!canvas) return null
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    return ctx
  }

  function handleInitial() {
    const ctx = getContext()
    if (!ctx) return

    ctx.lineCap = 'round'
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 8
    ctxRef.current = ctx
  }

  useEffect(() => {
    handleInitial()
  }, [])

  function handleReset() {
    const ctx = getContext()
    if (!ctx) return
    ctx.reset()
    handleInitial()
    setColor('black')
    setLineWidth(8)
  }

  function handleSize(event: React.ChangeEvent<HTMLInputElement>) {
    const ctx = getContext()
    if (!ctx) return
    const width = Number(event.target.value)
    setLineWidth(width)
    ctx.lineWidth = width
  }

  function handleColor(event: React.ChangeEvent<HTMLInputElement>) {
    const ctx = getContext()
    if (!ctx) return
    const clr = event.target.value
    setColor(clr)
    ctx.strokeStyle = clr
  }

  const startDrawing = (e: React.MouseEvent) => {
    if (!ctxRef.current) return
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    if (!ctxRef.current) return
    ctxRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !ctxRef.current) return
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctxRef.current.stroke()
  }

  return (
    <div className="w-[1920px] h-[1080px] relative">
      <div className="flex gap-2 p-2 bg-gray-200">
        <input type="color" value={color} onChange={handleColor} />
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={handleSize}
        />
        <button
          onClick={handleReset}
          className="font-mono text-sm px-2 border border-slate-800 bg-slate-300 not-active:hover:bg-slate-200 cursor-pointer rounded-md text-slate-800"
        >
          Reset
        </button>
      </div>
      <canvas
        ref={canvasRef}
        height={1080}
        width={1920}
        className="w-full h-full bg-white"
        onPointerDown={startDrawing}
        onPointerUp={finishDrawing}
        onPointerMove={draw}
        onPointerLeave={finishDrawing}
      />
    </div>
  )
}
