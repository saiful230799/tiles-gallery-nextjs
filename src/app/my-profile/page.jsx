"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Please login to view your profile.</h2>
            </div>
        );
    }

    const { user } = session;

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">

                <div className="h-32 bg-gradient-to-r from-primary to-blue-500"></div>

                <div className="px-8 pb-8">

                    <div className="flex flex-col md:flex-row items-end md:items-center gap-6 -mt-12 mb-6">
                        <div className="avatar">
                            <div className="w-28 h-28 rounded-2xl ring-4 ring-white shadow-2xl overflow-hidden bg-white">
                                <img 
                                    src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="pt-2 md:pt-10 mt-4">
                            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">{user.name}</h1>
                            <p className="text-primary font-bold text-lg">Owner</p>
                        </div>
                    </div>

                    <div className="divider my-4 opacity-50"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Full Name</label>
                            <p className="text-gray-700 font-semibold bg-gray-50 p-3 rounded-xl border border-gray-100">
                                {user.name}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Email Address</label>
                            <p className="text-gray-700 font-semibold bg-gray-50 p-3 rounded-xl border border-gray-100">
                                {user.email}
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Location</label>
                            <p className="text-gray-700 font-semibold bg-gray-50 p-3 rounded-xl border border-gray-100">
                                Dhaka,Bangladesh
                            </p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider text-gray-400 font-bold">Account Status</label>
                            <p className="text-green-600 font-semibold bg-green-50 p-3 rounded-xl border border-green-100 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Active Member
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <button 
                            onClick={() => router.push("/my-profile/edit")}
                            className="btn btn-primary px-10 rounded-xl shadow-lg shadow-blue-100 normal-case font-bold"
                        >
                            Edit Profile
                        </button>
                        <button className="btn btn-outline px-10 rounded-xl normal-case font-bold">
                            Account Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;