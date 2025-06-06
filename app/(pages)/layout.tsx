import Footer from '@/components/ui/footer'
import TopNav from '@/components/ui/topNav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-full'>
      <header>
        <TopNav />
      </header>
      <div className="container max-w-5xl py-24">{children}</div>
      <Footer />
    </div>
  )
}
