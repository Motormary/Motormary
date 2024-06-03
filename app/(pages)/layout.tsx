import TopNav from "@/components/ui/topNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen">
      <header>
        <TopNav />
      </header>
      <main className="container">{children}</main>
    </div>
  )
}
