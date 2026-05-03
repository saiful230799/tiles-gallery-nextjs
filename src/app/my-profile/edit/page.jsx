"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setImage(session.user.image || "");
        }
    }, [session]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await authClient.updateUser({
                name: name,
                image: image,
            });
            toast.success("Profile updated successfully! 🚀", { position: "top-center" });
            setTimeout(() => router.push("/my-profile"), 2000);
        } catch (error) {
            toast.error("Failed to update profile!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) return <div className="text-center mt-20"><span className="loading loading-spinner text-primary"></span></div>;

    return (
        <div className="container mx-auto py-12 px-4">
            <ToastContainer />
            <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="form-control">
                        <label className="label font-semibold text-gray-600">Full Name</label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full rounded-xl focus:border-primary" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-gray-600">Profile Image URL</label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full rounded-xl focus:border-primary" 
                            value={image} 
                            onChange={(e) => setImage(e.target.value)} 
                            placeholder="Enter image URL"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary w-full text-white font-bold rounded-xl h-14"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={() => router.push("/my-profile")}
                        className="btn btn-ghost w-full text-gray-500"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;