export default function FolderIcon() {
  return (
    <div className="size-14 mx-auto flex flex-col items-center justify-center rounded-b-sm">
      <span className="h-1.5 w-full block">
        <span className="h-full translate-x-1 w-6 rounded-t-sm bg-[#E9AD0A] block" />
      </span>
      <span className="relative bg-[#E9AD0A] block pt-1 max-h-10 h-full w-full max-w-12 rounded-r-sm rounded-b-sm">
        <span className="bg-white h-[90%] w-[88%] rounded-sm mx-auto block" />
        <span className="absolute w-full h-8 rounded-t-sm rotate-6 -skew-6 bg-[#F8CB63] rounded-b-sm -bottom-0 left-1" />
      </span>
    </div>
  )
}
