import { Poppins } from "next/font/google"; 
import "./globals.css";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "900"], 
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Tiles Gallery",
  description: "A website to showcase a tile gallery",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body 
        className="min-h-full flex flex-col font-poppins"
        suppressHydrationWarning={true}
      > 
        
        <Navbar/>
        <main className="flex-grow">
          {children}
        </main>
        <Footer/>
        
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}