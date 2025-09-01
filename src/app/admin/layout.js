'use client'

import Link from 'next/link';
import { useState } from 'react';
import { FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineSick } from "react-icons/md";
import { IoFolderOpen } from "react-icons/io5";
import { GoFileDirectoryFill } from "react-icons/go";


export default function AdminLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const admin = {
    name: 'Admin User',
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Боковая панель */}
      <aside className={`bg-white shadow-lg ${isSidebarOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
        <div className="p-6 flex flex-col h-full">
          <button
            className="mb-6 text-gray-500 hover:text-gray-800"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <IoFolderOpen />:<GoFileDirectoryFill /> }
          </button>

          <nav className="flex flex-col font-bold text-[20px] gap-4">
            <Link href="/admin" className="text-gray-700 hover:text-blue-500">
              {isSidebarOpen ? 'Дашборд' : <FaHome />}
            </Link>
            <Link href="/admin/manageDoctors" className="text-gray-700 hover:text-blue-500">
              {isSidebarOpen ? 'Доктора' : <FaUserDoctor />}
            </Link>
            <Link href="/admin/managePatients" className="text-gray-700 hover:text-blue-500">
              {isSidebarOpen ? 'Пациенты' : <MdOutlineSick />}
            </Link>
      
          </nav>

          <div className="mt-auto text-gray-500">
            {isSidebarOpen ? `Привет, ${admin.name}` : 'A'}
          </div>
        </div>
      </aside>

      {/* Основная область */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
