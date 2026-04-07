"use client";

import { useState } from "react";
import { User, Mail, Phone, Stethoscope, FileText, BellOff } from "lucide-react";
import toast from "react-hot-toast";

export default function HandoverForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    toast.dismissAll();
    const tid = toast.loading("Syncing records...");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    
    // Check if the skip checkbox was checked (it will be "on" or undefined)
    const skipReview = payload.skip_review === "on";

    try {
      const res = await fetch("/api/completed-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          skip_review: skipReview // Explicitly pass as boolean
        }),
      });

      const result = await res.json();

      if (result.success) {
        const successMsg = skipReview 
          ? "Success! Client added (Review skipped)." 
          : "Success! Client added & 24hr review scheduled.";
          
        toast.success(successMsg, { id: tid });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error);
      }
    } catch (err: unknown) {
      let errorMessage = "Failed to process lead";
      if (err instanceof Error) errorMessage = err.message;
      
      console.error("offer-lead error:", errorMessage);
      toast.error(errorMessage || "Failed to sync. Check connection.", {
        id: tid,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
        {/* SECTION 1: CLIENT INPUT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-sky-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              1
            </span>
            <h2 className="font-bold text-gray-800">Client Contact</h2>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                name="name"
                placeholder="Client's Full Name"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-gray-800 transition-all"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-gray-800 transition-all"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <div className="flex items-center bg-gray-50 border border-transparent rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-500 transition-all">
                <span className="pl-10 pr-2 text-gray-500 font-medium select-none">+1</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="555 000-0000"
                  className="w-full pr-4 py-3 bg-transparent outline-none text-gray-800"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length > 10) e.target.value = value.slice(0, 10);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: SERVICE NOTES & OPTIONS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h2 className="font-bold text-gray-800">Service & Clinical Notes</h2>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Stethoscope className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                name="service_type"
                placeholder="Service (e.g. Braces Tightening)"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-800 transition-all"
              />
            </div>
            <div className="relative">
              <FileText className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <textarea
                name="notes"
                placeholder="Internal notes or follow-up details..."
                rows={4}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-800 transition-all"
              />
            </div>

            {/* NEW: SKIP REVIEW CHECKBOX */}
            <label className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl cursor-pointer group transition-colors hover:bg-orange-100">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="skip_review"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-orange-300 bg-white checked:bg-orange-500 checked:border-orange-500 transition-all focus:ring-2 focus:ring-orange-400 focus:ring-offset-1"
                />
                <BellOff className="absolute text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none" size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-orange-900 group-hover:text-orange-950 transition-colors">
                  {`Don't send review request`}
                </span>
                <span className="text-xs text-orange-700">
                  Check this if the client had a negative experience or requested no contact.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          disabled={loading}
          className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg"
        >
          {loading ? "Syncing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}