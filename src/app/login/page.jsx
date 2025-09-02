// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// import doctorImg from '@/images/image3.jpg'
// import { useAddUserMutation, useGetUsersQuery } from "@/store/pages/auth/logIn/login";

// export default function PatientAuthPage() {
//   const router = useRouter();
//   const [isRegister, setIsRegister] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { data: users } = useGetUsersQuery();
//   const [addUser, { isLoading: isRegistering }] = useAddUserMutation();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!users) return;

//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (!user) {
//       setError("Неверный email или пароль");
//       return;
//     }

//     if (user.role === "patient") router.push("/patient/");
//     if (user.role === "doctor") router.push("/doctors/");
//     if (user.role === "admin") router.push("/admin/");
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !phone || !password) {
//       setError("Заполните все поля");
//       return;
//     }

//     try {
//       await addUser({
//         name,
//         email,
//         phone,
//         password,
//         role: "patient",
//         token: `patient-token-${Date.now()}`,
//       }).unwrap();

//       router.push("/patient/doctors");
//     } catch (err) {
//       console.error(err);
//       setError("Ошибка при регистрации");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full h-[800px]">
     
//         <div className="md:w-1/2">
//           <Image
//             src={doctorImg}
//             alt="Doctor"
//             className="object-cover w-full h-full"
//             width={500}
//             height={500}
//           />
//         </div>

//         <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
//           <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
//             {isRegister ? "Регистрация" : "Вход"}
//           </h1>

//           {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

//           <form
//             onSubmit={isRegister ? handleRegister : handleLogin}
//             className="space-y-5"
//           >
//             {isRegister && (
//               <>
//                 <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required/>
//                 <input type="text" placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required/>
//               </>
//             )}

//             <input  type="email"  placeholder="Email"  value={email}  onChange={(e) => setEmail(e.target.value)}  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"  required/>
//             <input
//               type="password"
//               placeholder="Пароль"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               required
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//               disabled={isRegister && isRegistering}
//             >
//               {isRegister
//                 ? isRegistering
//                   ? "Регистрация..."
//                   : "Зарегистрироваться"
//                 : "Войти"}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-gray-500">
//             {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
//             <button
//               className="text-blue-600 hover:underline"
//               onClick={() => {
//                 setError("");
//                 setIsRegister(!isRegister);
//               }}
//             >
//               {isRegister ? "Войти" : "Зарегистрироваться"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import doctorImg from "@/images/image3.jpg";
import { useAddUserMutation, useGetUsersQuery } from "@/store/pages/auth/logIn/login";

export default function PatientAuthPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: users } = useGetUsersQuery();
  const [addUser, { isLoading: isRegistering }] = useAddUserMutation();

  // --- Проверка токена при открытии страницы ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "patient") router.push("/patient/");
      if (role === "doctor") router.push("/doctors/");
      if (role === "admin") router.push("/admin/");
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!users) return;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Неверный email или пароль");
      return;
    }

    // --- Сохраняем токен и роль в localStorage ---
    localStorage.setItem("token", user.token);
    localStorage.setItem("role", user.role);

    if (user.role === "patient") router.push("/patient/");
    if (user.role === "doctor") router.push("/doctors/");
    if (user.role === "admin") router.push("/admin/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      setError("Заполните все поля");
      return;
    }

    try {
      const newUser = {
        name,
        email,
        phone,
        password,
        role: "patient",
        token: `patient-token-${Date.now()}`,
      };

      await addUser(newUser).unwrap();

      // Сохраняем токен и роль в localStorage
      localStorage.setItem("token", newUser.token);
      localStorage.setItem("role", newUser.role);

      router.push("/patient/doctors");
    } catch (err) {
      console.error(err);
      setError("Ошибка при регистрации");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full h-[800px]">
        {/* Левая часть: изображение */}
        <div className="md:w-1/2">
          <Image
            src={doctorImg}
            alt="Doctor"
            className="object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>

        {/* Правая часть: форма */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-white">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            {isRegister ? "Регистрация" : "Вход"}
          </h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form
            onSubmit={isRegister ? handleRegister : handleLogin}
            className="space-y-5"
          >
            {isRegister && (
              <>
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
                <input
                  type="text"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              disabled={isRegister && isRegistering}
            >
              {isRegister
                ? isRegistering
                  ? "Регистрация..."
                  : "Зарегистрироваться"
                : "Войти"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => {
                setError("");
                setIsRegister(!isRegister);
              }}
            >
              {isRegister ? "Войти" : "Зарегистрироваться"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
