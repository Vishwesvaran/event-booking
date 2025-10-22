import { Ticket } from "lucide-react"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-3 border-b-2 border-gray-500/80 px-20">
        <a className="flex items-center gap-2" href="/">
            <Ticket className="size-8 text-blue-500"/>
            <span className="text-2xl font-semibold">EventHub</span>
        </a>
        
    </nav>
  )
}

export default Navbar