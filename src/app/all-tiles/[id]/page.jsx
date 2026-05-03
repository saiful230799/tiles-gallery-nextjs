"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft, FiLayers, FiCalendar, FiShoppingCart, FiSend, FiX } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function TileDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTile = async () => {
      try {
        const res = await fetch(`/api/tiles/${id}`);
        const data = await res.json();
        if (res.ok) {
          setTile(data);
        }
      } catch (error) {
        console.error("Error fetching tile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTile();
  }, [id]);

  const handleInquiry = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const form = e.target;
    const inquiryData = {
      tileTitle: tile.title,
      tileId: tile._id,
      customerName: form.name.value,
      customerEmail: form.email.value,
      message: form.message.value,
      createdAt: new Date(),
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiryData),
      });

      if (res.ok) {
        toast.success("Your inquiry has been sent successfully!"); 
        form.reset();
        document.getElementById("inquiry_modal").close();
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error("Server error, please try later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!tile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600">Tile not found!</h2>
        <button onClick={() => router.push("/all-tiles")} className="btn btn-primary mt-4">Back to Gallery</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => router.back()}
          className="btn btn-ghost gap-2 mb-8 hover:bg-gray-100 rounded-xl"
        >
          <FiArrowLeft /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <img 
              src={tile.image} 
              alt={tile.title} 
              className="w-full h-[500px] object-cover rounded-[40px] shadow-2xl"
            />
            <div className="absolute top-6 left-6">
              <span className="badge badge-primary p-4 py-5 text-white font-bold rounded-2xl shadow-lg uppercase">
                {tile.category || "Premium"}
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight">
                {tile.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-500 font-medium">
                <span className="flex items-center gap-2"><FiLayers className="text-primary"/> {tile.category}</span>
                <span className="flex items-center gap-2"><FiCalendar className="text-primary"/> {new Date(tile.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-[32px] border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-black mb-1">Price per unit</p>
                  <h2 className="text-5xl font-black text-primary">
                    ${tile.price}
                  </h2>
                </div>
                <button 
                  onClick={() => document.getElementById("inquiry_modal").showModal()}
                  className="btn btn-primary btn-lg rounded-2xl px-10 shadow-xl shadow-primary/30 text-white border-none w-full sm:w-auto gap-2"
                >
                  <FiShoppingCart /> Inquiry Now
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {tile.description}
              </p>
            </div>
            
            <div className="pt-8 border-t border-gray-100 flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-12">
                  <span className="uppercase">{tile.userName?.charAt(0) || "S"}</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Added By</p>
                <p className="text-gray-800 font-bold">{tile.userName || "Saiful Islam"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="inquiry_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-[32px] p-8 shadow-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-2xl text-gray-800 uppercase tracking-tight">Inquiry Now</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost"><FiX size={20}/></button>
            </form>
          </div>
          
          <p className="text-gray-500 mb-6 text-sm font-medium">Please fill out the form below to inquire about this product.</p>

          <form onSubmit={handleInquiry} className="space-y-4">
            <div className="form-control">
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                className="input input-bordered w-full rounded-xl bg-gray-50 border-none focus:ring-2 ring-primary/20" 
                required 
              />
            </div>
            <div className="form-control">
              <input 
                type="email" 
                name="email" 
                placeholder="Email Address" 
                className="input input-bordered w-full rounded-xl bg-gray-50 border-none focus:ring-2 ring-primary/20" 
                required 
              />
            </div>
            <div className="form-control">
              <textarea 
                name="message" 
                placeholder="Write your message here..." 
                className="textarea textarea-bordered w-full rounded-xl bg-gray-50 border-none focus:ring-2 ring-primary/20 h-32" 
                required
              ></textarea>
            </div>
            
            <div className="modal-action">
              <button 
                type="submit" 
                disabled={submitting}
                className="btn btn-primary rounded-xl px-12 text-white border-none shadow-lg shadow-primary/20 w-full gap-2 font-bold"
              >
                {submitting ? <span className="loading loading-spinner"></span> : <FiSend />} 
                {submitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}