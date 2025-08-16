export default async function DashboardPage() {
  let data

  const res = await fetch('http://localhost:3000/api/cpu')
  const json = await res.json()
  if (res.ok) {
    data = json
  } else {
    data = {
      cpu: 'Error fetching CPU data',
      memory: 'Error fetching memory data',
    }
  }

  return (
    <div>
      DashboardPage
      <div>cpu: {data.cpu}</div>
      <div>memory: {data.memory}</div>
    </div>
  )
}
