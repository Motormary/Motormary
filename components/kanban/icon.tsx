import Link from 'next/link'
import { IconContainer } from '../app-icon'

export default function KanbanIcon() {
  return (
    <Link
      href={'/kanban'}
      className="max-w-20 cursor-default p-1 group outline-none focus-visible:ring rounded-lg ring-green-400 transition-all ring-offset-2 ring-offset-transparent"
    >
      <IconContainer>
        <div className="p-1 *:border *:border-green-400 *:rounded-xs *:w-4 *:aspect-square grid grid-cols-2 gap-1 ">
          <div />
          <div />
          <div />
          <div />
        </div>
      </IconContainer>
      <p className="mx-auto max-w-20 truncate">Kanban</p>
    </Link>
  )
}
