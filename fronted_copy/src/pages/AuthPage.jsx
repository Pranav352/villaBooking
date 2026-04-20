import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import toast from "react-hot-toast"
import { getUsers, upsertUser } from "../services/userService"
import ButtonLoader from "../components/ButtonLoader"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
})

function AuthPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isRegisterMode ? registerSchema : loginSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const users = await getUsers()

      if (isRegisterMode) {
        const existingUser = users.find((u) => u.email === data.email)
        if (existingUser) {
          toast.error("An account with this email already exists.")
          setIsLoading(false)
          return
        }

        const safeName = data.name.trim()
        await upsertUser({ name: safeName, email: data.email, password: data.password })
        
        toast.success("Registration successful! Please log in.")
        setIsRegisterMode(false)
        reset()
        setIsLoading(false)
        return
      }

      // Login Mode
      const existingUser = users.find((u) => u.email === data.email)
      if (!existingUser) {
        toast.error("Account not found. Please register first.")
        setIsLoading(false)
        return
      }

      if (existingUser.password && existingUser.password !== data.password) {
        toast.error("Invalid password. Please try again.")
        setIsLoading(false)
        return
      }

      // Proceed with login
      localStorage.setItem(
        "villa_user",
        JSON.stringify({ name: existingUser.name, email: existingUser.email })
      )
      window.dispatchEvent(new Event("auth-change"))
      
      toast.success(`Welcome back, ${existingUser.name}!`)
      const redirectTo = searchParams.get("redirect") || "/"
      setTimeout(() => navigate(redirectTo), 700)
    } catch (err) {
      console.error("Auth error:", err)
      toast.error("An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="bg-slate-900 p-8 text-white">
        <h1 className="text-3xl font-bold">{isRegisterMode ? "Create Account" : "Welcome Back"}</h1>
        <p className="mt-2 text-slate-300">
          {isRegisterMode ? "Join us for a premium villa experience." : "Sign in to manage your bookings."}
        </p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {isRegisterMode && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                  errors.name ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:ring-slate-100"
                }`}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p>}
            </div>
          )}
          
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                errors.email ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:ring-slate-100"
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-2 ${
                errors.password ? "border-rose-300 focus:ring-rose-100" : "border-slate-200 focus:ring-slate-100"
              }`}
            />
            {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition-all hover:bg-slate-800 disabled:opacity-70"
          >
            {isLoading ? <ButtonLoader /> : (isRegisterMode ? "Create Account" : "Sign In")}
          </button>
        </form>

        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
          <p className="text-sm text-slate-600">
            {isRegisterMode ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => {
                setIsRegisterMode((prev) => !prev)
                reset()
              }}
              className="ml-2 font-bold text-slate-900 hover:underline"
            >
              {isRegisterMode ? "Log In" : "Register Now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
