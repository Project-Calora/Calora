import { useState } from "react";
import { button as buttonStyles } from "@/components/button";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

export default function SignupPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validatePassword = (password: string, confirmPassword: string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    setPasswordValid(minLength && hasNumber && hasSpecialChar);
    setPasswordsMatch(password === confirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    validatePassword(updatedForm.password, updatedForm.confirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!passwordValid) {
      setErrorMessage("Password does not meet requirements.");
      return;
    }

    if (!passwordsMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const response = await fetch(`localhost:4173/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();

    if (response.status === 409) {
      setErrorMessage("An account with this email already exists.");
      return;
    }

    if (response.ok) {
      alert("Verification Required! Check your email for a 6-digit code.");
      navigate(`/verify?email=${encodeURIComponent(form.email)}`);
    } else {
      setErrorMessage(data.message || "Signup failed. Try again.");
    }
  };

  return (
    <>
    <header className="flex items-center justify-between px-4 pt-3 pb-2 w-full z-10">
      <button onClick={() => navigate("/")} className="flex items-center gap-1">
          <Logo className="w-5 h-5" /> {/* Smaller logo */}
          <span className="text-base font-semibold text-zinc-900 dark:text-white">
          Calora
          </span>
      </button>

      <div className="scale-90"> {/* Shrinks the ThemeSwitch */}
          <ThemeSwitch />
      </div>
    </header>
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900 px-4">
      <div className="w-full max-w-md space-y-6 p-8 bg-zinc-100 dark:bg-zinc-800 rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Create an Account</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Sign up to start tracking your calories!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

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
              onFocus={() => setShowRequirements(true)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              onFocus={() => setShowRequirements(true)}
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {showRequirements && (
            <ul className="text-sm text-center text-zinc-600 dark:text-zinc-400 space-y-1">
              <li className={form.password.length >= 8 ? "text-green-500" : ""}>• At least 8 characters</li>
              <li className={/\d/.test(form.password) ? "text-green-500" : ""}>• At least one number</li>
              <li className={/[!@#$%^&*]/.test(form.password) ? "text-green-500" : ""}>• At least one special character</li>
              <li className={passwordsMatch ? "text-green-500" : ""}>• Passwords match</li>
            </ul>
          )}

            <div className="flex justify-center">
                <button
                    type="submit"
                    className={buttonStyles({
                    color: "customGreen",
                    size: "md",
                    radius: "full",
                    variant: "shadow",
                    })}
                    disabled={!passwordValid || !passwordsMatch}
                >
                    Sign Up
                </button>
            </div>
        </form>

        {/* <a
          href={`${API_BASE_URL}/auth/google`}
          className="block border border-transparent hover:border-white text-white font-semibold p-3 rounded-lg mt-4 mx-auto text-center flex items-center justify-center w-64 bg-zinc-700"
        >
          <img src="/goog.svg" alt="Google Logo" className="w-6 h-6 mr-2" />
          Sign up with Google
        </a> */}

        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}

        <p className="text-sm text-center text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}