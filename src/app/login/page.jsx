"use client";
import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.signIn.email(
      { email: formData.email, password: formData.password },
      {
        onSuccess: () => {
          setLoading(false);
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message || "Login failed!");
        },
      }
    );
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="card w-full max-w-md shadow-xl bg-white p-8 rounded-xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label-text font-semibold mb-1">Email Address</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="input input-bordered w-full"
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button disabled={loading} className="btn btn-primary w-full text-white mt-4">
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </button>
        </form>

        <div className="divider my-6 text-gray-400 text-sm">OR CONTINUE WITH</div>

        <button 
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full gap-3 border-gray-300 hover:bg-gray-50 text-gray-700"
        >
          <FcGoogle size={22} />
          Login with Google
        </button>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Do not have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}