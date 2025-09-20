'use client'
type Folder = {
  children: React.ReactNode
}
export default function Folder({ children }: Folder) {
  return <div>{children}</div>
}

export function ImgFolder() {
  return (
    <Folder>
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
        </ul>
      </div>
    </Folder>
  )
}
