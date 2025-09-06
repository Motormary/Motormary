import { contentGrid, cssReset } from './data'

export function copyContentGrid() {
  navigator.clipboard.writeText(contentGrid)
}

export function copyCssReset() {
  navigator.clipboard.writeText(cssReset)
}
