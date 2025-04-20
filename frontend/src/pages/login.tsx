import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { button as buttonStyles } from "@/components/button";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!form.email || !form.password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`localhost:4173/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Login failed. Try again.");
        return;
      }

      // Example: Redirect to dashboard (or whatever page you want)
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    }
  };

  return (
    <>
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 pt-3 pb-2 w-full z-10">
        <button onClick={() => navigate("/")} className="flex items-center gap-1">
          <Logo className="w-5 h-5" />
          <span className="text-base font-semibold text-zinc-900 dark:text-white">
            Calora
          </span>
        </button>
        <div className="scale-90">
          <ThemeSwitch />
        </div>
      </header>

      {/* Login form */}
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 px-4">
        <div className="w-full max-w-md space-y-6 p-8 bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow-xl">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Welcome Back</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Log in to continue your health journey!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className={buttonStyles({
                  color: "customGreen",
                  size: "md",
                  radius: "full",
                  variant: "shadow",
                })}
                disabled={!form.email || !form.password}
              >
                Log In
              </button>
            </div>
          </form>

          {/* <a
            href={`${API_BASE_URL}/auth/google`}
            className="block border border-transparent hover:border-white text-white font-semibold p-3 rounded-lg mt-4 mx-auto text-center flex items-center justify-center w-64 bg-zinc-700"
          >
            <img src="/goog.svg" alt="Google Logo" className="w-6 h-6 mr-2" />
            Log in with Google
          </a> */}

          {errorMessage && (
            <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
          )}

          <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}