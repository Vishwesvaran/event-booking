import { Route, Routes } from "react-router-dom"
import Navbar from "./pages/components/Navbar"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"
import SignUp from "./pages/components/SignUp"
import Login from "./pages/components/Login"

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />

    </>
  )
}

export default App