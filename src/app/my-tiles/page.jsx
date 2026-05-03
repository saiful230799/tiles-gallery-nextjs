"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEdit, FiTrash2, FiPackage, FiAlertCircle } from "react-icons/fi";

export default function MyTilesPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter(); 
  const [myTiles, setMyTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/tiles?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyTiles(data);
          setLoading(false);
        });
    }
  }, [session]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this tile?")) {
      try {
        const response = await fetch(`/api/tiles/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();

        if (response.ok) { 
          const remainingTiles = myTiles.filter((tile) => tile._id !== id);
          setMyTiles(remainingTiles);

          toast.success("Tile removed successfully!", {
            position: "top-center",
          });
        } else {
          toast.error("Failed to delete!");
        }
      } catch (error) {
        console.error("Delete Error:", error);
        toast.error("Something went wrong!");
      }
    }
  };

  if (isPending) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session)
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-xl font-semibold text-gray-600">
        <FiAlertCircle size={40} className="text-warning mb-2" />
        Please Login first!
      </div>
    );

  return (
    <div className="container mx-auto py-10 px-4">
      <ToastContainer theme="colored" />
      <h1 className="text-3xl font-black mb-8 text-center text-gray-800 flex items-center justify-center gap-3">
        <FiPackage className="text-primary" /> My Uploaded Tiles
        <div className="h-1 w-20 bg-primary mx-auto mt-2 rounded-full hidden"></div>
      </h1>

      {loading ? (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-md text-primary"></span>
        </div>
      ) : myTiles.length === 0 ? (
        <p className="text-center text-gray-500 bg-white p-10 rounded-2xl shadow-sm border border-dashed border-gray-200">
          You have not added any tiles yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-xl">
          <table className="table w-full bg-white">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="py-5 px-6">Tile Image</th>
                <th>Title</th>
                <th>Price</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myTiles.map((tile) => (
                <tr
                  key={tile._id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-50"
                >
                  <td className="py-4 px-6">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-20 h-14 object-cover rounded-xl shadow-md"
                    />
                  </td>
                  <td className="font-bold text-gray-800">{tile.title}</td>
                  <td className="text-primary font-black text-lg">${tile.price}</td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => router.push(`/update/${tile._id}`)}
                        className="btn btn-sm btn-info text-white rounded-lg px-4 gap-2 border-none shadow-md"
                      >
                        <FiEdit /> Update
                      </button>
                      <button
                        onClick={() => handleDelete(tile._id)}
                        className="btn btn-sm btn-error text-white rounded-lg px-4 gap-2 border-none shadow-md"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}