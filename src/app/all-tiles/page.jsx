"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiEye } from "react-icons/fi";
import Image from "next/image";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [filteredTiles, setFilteredTiles] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOrder, setSortOrder] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tiles")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTiles(data);
          setFilteredTiles(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...tiles];
    if (searchQuery) {
      result = result.filter((tile) =>
        tile.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }
    setFilteredTiles(result);
  }, [searchQuery, sortOrder, tiles]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="container mx-auto py-12 px-6">
      
 
      <div className="mb-10 text-center md:text-center items-center">
        <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
          Our <span className="text-primary">Products</span>
        </h2>
        <p className="text-gray-500 mt-2">Browse our complete collection of premium tiles</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative w-full md:w-1/2">
          <FiSearch className="absolute left-4 top-4 text-gray-400 z-10" size={18} />
          <input
            type="text"
            placeholder="Search tiles by name..."
            className="input input-bordered w-full pl-12 focus:border-primary rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/4">
          <select
            className="select select-bordered w-full rounded-xl focus:border-primary"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTiles.map((tile) => (
          <div
            key={tile._id}
            onClick={() => router.push(`/all-tiles/${tile._id}`)}
            className="card bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-[32px] overflow-hidden cursor-pointer group"
          >
            <figure className="h-52 overflow-hidden relative m-4 mb-0 rounded-2xl">
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-white/20 z-10">
                 <span className="text-primary font-bold text-[10px] uppercase tracking-wider">
                   {tile.category || "Premium"}
                 </span>
              </div>
            </figure>
            
            <div className="card-body p-6 pt-4">
              <h2 className="text-lg font-bold text-gray-800 uppercase truncate">
                {tile.title}
              </h2>
              <p className="text-gray-400 text-xs mt-1 line-clamp-1">
                {tile.description || "High quality durable tiles"}
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="text-3xl font-black text-primary">
                  ${tile.price}
                </div>
                <button className="btn btn-primary btn-md rounded-2xl w-full gap-2 text-white shadow-md border-none">
                  <FiEye size={18} /> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}