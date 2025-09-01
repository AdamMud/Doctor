// app/doctor/layout.jsx
import React from "react";
import Link from "next/link";

export default function DoctorLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold tracking-wide">Панель Врача</h1>
          <nav className="flex gap-6 text-sm font-medium">
            <Link href="/doctor" className="hover:text-yellow-300 transition"> Главная </Link>
            <Link href="/doctor/myPatient" className="hover:text-yellow-300 transition" > Мои пациенты </Link>
            <Link href="/doctor/patientCard" className="hover:text-yellow-300 transition" > Карточка пациента</Link>
          </nav>

        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-8 flex-grow px-6">{children}</main>

      {/* Footer */}
      <footer className="bg-green-700 text-gray-200 mt-12">
        <div className="container mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} HISSOR CLINIK — Панель Врача
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/doctor" className="hover:text-white transition-colors duration-200" > Главная</Link>
            <Link href="/doctor/myPatients" className="hover:text-white transition-colors duration-200"  > Мои пациенты  </Link>
            <Link href="/doctor/patientCard" className="hover:text-white transition-colors duration-200" >   Карточка пациента   </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
