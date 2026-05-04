import Link from "next/link"; // এই লাইনটি মিসিং ছিল
import {
  FiFacebook,
  FiInstagram,
  FiGithub,
  FiMail,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Logo Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white">
              Tiles<span className="text-primary">Gallery</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs">
              We help you decorate your home with modern and artistic tiles. Quality and elegance are our primary goals.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/all-tiles" className="hover:text-primary transition-colors">
                  All Tiles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-widest text-xs">
              Stay Connected
            </h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FiFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FiInstagram />
              </a>
              <a href="https://github.com/saiful230799" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <FiGithub />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FiMail className="text-primary" /> support@tilesgallery.com
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-gray-800 text-center text-xs font-medium">
          <p className="flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} TilesGallery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}