"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FaUser, FaEnvelope, FaBuilding, FaMoneyBillWave, 
  FaPhoneAlt, FaMapMarkerAlt, FaLaptop, FaHeart, 
  FaArrowLeft, FaEdit, FaSave, FaShieldAlt, FaClipboardList 
} from "react-icons/fa";
import { HiOutlineRefresh } from "react-icons/hi";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function EditEmployeeProfile() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "EMPLOYEE",
    departments: "",
    salary: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/employee/${id}`, { 
          credentials: "include",
        });
        const result = await response.json();
        if (result.success) {
          setEmployee(result.data);
          // FIX: Default value logic
          setFormData({
            name: result.data.name || "",
            role: result.data.role || "EMPLOYEE",
            departments: result.data.employeeProfile?.departments || "",
            salary: result.data.employeeProfile?.salary || "",
            phone: result.data.employeeProfile?.phone || "",
            address: result.data.employeeProfile?.address || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEmployee();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tId = toast.loading("Saving changes...");
    
    try {
      const response = await fetch(`http://localhost:5000/api/employee/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", 
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setEmployee(result.data); 
        setIsEditing(false);
        toast.success("Profile updated successfully!", { id: tId });
      } else {
        toast.error(result.message || "Unauthorized access", { id: tId });
      }
    } catch (error) {
      toast.error("Network error. Please check connection.", { id: tId });
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <HiOutlineRefresh className="animate-spin text-slate-700 text-4xl" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans text-slate-800">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-10">
        <Link href="/dashboard/admin/all-employees" className="flex py-4 items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-normal">
          <FaArrowLeft size={14} /> Back to Directory
        </Link>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center gap-2 border border-slate-200 px-5 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all shadow-sm text-slate-700 cursor-pointer"
          >
            <FaEdit size={14} /> Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-10 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-300 shadow-inner">
              <FaUser size={40} />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-3xl font-medium text-slate-900 leading-none">
                {isEditing ? "Modify Employee Account" : employee?.name}
              </h1>
              <div className="flex items-center gap-4 text-slate-600 text-sm font-normal">
                <span className="flex items-center gap-2"><FaEnvelope className="text-slate-700" /> {employee?.email}</span>
                <span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-tight">{employee?.role}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 space-y-10">
              <section className="space-y-6">
                <h3 className="text-[11px] font-bold text-slate-700 uppercase border-b border-slate-100 pb-3">Primary Information</h3>
                
                <div className="space-y-5">
                  <InputField label="Full Name" name="name" value={formData.name} icon={FaUser} isEditing={isEditing} onChange={handleChange} />
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                      <FaShieldAlt className="text-slate-700" /> System Access Role
                    </label>
                    <select 
                      name="role" 
                      value={formData.role} 
                      onChange={handleChange} 
                      disabled={!isEditing}
                      className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-normal focus:border-slate-400 outline-none transition-all disabled:bg-slate-50 disabled:text-slate-500 cursor-pointer"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="EMPLOYEE">EMPLOYEE</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <InputField label="Department" name="departments" value={formData.departments} icon={FaBuilding} isEditing={isEditing} onChange={handleChange} />
                    <InputField label="Salary" name="salary" value={formData.salary} icon={FaMoneyBillWave} isEditing={isEditing} onChange={handleChange} type="text" />
                  </div>

                  <InputField label="Phone" name="phone" value={formData.phone} icon={FaPhoneAlt} isEditing={isEditing} onChange={handleChange} />
                  <InputField label="Residential Address" name="address" value={formData.address} icon={FaMapMarkerAlt} isEditing={isEditing} onChange={handleChange} />
                </div>
              </section>
            </div>

            <div className="lg:col-span-5 ">
              <section>
                <h3 className="text-[11px] pt-4 font-bold text-slate-700 uppercase pb-3 flex items-center gap-2">
                  <FaClipboardList /> Hardware Assets
                </h3>
                <div className="space-y-3 border rounded-md border-gray-400 p-2">
                  {employee?.assets?.length > 0 ? employee?.assets?.map((asset: any) => (
                    <div key={asset.id} className="p-4 border border-slate-100 rounded-lg flex justify-between items-center bg-slate-50/30">
                      <span className="text-sm font-normal text-slate-700 flex items-center gap-3"><FaLaptop className="text-slate-700" /> {asset.name}</span>
                      <span className="text-xs font-mono text-slate-700">{asset.serialNo}</span>
                    </div>
                  )) : <p className="text-sm text-slate-700 italic">No assets assigned.</p>}
                </div>
              </section>

              <section>
                <h3 className="text-[11px] font-bold text-slate-700 uppercase border-b border-slate-100 pt-4 pb-3 mb-2 flex items-center gap-2">
                  <FaHeart className="text-rose-400" /> Happiness Survey
                </h3>
                <div className="space-y-4">
                  {employee?.happinessMessages?.map((msg: any) => (
                    <div key={msg.id} className="p-5 bg-white border border-slate-100 rounded-xl shadow-sm border-l-4 border-teal-500">
                      <p className="text-[10px] font-bold text-slate-700 uppercase mb-2">{msg.title}</p>
                      <p className="text-sm text-slate-700 leading-relaxed font-normal italic">"{msg.message}"</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {isEditing && (
            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-center gap-6">
              <button 
                type="submit" 
                className="flex items-center gap-2 px-5 py-3 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <FaSave /> Save Changes
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="flex items-center gap-2 px-5 py-3 bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all cursor-pointer"
              >
                Discard
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, value, icon: Icon, isEditing, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
        <Icon className="text-slate-700" size={12} /> {label}
      </label>
      {isEditing ? (
        <input 
          type={type} 
          name={name} 
          value={value} // This keeps the default value visible in input
          onChange={onChange} 
          className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm font-normal focus:border-slate-400 outline-none transition-all"
        />
      ) : (
        <p className="py-1 text-sm text-slate-800 font-normal">
          {value || "—"}
        </p>
      )}
    </div>
  );
}