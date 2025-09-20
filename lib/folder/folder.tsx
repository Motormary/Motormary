'use client'

import AppIcon from '@/components/app-icon'
import FolderIcon from './folder-icon'

type Folder = {
  children: React.ReactNode
}
export default function Folder({ children }: Folder) {
  return (
    <ul
      style={{ scrollbarWidth: 'thin' }}
      className="p-4 overflow-y-auto pb-10 justify-items-start content-start gap-4 flex flex-wrap h-full w-full"
    >
      {children}
    </ul>
  )
}

export function ImgFolder() {
  return (
    <Folder>
      <li>
        <AppIcon title="Priv" Node={HelloWorld}>
          <FolderIcon />
        </AppIcon>
      </li>
      <li>
        <AppIcon title="Priv2" Node={HelloWorld}>
          <FolderIcon />
        </AppIcon>
      </li>
      <li>
        <AppIcon title="Priv3" Node={HelloWorld}>
          <FolderIcon />
        </AppIcon>
      </li>
      <li>
        <AppIcon title="Priv4" Node={HelloWorld}>
          <FolderIcon />
        </AppIcon>
      </li>
      <li>
        <AppIcon title="Priv5" Node={HelloWorld}>
          <FolderIcon />
        </AppIcon>
      </li>
    </Folder>
  )
}

function HelloWorld() {
  return (
    <Folder>
      <p>Hello World</p>
    </Folder>
  )
}
