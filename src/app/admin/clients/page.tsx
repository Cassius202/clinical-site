"use client";

import { useEffect, useState, useCallback } from "react";
import { getClients } from "@/app/actions/client"; 
import { 
  Search, Mail, Phone, Loader2, RefreshCw, 
  FileText, ClipboardList, X // New icons for notes and modal
} from "lucide-react";
import toast from "react-hot-toast";

interface Client {
  id: number;
  first_name: string;
  email: string;
  phone_number: string;
  service_type: string; // Added
  notes: string;        // Added
  created_at: string;
}

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // MODAL STATE
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getClients();
      if (result.success) {
        setClients((result.data as unknown as Client[]) || []);
      } else {
        toast.error(result.error || "Failed to load clients");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filteredClients = clients.filter(
    (client) =>
      client.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.service_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative">
      {/* ── NOTES MODAL ── */}
      {selectedNote !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-sky-50">
              <div className="flex items-center gap-2 text-sky-700">
                <ClipboardList size={20} />
                <h3 className="font-bold">Doctor's Clinical Notes</h3>
              </div>
              <button onClick={() => setSelectedNote(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 text-gray-700 leading-relaxed italic">
              {selectedNote || "No specific clinical notes for this client."}
            </div>
            <div className="p-4 bg-gray-50 text-right">
              <button 
                onClick={() => setSelectedNote(null)}
                className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Completed Clients</h1>
          <p className="text-gray-500 text-sm">Review clinical history and follow-up status.</p>
        </div>

        <div className="flex items-center gap-2">
           <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
                type="text"
                placeholder="Search name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-sky-600 w-full md:w-64 text-sm text-gray-800"
            />
           </div>
           <button onClick={fetchClients} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
             <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
           </button>
        </div>
      </div>

      {/* CLIENT TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-sky-600" size={32} />
            <p className="text-gray-500 font-medium">Loading records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Service Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{client.first_name}</td>
                    <td className="px-6 py-4">
                      <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {client.service_type || "General Checkup"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-col">
                        <span className="flex items-center gap-1"><Mail size={12}/> {client.email}</span>
                        <span className="flex items-center gap-1 text-gray-400"><Phone size={12}/> {client.phone_number}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {/* NOTE ICON TRIGGER */}
                      <button 
                        onClick={() => setSelectedNote(client.notes)}
                        className={`p-2 rounded-full transition-all ${client.notes ? 'text-amber-500 hover:bg-amber-50' : 'text-gray-300 pointer-events-none'}`}
                        title={client.notes ? "View clinical notes" : "No notes"}
                      >
                        <FileText size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientList;