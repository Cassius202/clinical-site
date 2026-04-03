import { getOfferLeads } from "@/app/actions/client";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Users 
} from "lucide-react";

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 0;
  const ITEMS_PER_PAGE = 50;

  const { data, hasMore, total, success } = await getOfferLeads(currentPage, ITEMS_PER_PAGE);

  if (!success) {
    return <div className="p-10 text-red-500 font-bold">Error loading leads.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-2 md:p-4">
      <div className="max-w-[1600px] mx-auto space-y-3">
        
        {/* ULTRA-COMPACT HEADER */}
        <div className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" size={18} />
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">Offer Leads</h1>
            <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-black border border-indigo-100 uppercase">
              {total} Total
            </span>
          </div>
        </div>

        {/* SPREADSHEET TABLE */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-[20%] px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="w-[35%] px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</th>
                  <th className="w-[20%] px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone</th>
                  <th className="w-[25%] px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date Captured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {data.map((lead: { id: string | number; name: string; email: string; phone?: string; created_at: string }) => (
                  <tr key={lead.id} className="hover:bg-indigo-50/30 transition-colors group">
                    {/* NAME */}
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-slate-300" />
                        <span className="text-sm text-slate-900 truncate">{lead.name}</span>
                      </div>
                    </td>

                    {/* EMAIL - SEPARATE COLUMN */}
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Mail size={12} className="text-slate-300" />
                        <a href={`mailto:${lead.email}`} className="truncate hover:text-indigo-600 hover:underline">
                          {lead.email}
                        </a>
                      </div>
                    </td>

                    {/* PHONE - SEPARATE COLUMN */}
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-xs text-slate-600 tabular-nums">
                        <Phone size={12} className="text-slate-300" />
                        <span>{lead.phone}</span>
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-1.5 text-[11px] text-slate-400 whitespace-nowrap">
                      <div className="flex items-center gap-2 uppercase font-bold tracking-tighter">
                        <Calendar size={12} className="opacity-50" />
                        {new Date(lead.created_at).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* COMPACT PAGINATION */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Page {currentPage + 1}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`?page=${Math.max(currentPage - 1, 0)}`}
                className={`p-1 rounded border bg-white shadow-sm transition-all ${
                  currentPage === 0 ? "opacity-30 pointer-events-none" : "hover:bg-slate-50 active:scale-95"
                }`}
              >
                <ChevronLeft size={14} />
              </a>

              <a
                href={`?page=${currentPage + 1}`}
                className={`p-1 rounded border bg-white shadow-sm transition-all ${
                  !hasMore ? "opacity-30 pointer-events-none" : "hover:bg-slate-50 active:scale-95"
                }`}
              >
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}