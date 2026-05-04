"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [featuredTiles, setFeaturedTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tiles") 
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tiles");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setFeaturedTiles(data.slice(0, 4));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-base-100">

      <section 
        className="hero min-h-[75vh] relative flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="hero-content text-center relative z-10 text-white">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Discover Your Perfect <span className="text-blue-400">Aesthetic</span>
            </h1>
            <p className="py-6 text-lg font-light opacity-90">
              Explore our premium collection of tiles to transform your space into a masterpiece.
            </p>
            <Link href="/all-tiles" className="btn btn-primary btn-wide rounded-full text-white font-bold text-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all">
              Browse Now
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-primary py-4 overflow-hidden whitespace-nowrap border-y border-white/10">
        <div className="inline-block animate-marquee text-white font-bold uppercase tracking-widest text-sm">
          New Arrivals: Marble Royal | Weekly Feature: Modern Geometric Patterns | Join the Community... &nbsp;&nbsp;
          New Arrivals: Marble Royal | Weekly Feature: Modern Geometric Patterns | Join the Community... &nbsp;&nbsp;
          New Arrivals: Marble Royal | Weekly Feature: Modern Geometric Patterns | Join the Community...
        </div>
      </div>

      <section className="container mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-4xl font-black uppercase leading-none">
              Featured <span className="text-primary">Tiles</span>
            </h2>
            <div className="h-2 w-20 bg-primary mt-2"></div>
          </div>
          
          <Link href="/all-tiles" className="btn btn-outline btn-primary rounded-xl px-8 hover:scale-105 transition-all">
            View All Tiles
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTiles.map((tile) => (
              <Link 
                key={tile._id} 
                href={`/all-tiles/${tile._id}`} 
                className="card bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden group cursor-pointer"
              >
                <figure className="h-52 relative m-2 overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </figure>
                <div className="card-body p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="card-title text-md font-bold uppercase truncate flex-1 group-hover:text-primary transition-colors">
                      {tile.title}
                    </h2>
                    <span className="badge badge-ghost text-xs uppercase">{tile.category || 'Premium'}</span>
                  </div>
                  <p className="text-primary font-black text-2xl mb-4">${tile.price}</p>
                  <div className="card-actions">

                    <div className="btn btn-primary btn-sm btn-block rounded-lg text-white border-none hover:bg-primary/90 hover:brightness-110 transition-all">
                      View Details
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}