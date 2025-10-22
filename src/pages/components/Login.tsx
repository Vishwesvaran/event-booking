import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import type { LoginProps } from "../../types"
import { useEffect, useState } from "react"

const Login = () => {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const [data, setData] = useState<LoginProps>({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);


  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!data.username.trim()) newErrors.username = "Username is required.";
    if (!data.password.trim()) newErrors.password = "Password is required.";
    else if (data.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await login(data);
    
    } catch (err) {
      console.error("Login failed:", err);
      setErrors({ password: "Invalid username or password." });
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <section className="flex w-screen mt-15 items-center justify-center">
      <form onSubmit={submit} className="w-[30%] flex rounded-xl border-2 p-5 bg-white shadow-xl border-gray-500/20 flex-col gap-4 ">
        <h2 className="text-center text-2xl font-bold">Login</h2>
        <div className="input-box">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter Username"
            className={`${errors.username ? "border-red-500" : "border-gray-300"}`}
            onChange={(e) => setData((prev: any) => ({ ...prev, username: e.target.value }))}
          />
          {errors.username && (
            <span className="text-red-500 text-sm mt-1">{errors.username}</span>
          )}
        </div>
        <div className="input-box">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" autoComplete="current-password" name="password" placeholder="Enter Password"
            className={`${errors.password ? "border-red-500" : "border-gray-300"}`}
            onChange={(e) => setData((prev: any) => ({ ...prev, password: e.target.value }))}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </div>
        <div className="flex gap-1 w-full justify-center">
          <span>Don't have an account?</span>

          <a href="/signup" className="underline text-blue-600">SignUp</a>
        </div>
        <button type="submit" className={`mx-auto w-fit px-5 py-3 text-white text-xl font-semibold rounded-xl transition-all duration-200 ${isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 cursor-pointer"
          }`} disabled={isSubmitting}>
          Login
        </button>
      </form>
    </section>
  )
}

export default Login