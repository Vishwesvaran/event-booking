import { Route, Routes } from "react-router-dom"
import Navbar from "./pages/components/Navbar"
import Home from "./pages/Home"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer/>

    </>
  )
}

export default App