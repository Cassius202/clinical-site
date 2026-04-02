'use client'

import { ReactNode } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  
  LogOut, 
  Star,
  Mail,
  Target,
  UserPlus,
  ClipboardCheck
} from "lucide-react";
import { handleLogout } from "../actions/auth"; // Your logout action

const navItems = [
  { 
    name: "Overview", 
    href: "/admin/dashboard", 
    icon: LayoutDashboard 
  },
  { 
    name: "Subscribers", 
    href: "/admin/newsletter-subscribers", 
    icon: Mail // Mail icon for newsletter context
  },
  { 
    name: "Leads", 
    href: "/admin/Leads", 
    icon: Target // Target icon for potential sales/leads
  },
  { 
    name: "Add Client", 
    href: "/admin/add-user", 
    icon: UserPlus // Action-oriented icon for adding someone
  },
  { 
    name: "Clients", 
    href: "/admin/clients", 
    icon: ClipboardCheck // ClipboardCheck hints at the clinical/completed nature
  },
];
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b border-gray-100">
          <div className="bg-sky-600 p-1.5 rounded-lg text-white">
            <Star size={20} fill="currentColor" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800">Manage Leads</span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-all font-medium group"
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-gray-100">
          <form action={handleLogout}>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium group">
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* MOBILE HEADER (Visible only on small screens) */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <span className="text-lg font-bold text-sky-600">ReviewFlow</span>
          <form action={handleLogout}>
             <button className="text-gray-500"><LogOut size={20}/></button>
          </form>
        </header>

        {/* DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}