import TopNav from "@/components/ui/topNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-svh">
      <header>
        <TopNav />
      </header>
      <main className="container">{children}</main>
    </div>
  )
}
