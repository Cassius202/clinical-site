"use client";

import { useEffect, useState, useCallback } from "react";
import { getNewsletterSubscriptions } from "@/app/actions/client"; 
import { Mail, Loader2, ChevronLeft, ChevronRight, RefreshCw, Inbox, Calendar } from "lucide-react";
import toast from "react-hot-toast";

interface Subscriber {
  id: string | number;
  email: string;
  created_at: string;
}

const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 100;

  const fetchSubscribers = useCallback(async (isInitial = false) => {
    setLoading(true);
    const targetPage = isInitial ? 0 : page;
    
    const result = await getNewsletterSubscriptions(targetPage, itemsPerPage);

    if (result.success) {
      setSubscribers(result.data as Subscriber[]);
      setHasMore(result.hasMore ?? false);
      setTotalCount(result.total ?? 0);
      if (isInitial) setPage(0);
    } else {
      toast.error("Failed to load subscribers");
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchSubscribers(true);
  }, []);

  const handleNext = () => setPage(p => p + 1);
  const handlePrev = () => setPage(p => Math.max(p - 1, 0));

  useEffect(() => {
    if (page > 0 || !loading) {
        fetchSubscribers();
    }
  }, [page]);

  return (
    <div className="max-w-[1200px] mx-auto p-2 md:p-6 space-y-4 animate-in fade-in duration-500">
      
      {/* ── COMPACT HEADER ── */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <Mail size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight">Newsletter List</h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Mailing Audience</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                <p className="text-lg font-black text-emerald-600 leading-none">{totalCount}</p>
            </div>
            <button 
                onClick={() => fetchSubscribers(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-100"
            >
                <RefreshCw size={16} className={loading ? "animate-spin" : "text-gray-400"} />
            </button>
        </div>
      </div>

      {/* ── SPREADSHEET TABLE ── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading && subscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-emerald-500 mb-2" size={32} />
            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Syncing Emails...</p>
          </div>
        ) : subscribers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Subscriber Email</th>
                  <th className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date Joined</th>
                  <th className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-20 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-emerald-50/30 transition-colors group">
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Mail size={12} className="text-gray-300" />
                        <span className="text-sm font-medium text-gray-700">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium tabular-nums">
                        <Calendar size={12} className="opacity-50" />
                        {new Date(sub.created_at).toLocaleDateString('en-GB', {
                            day: '2-digit', month: 'short', year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-1.5 text-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto opacity-40 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ── COMPACT PAGINATION ── */}
            <div className="flex flex-col items-center gap-3 py-3 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  disabled={page === 0 || loading}
                  className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm disabled:opacity-30 hover:bg-gray-50 transition-all"
                >
                  <ChevronLeft size={16} />
                </button>
                
                <span className="text-[11px] font-black text-gray-500 uppercase tracking-tighter">
                  Page {page + 1}
                </span>

                <button
                  onClick={handleNext}
                  disabled={!hasMore || loading}
                  className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm disabled:opacity-30 hover:bg-gray-50 transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                 Records {(page * itemsPerPage) + 1} - {(page * itemsPerPage) + subscribers.length}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <Inbox className="mx-auto text-gray-200 mb-2" size={48} />
            <p className="text-sm text-gray-400 font-bold uppercase">Mailing list empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterList;