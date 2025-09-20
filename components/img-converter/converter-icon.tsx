import { DefaultIcon } from '../app-icon'

export default function ConverterIcon() {
  return (
    <DefaultIcon>
      <div className="size-full relative bg-sky-400">
        <span className="absolute h-2 w-4 left-1 top-2 z-10 rounded-full bg-sky-50" />
        <span className="absolute h-2 w-4 left-3 top-3 z-10 rounded-full bg-sky-50" />
        <span className="absolute size-3 rounded-full bg-amber-200 right-2 top-1" />
        <span className="size-10 rotate-45 border rounded-lg absolute left-0 -bottom-5 bg-gray-600" />
        <span className="size-10 rotate-45 border rounded-lg absolute left-5 -bottom-7 bg-gray-500 shadow-[-5px_5px_5px_rgb(0,0,0,0.5)]" />
      </div>
    </DefaultIcon>
  )
}
