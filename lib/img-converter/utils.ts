import React from 'react'

export function addPreventWindowDrag() {
  window.addEventListener('dragover', (e) => {
    e.preventDefault()
  })
  window.addEventListener('drop', (e) => {
    e.preventDefault()
  })
}

export function removePreventWindowDrag() {
  window.removeEventListener('dragover', (e) => {
    e.preventDefault()
  })
  window.removeEventListener('drop', (e) => {
    e.preventDefault()
  })
}

const fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export function validFileType(file: DataTransferItem | File) {
  return fileTypes.includes(file.type)
}

export function returnFileSize(number: number) {
  if (number < 1e3) {
    return `${number} bytes`
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`
  }
  return `${(number / 1e6).toFixed(1)} MB`
}
