import Footer from "@/components/ui/footer"
import TopNav from "@/components/ui/topNav"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-svh border py-12">
      <header>
        <TopNav />
      </header>
      <main className="container my-10">{children}</main>
        <Footer />
    </div>
  )
}
