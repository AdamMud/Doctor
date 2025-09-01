// app/patient/layout.jsx
import { Inter } from "next/font/google";
import "../globals.css";
import { Cart1 } from "@/widgets/component";
import logo1 from "../../images/Group 188.png";
import logo2 from "../../images/Group 177.png";
import logo3 from "../../images/Group 178.png";
// import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import Badge from '@mui/material/Badge';
// import MailIcon from '@mui/icons-material/Mail';

import ChatModal from "@/widgets/aimodal";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export default function PatientLayout({ children }) {
    return (
        <html lang="ru">
            <body className={`${inter.className} bg-gray-50`}>
                {/* Header */}
                <header className="lg:w-[90%] m-auto flex flex-col lg:flex-row justify-between items-center lg:p-[20px] gap-4">
                    <h1 className="text-[40px] font-mono font-bold">HISSOR <span className="text-[#159EEC] ">CLINIK</span></h1>

                    <aside className="hidden  lg:flex gap-[20px]">
                        <Cart1 img={logo1} name="Emergency" des="(237) 681-812-255" alt="Emergency Icon" />
                        <Cart1 img={logo2} name="Work Hour" des="09:00 - 20:00 Everyday" alt="Work Hour Icon" />
                        <Cart1 img={logo3} name="Location" des="Hissor City" alt="Location Icon" />
                    <div className="flex justify-end p-4">
                        <Link href="/login">
                            <button className="border-gradient-to-r from-green-500 to-green-700 text-green-600 font-semibold px-6 py-2 rounded-2xl shadow-md hover:scale-105 hover:shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 ease-in-out active:scale-95">
                                Exit
                            </button>
                        </Link>
                    </div>
                    </aside>

                </header>

                {/* Навигация для пациента */}

                <section className=" text-white bg-gradient-to-r  px-[20px] py-[10px] from-blue-600 via-blue-800 to-indigo-900 m-auto mt-4 flex gap-6 border-b pb-2 text-lg font-medium">
                    <div className="lg:w-[90%] m-auto flex gap-[20px]">
                        <Link href="/patient" className="hover:text-[#159EEC]">Главная</Link>
                        <Link href="/patient/doctors" className="hover:text-[#159EEC]">Врачи</Link>
                        <Link href="/patient/info" className="hover:text-[#159EEC]">Инфо</Link>
                        <Link href='/patient/about'>About</Link>

                    </div>


                </section>

                {/* Контент */}
                <main className=""> {children}

                    <div className=" ml-[80%] fixed top-[600px] lg:top-[700px] lg:ml-[90%]">
                        <Badge color="secondary" badgeContent={"?"}><ChatModal /></Badge>
                    </div>

                </main>



                {/* Footer */}
                <footer className="bg-gradient-to-r  from-blue-700 via-blue-800 to-indigo-900 text-gray-200 mt-10 shadow-lg">
                    <div className="lg:w-[90%] m-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-6">

                        {/* Лого и описание */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4">HISSOR CLINIK</h2>
                            <p className="text-sm leading-6 text-gray-100">
                                Мы заботимся о вашем здоровье каждый день. Качественная медицинская помощь доступна для всех.
                            </p>
                        </div>

                        {/* Навигация */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Навигация</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link href="/patient" className="hover:text-yellow-300 transition">🏠 Главная</Link></li>
                                <li><Link href="/patient/doctors" className="hover:text-yellow-300 transition">👨‍⚕️ Врачи</Link></li>
                                <li><Link href="/patient/appointments" className="hover:text-yellow-300 transition">📅 Запись</Link></li>
                                <li><Link href="/contact" className="hover:text-yellow-300 transition">📩 Контакты</Link></li>
                            </ul>
                        </div>

                        {/* Контакты и соцсети */}
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Контакты</h3>
                            <ul className="space-y-2 text-sm">
                                <li>📍 Hissor City</li>
                                <li>📞 (237) 681-812-255</li>
                                <li>✉️ info@hissorclinic.com</li>
                            </ul>

                            {/* Соцсети */}
                            <div className="flex gap-4 mt-4 text-white text-xl">
                                <a href="#" className="hover:text-yellow-300 transition" aria-label="Website"><FaGlobe /></a>
                                <a href="#" className="hover:text-blue-400 transition" aria-label="Facebook"><FaFacebookF /></a>
                                <a href="#" className="hover:text-sky-400 transition" aria-label="Twitter"><FaTwitter /></a>
                                <a href="#" className="hover:text-pink-400 transition" aria-label="Instagram"><FaInstagram /></a>
                            </div>
                        </div>
                    </div>

                    {/* Нижняя часть */}
                    <div className="border-t border-blue-600 text-center py-4 text-sm text-gray-100">
                        © {new Date().getFullYear()} HISSOR CLINIK. Все права защищены.
                    </div>
                </footer>
            </body>
        </html>
    );
}
