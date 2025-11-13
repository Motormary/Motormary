import { IconContainer } from '../app-icon'

export default function PaintIcon() {
  return (
    <IconContainer>
      <span className="text-white -rotate-45 -translate-1 font-bold relative before:absolute before:content-[''] before:h-2.5 before:bg-white before:w-[1.5px] before:bottom-0 before:rotate-[60deg] before:translate-y-[2.5px] after:absolute after:content-[''] after:h-1 after:w-3.5 after:bg-red-200 after:-bottom-1 after:right-0 after:translate-y-[-1px] after:translate-x-[-0px]">
        |
      </span>
    </IconContainer>
  )
}
