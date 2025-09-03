export default function TerminalUser() {
  return (
    <>
      <span className="text-green-400">sysadmin@skyen</span>
      <span>:</span>
      <span className="text-blue-400">~</span>
      <span className="mr-1">$</span>
    </>
  )
}

export function TerminalPassword() {
  return (
    <>
      <span className="text-white">{`[Password]`}</span>
      <span>:</span>
    </>
  )
}
