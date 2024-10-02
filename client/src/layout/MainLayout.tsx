import Navbar from "@/components/Navbar"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      <header>
        <Navbar />
      </header>
    </div>
  )
}

export default MainLayout