// app/doctor/layout.jsx
import React from 'react';
import Link from 'next/link';

export default function DoctorLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <header className="bg-green-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Панель Врача</h1>
            <nav className="flex gap-4">
              <Link href="/doctor">Главная</Link>
              <Link href="/doctor/patients">Мои пациенты</Link>
            </nav>
          </div>
        </header>

             {/* Navbar */}
                <nav className="bg-[#159EEC] p-[20px]">
                  <div className="flex flex-wrap text-white gap-[20px] lg:px-[70px]">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="/myPatient" className="hover:underline">MyPatient</Link>
                    <Link href="/patientCard" className="hover:underline">Login</Link>
                  </div>
                </nav>

      

        <main className="container mx-auto mt-6">{children}</main>

        <footer className="bg-gray-800 text-white p-4 mt-10 text-center">
          © 2025 Клиника. Врач.
        </footer>
      </body>
    </html>
  );
}
