"use client";
import { useEffect, useState } from "react";
import { FiBox, FiTrash2 } from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiry");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      try {
        const res = await fetch(`/api/admin/inquiry/${id}`, { method: "DELETE" });
        if (res.ok) {
          toast.success("Deleted!");
          fetchInquiries();
        }
      } catch (error) {
        toast.error("Error deleting");
      }
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Inquiries ({inquiries.length})</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry._id}>
                <td>{inquiry.customerName}</td>
                <td>{inquiry.tileTitle}</td>
                <td>{inquiry.message}</td>
                <td>
                  <button onClick={() => handleDelete(inquiry._id)} className="text-error">
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}