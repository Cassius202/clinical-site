'use client';

import { useEffect, useState, useCallback, useMemo } from "react";
import { getClients } from "@/app/actions/client"; 
import {
  Search,
  Mail,
  Phone,
  Loader2,
  RefreshCw,
  FileText,
  ClipboardList,
  X,
  UserCheck,
  ChevronDown,
  UserPlus
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

interface Client {
  id: number;
  first_name: string;
  email: string;
  phone_number: string;
  service_type: string;
  notes: string;
  created_at: string;
}

const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchClients = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
      setPage(0);
    } else {
      setFetchingMore(true);
    }

    const currentPage = isInitial ? 0 : page;
    const result = await getClients(currentPage, 50);

    // ✅ FIXED: Proper error checking
    if (result.success) {
      if (isInitial) {
        setClients(result.data as Client[]);
        setPage(1);
      } else {
        setClients((prev) => [...prev, ...(result.data as Client[])]);
        setPage((prev) => prev + 1);
      }
      setHasMore(result.hasMore ?? false);
      setTotalCount(result.total ?? 0);
    } else {
      // ✅ SAFE ACCESS: Check if error exists
      const errorMessage = 'error' in result ? result.error : 'Unknown error occurred';
      toast.error(errorMessage);
    }
    
    setLoading(false);
    setFetchingMore(false);
  }, [page]);

  useEffect(() => {
    fetchClients(true);
  }, []);

  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return clients.filter(
      (c) =>
        c.first_name?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.service_type?.toLowerCase().includes(term)
    );
  }, [clients, searchTerm]);

  return (
    <div className="max-w-[1600px] mx-auto space-y-4 animate-in fade-in duration-500 p-2">
      
      {/* ── CLINICAL NOTES MODAL ── */}
      {selectedNote !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" 
          onClick={() => setSelectedNote(null)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center bg-sky-50/50 sticky top-0 z-10">
              <div className="flex items-center gap-2 text-sky-800 font-bold">
                <ClipboardList className="text-sky-600" size={18} />
                <h3>Clinical History</h3>
              </div>
              <button 
                onClick={() => setSelectedNote(null)} 
                className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-6 text-gray-700 leading-relaxed min-h-[150px]">
              <p className="whitespace-pre-wrap italic text-sm break-words">
                {`"${selectedNote}"`}
              </p>
            </div>
            <div className="p-3 bg-gray-50 flex justify-end border-t">
              <button 
                onClick={() => setSelectedNote(null)} 
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPACT HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-100 rounded-xl">
            <UserCheck className="text-sky-600" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Completed Clients</h1>
            <p className="text-sm text-gray-500">Clinical follow-ups & patient database</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search name, email, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-72 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white/50 shadow-sm transition-all text-sm placeholder-gray-400"
            />
          </div>
          <button 
            onClick={() => fetchClients(true)} 
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`${loading ? 'animate-spin' : ''} w-4 h-4`} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── DATA TABLE ── */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        {loading && clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="animate-spin text-sky-600" size={36} />
            <p className="text-lg font-semibold text-gray-700">Loading clients...</p>
            <p className="text-sm text-gray-500">Syncing with database</p>
          </div>
        ) : filteredClients.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left w-48">
                      Patient
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">
                      Service Type
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-left">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center w-16">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="hover:bg-sky-50/50 transition-colors border-b border-gray-50 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {client.first_name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 text-sm">
                              {client.first_name}
                            </div>
                            <div className="text-xs text-gray-500 font-mono">
                              #{client.id.toString().padStart(4, '0')}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 text-xs font-bold rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                          {client.service_type || 'General'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1 text-sm">
                          <a 
                            href={`mailto:${client.email}`} 
                            className="flex items-center gap-1 text-sky-600 hover:text-sky-700 font-medium"
                          >
                            <Mail size={14} />
                            {client.email}
                          </a>
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <Phone size={12} />
                            {client.phone_number}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => setSelectedNote(client.notes)}
                          disabled={!client.notes}
                          className={`p-2 rounded-lg transition-all shadow-sm border flex items-center justify-center mx-auto group/button ${
                            client.notes
                              ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 hover:shadow-md hover:scale-105 shadow-amber-100/50'
                              : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
                          }`}
                          title={client.notes ? "View clinical notes" : "No notes"}
                        >
                          <FileText 
                            size={16} 
                            className={client.notes ? "group-hover/button:rotate-12" : ""} 
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Load More Button */}
            {hasMore && (
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-100">
                <button
                  onClick={() => fetchClients(false)}
                  disabled={fetchingMore}
                  className="mx-auto flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-sky-200 text-sky-700 text-sm font-bold rounded-xl hover:border-sky-300 hover:bg-sky-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {fetchingMore ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      Loading more...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Load More Clients
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 px-6">
            <Search className="w-20 h-20 text-gray-300 mx-auto mb-6 opacity-50" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm ? `No clients match "${searchTerm}"` : "Get started by adding your first client."}
            </p>
            {searchTerm === '' && (
              <Link
                href="/admin/add-user"
                className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <UserPlus size={18} />
                Add First Client
              </Link>
            )}
          </div>
        )}
      </div>

      {/* ── FOOTER STATS ── */}
      {!loading && (
        <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm">
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {filteredClients.length}
            </div>
            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Showing
            </div>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-sky-600">
              {totalCount}
            </div>
            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Total Records
            </div>
          </div>
          <div className="w-px bg-gray-200 hidden sm:block" />
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {hasMore ? '∞' : filteredClients.length}
            </div>
            <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">
              Loaded
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientList;