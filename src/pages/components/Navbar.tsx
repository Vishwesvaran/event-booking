import { LogOut, Ticket, User } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { toast } from "react-toastify"

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    toast.success('Logout Successfull')
  }

  return (
    <nav className="flex items-center justify-between py-3 border-b-2 border-gray-500/80 px-20">
      <a className="flex items-center gap-2" href="/">
        <Ticket className="size-8 text-blue-500" />
        <span className="text-2xl font-semibold">EventHub</span>
      </a>
      {isAuthenticated ? (
        <button className="bg-black font-semibold cursor-pointer text-white text-xl flex items-center rounded-2xl text-center w-fit px-4 py-2 gap-2 hover:text-black hover:bg-white hover:ring-2 " onClick={handleLogout}>
          <LogOut/>
          logout
        </button>

      ) : (
        <a href="/login" className="bg-black cursor-pointer text-white font-semibold text-xl flex items-center rounded-2xl text-center w-fit px-4 py-2 gap-2 hover:text-black hover:bg-white hover:ring-2" >
          <User/>
          Sign In
        </a>
      )}

    </nav>
  )
}

export default Navbar