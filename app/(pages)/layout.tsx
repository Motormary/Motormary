import Footer from '@/components/ui/footer'
import TopNav from '@/components/ui/topNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <TopNav />
      </header>
      <div className="container my-10 max-w-5xl">{children}</div>
      <Footer />
    </div>
  )
}
