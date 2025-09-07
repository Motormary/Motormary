'use client'

import {
  addPreventWindowDrag,
  removePreventWindowDrag,
  returnFileSize,
  validFileType,
} from '@/lib/img-converter/utils'
import React, { useEffect, useState } from 'react'

export default function ImgConverter() {
  const [items, setItems] = useState<
    { alt: string; src: string; size: string }[] | null
  >(null)
  useEffect(() => {
    addPreventWindowDrag()
    return () => {
      removePreventWindowDrag()
    }
  }, [])

  function handleDrop(event: React.DragEvent) {
    event.preventDefault()
    event.currentTarget.classList.remove('border-green-400')
    if (!event?.dataTransfer?.items) return
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

  return (
    <div
      className="p-2 pb-12 h-full overflow-auto space-y-4"
      style={{ scrollbarWidth: 'thin' }}
    >
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        id="dropzone"
        className="block hover:border-green-400 focus-visible:border-green-400 border rounded-sm border-dashed min-h-52 place-content-center"
      >
        <p className="text-center">Select or drop images here...</p>
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
      <ul
        className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-1 max-h-56 overflow-y-auto"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items
          ? items.map((item) => (
              <li
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
                  <p
                    title={item.alt}
                    className="text-gray-200 max-w-20 truncate"
                  >
                    {item.alt}
                  </p>
                  <p className="text-sm text-gray-400">{item.size}</p>
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
