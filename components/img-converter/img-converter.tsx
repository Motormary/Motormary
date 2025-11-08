'use client'

import {
  addPreventWindowDrag,
  removePreventWindowDrag,
  returnFileSize,
  validFileType,
} from '@/lib/img-converter/utils'
import React, { useEffect, useState, useTransition } from 'react'
import { Button } from '../ui/button'
import { Slider } from '../ui/slider'
import { Input } from '../ui/input'
import { Checkbox } from '../ui/checkbox'
import { Switch } from '../ui/switch'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { Progress } from '../ui/progress'
import { cn } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'

export type Convert = {
  quality: string | number
  resize: string | number
  strip: boolean
}

export type Items = {
  alt: string
  src: string
  size: string
}

export default function ImgConverter() {
  const [items, setItems] = useState<Items[] | null>(null)
  const [formData, setFormData] = useState<Convert>({
    quality: 75,
    resize: 100,
    strip: false,
  })
  const [resizePx, setResizePx] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    addPreventWindowDrag()
    return () => {
      removePreventWindowDrag()
    }
  }, [])

  function handleDrop(event: React.DragEvent) {
    event.preventDefault()
    event.currentTarget.classList.remove('border-green-400')
    if (!event?.dataTransfer?.items.length) return

    const invalidItems = Array.from(event.dataTransfer.items).filter(
      (item) => !validFileType(item),
    )
    if (invalidItems.length) {
      alert('One or more files had an invalid format and will be discarded')
    }
    const newItems = Array.from(event.dataTransfer.items)
      .filter((item) => validFileType(item))
      .map((item) => ({
        alt: item.getAsFile()?.name ?? 'undefined',
        src: URL.createObjectURL(item.getAsFile() as Blob),
        size: returnFileSize(item.getAsFile()?.size as number) ?? '0',
      }))
    setItems(newItems)
  }

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files
    if (files?.length) {
      const newItems = Array.from(files)
        .filter((item) => validFileType(item))
        .map((item) => ({
          alt: item.name ?? 'undefined',
          src: URL.createObjectURL(item as Blob),
          size: returnFileSize(item.size) ?? '0',
        }))
      setItems(newItems)
      event.target.value = ''
    }
  }

  function handleDragOver(event: React.DragEvent) {
    event.currentTarget.classList.add('border-green-400')
  }
  function handleDragLeave(event: React.DragEvent) {
    event.currentTarget.classList.remove('border-green-400')
  }

  function onSubmit() {
    if (!items) return

    const results: { name: string; blob: Blob }[] = []

    startTransition(async () => {
      for (const item of items) {
        setProgress((prev) => prev + 1)
        const response = await fetch('/api/resize', {
          method: 'POST',
          body: await (async () => {
            const fd = new FormData()
            fd.append(
              'file',
              await fetch(item.src).then((r) => r.blob()),
              item.alt,
            )
            fd.append('quality', String(formData.quality))
            fd.append(
              'resize',
              String(formData.resize) + (resizePx ? 'x' : '%'),
            )
            fd.append('strip', String(formData.strip))
            return fd
          })(),
        })

        if (!response.ok) {
          const err = await response.text()
          console.error('Conversion failed', err)
          setError(err.replaceAll('"', ''))
          setTimeout(() => setError(''), 2000)
          continue
        }

        const blob = await response.blob()
        results.push({ name: `converted-${item.alt}`, blob })
      }

      if (!results.length) return

      const zip = new JSZip()
      for (const { name, blob } of results) {
        zip.file(name, blob)
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' })
      saveAs(zipBlob, 'converted-files.zip')
      setProgress(0)
      setItems(null)
    })
  }

  return (
    <div
      className="p-4 pb-12 h-full overflow-auto space-y-4 font-mono"
      style={{ scrollbarWidth: 'thin' }}
    >
      <label
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        id="dropzone"
        className="block hover:border-green-400 focus-visible:outline-none focus-visible:border-green-400 border border-foreground rounded-sm border-dashed min-h-52 place-content-center"
      >
        {items ? (
          <ul
            className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] select-none gap-1 max-h-56 overflow-y-auto"
            style={{ scrollbarWidth: 'thin' }}
          >
            {items.map((item) => (
              <li
                title={item.alt}
                key={item.src}
                className="flex gap-1 py-1 w-fit mx-auto"
              >
                <picture>
                  <img
                    className="size-5 object-contain inline min-w-4"
                    src={item.src}
                    alt={item.alt}
                  />
                </picture>
                <div>
                  <p className="text-gray-200 max-w-20 truncate">{item.alt}</p>
                  <p className="text-sm text-gray-400">{item.size}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="text-center">Select or drop images here...</p>
            <p className="text-sm text-gray-400 text-center">
              .png, .jpg, .jpeg, .webp
            </p>
          </>
        )}
        <input
          onChange={handleSelect}
          className="hidden"
          multiple
          type="file"
          name="image"
          id="image"
          accept=".png, .jpg, .jpeg, .webp"
        />
      </label>
      <Progress
        className={cn(!isPending && 'opacity-0')}
        value={(100 / (items?.length ?? 0)) * progress}
        max={100}
      />
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(210px,_1fr))] gap-4 w-full py-2">
        <label htmlFor="resize" className="max-w-52 flex flex-col gap-1">
          <div className="flex gap-4">
            <span>Resize</span>
            <div className="flex items-center gap-1">
              <span className="text-xs">%</span>
              <Switch
                onCheckedChange={(e) => {
                  setFormData((prev) => ({ ...prev, resize: '0' }))
                  setResizePx(e)
                }}
              />
              <span className="text-xs">px</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {resizePx ? (
              <span>Width:</span>
            ) : (
              <Slider
                value={[Number(formData.resize)]}
                onValueChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    resize: value[0],
                  }))
                }}
                max={200}
                onClick={(e) => e.preventDefault()}
              />
            )}
            <Input
              value={formData.resize}
              onInput={(e) => {
                const val = e.currentTarget.value ?? 0
                setFormData((prev) => ({
                  ...prev,
                  resize: val,
                }))
              }}
              id="resize"
              name="resize"
              className="max-w-13 text-center"
              max={100}
              maxLength={4}
            />
            {resizePx ? <span>px</span> : null}
          </div>
        </label>
        <label htmlFor="quality" className="max-w-52 flex flex-col gap-1">
          <span>Quality %</span>
          <div className="flex gap-1">
            <Slider
              value={[Number(formData.quality)]}
              onValueChange={(value) => {
                setFormData((prev) => ({
                  ...prev,
                  quality: value[0],
                }))
              }}
              max={100}
              onClick={(e) => e.preventDefault()}
            />
            <Input
              value={formData.quality}
              onInput={(e) => {
                const val = e.currentTarget.value ?? 0
                setFormData((prev) => ({
                  ...prev,
                  quality: val,
                }))
              }}
              id="quality"
              name="quality"
              className="max-w-13 text-center"
              max={100}
              maxLength={3}
            />
          </div>
        </label>
        <label
          htmlFor="strip"
          className="max-w-52 flex items-center gap-4 cursor-pointer"
        >
          <Checkbox name="strip" id="strip" />
          <span className="select-none">Strip MetaData</span>
        </label>
      </div>
      <Button disabled={isPending} onClick={onSubmit}>
        <div className='grid [grid-template-area:"stack"] place-items-center'>
          <RefreshCw
            className={cn(
              isPending ? 'animate-spin' : 'opacity-0',
              '[grid-area:stack]',
            )}
          />
          <span className={cn(isPending && 'opacity-0', '[grid-area:stack]')}>
            Convert
          </span>
        </div>
      </Button>
      {error ? <p className="text-red-500">{error}</p> : null}
    </div>
  )
}
