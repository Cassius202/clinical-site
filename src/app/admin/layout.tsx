'use client'

import { ReactNode, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  
  LogOut, 
  Star,
  Mail,
  Target,
  UserPlus,
  ClipboardCheck,
  Menu,
  X
} from "lucide-react";
import { handleLogout } from "../actions/auth";

const navItems = [
  { name: "Overview", href: "/admin/", icon: LayoutDashboard },
  { name: "Subscribers", href: "/admin/newsletter-subscribers", icon: Mail },
  { name: "Leads", href: "/admin/leads", icon: Target },
  { name: "Add Client", href: "/admin/add-user", icon: UserPlus },
  { name: "Clients", href: "/admin/clients", icon: ClipboardCheck },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      
     {/* --- THINNER DESKTOP SIDEBAR (w-14 → w-16) --- */}
      <aside className="w-16 bg-white border-r border-gray-200 flex flex-col md:w-56 md:flex md:flex-col hidden md:flex">
        {/* LOGO/BRAND - Compact on desktop too */}
        <div className="p-4 border-b border-gray-100 flex md:flex-col md:items-center md:gap-2">
          <div className="bg-sky-600 p-2 rounded-lg text-white shrink-0">
            <Star size={20} fill="currentColor" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-800 hidden md:block">
            Manage Leads
          </span>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-2 md:p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-all font-medium group w-full"
            >
              <item.icon 
                size={20} 
                className="shrink-0 group-hover:scale-110 transition-transform" 
              />
              <span className="hidden md:block whitespace-nowrap">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* LOGOUT - Compact */}
        <div className="p-2 md:p-4 border-t border-gray-100">
          <form action={handleLogout}>
            <button className="flex items-center gap-3 w-full px-3 py-2.5 md:px-4 md:py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium group">
              <LogOut size={20} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              <span className="hidden md:block">Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* --- MOBILE MENU (Full screen drawer) --- */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform md:hidden transition-transform ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-sky-600 p-1.5 rounded-lg text-white">
              <Star size={20} fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-gray-800">Manage Leads</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-all font-medium group"
            >
              <item.icon size={20} className="group-hover:scale-110 transition-transform" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <form action={handleLogout}>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium group">
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              Logout
            </button>
          </form>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* MOBILE HEADER */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1 text-gray-500 hover:text-gray-700 md:hidden"
          >
            <Menu size={24} />
          </button>
          <span className="text-xl font-bold text-sky-600 flex-1 text-center">
          </span>
          <form action={handleLogout} className="shrink-0">
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <LogOut size={20} />
            </button>
          </form>
        </header>

        {/* DESKTOP HEADER */}
        <header className="hidden md:flex bg-white border-b border-gray-200 px-6 py-4 items-center justify-between sticky top-0 z-30">
          <div />
          <form action={handleLogout}>
            <button className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-all font-medium">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </form>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}