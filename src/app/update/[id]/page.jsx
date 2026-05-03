"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FiEdit3,
  FiImage,
  FiTag,
  FiDollarSign,
  FiSave,
  FiArrowLeft,
  FiAlignLeft,
} from "react-icons/fi";

export default function UpdateTilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/tiles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title || "",
            price: data.price || "",
            image: data.image || "",
            description: data.description || "",
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load tile data");
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const response = await fetch(`/api/tiles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price), 
        }),
      });

      if (response.ok) {
        toast.success("Tile updated successfully!");
        setTimeout(() => router.push("/my-tiles"), 800);
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Update failed!");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <ToastContainer theme="colored" />
      <div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-800 tracking-tight flex items-center justify-center gap-3">
            <FiEdit3 className="text-primary" /> Update Tile Details
          </h1>
          <div className="h-1.5 w-16 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                <FiTag /> Title
              </span>
            </label>
            <input
              className="input input-bordered w-full bg-gray-50 focus:bg-white transition-all rounded-xl border-gray-200 focus:border-primary"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter tile title"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                <FiAlignLeft /> Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full bg-gray-50 focus:bg-white h-28 rounded-xl border-gray-200 focus:border-primary"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the tile quality..."
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                  <FiDollarSign /> Price ($)
                </span>
              </label>
              <input
                className="input input-bordered w-full bg-gray-50 focus:bg-white rounded-xl border-gray-200 focus:border-primary"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-600 flex items-center gap-2">
                  <FiImage /> Image URL
                </span>
              </label>
              <input
                className="input input-bordered w-full bg-gray-50 focus:bg-white rounded-xl border-gray-200 focus:border-primary"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="Paste link here"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <button
              type="submit"
              disabled={updating}
              className="btn btn-primary w-full text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/20 h-14"
            >
              {updating ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <span className="flex items-center gap-2">
                  <FiSave /> Save Changes
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/my-tiles")}
              className="btn btn-ghost w-full text-gray-500 font-medium flex items-center gap-2"
            >
              <FiArrowLeft /> Cancel & Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
