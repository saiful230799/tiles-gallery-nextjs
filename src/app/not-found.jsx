"use client";
import Link from "next/link";
import { FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="hero min-h-[80vh] bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="mb-8">
            <h1 className="text-9xl font-black text-primary/20">404</h1>
          </div>

          <h2 className="text-3xl font-black text-gray-800 mb-4 uppercase tracking-tight">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed font-medium">
            The link you followed may be broken, or the page may have been removed.
          </p>

          <div className="flex justify-center">
            <Link 
              href="/" 
              className="btn btn-primary rounded-2xl px-12 text-white shadow-lg shadow-primary/30 flex items-center gap-2 font-bold"
            >
              <FiHome /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}