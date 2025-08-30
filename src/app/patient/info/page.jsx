

// "use client";

// import { useGetUserByTokenQuery } from "@/store/pages/auth/logIn/login";
// import { Loader2 } from "lucide-react";

// export default function Profile() {
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const { data, isLoading, error } = useGetUserByTokenQuery(token, {
//     skip: !token,
//   });

//   if (!token) return <p className="p-6 text-center text-gray-500">Вы не авторизованы</p>;
//   if (isLoading)
//     return (
//       <div className="p-6 flex justify-center">
//         <Loader2 className="animate-spin text-blue-600" size={32} />
//       </div>
//     );
//   if (error) return <p className="p-6 text-center text-red-600">Ошибка при загрузке данных</p>;

//   const user = data?.[0];

//   return (
//     <div className="p-6 flex justify-center">
//       <div className="w-full max-w-md border border-gray-200 rounded-xl shadow-lg p-6 bg-white">
//         <div className="flex flex-col items-center mb-4">
//           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-blue-600">
//             {user?.name?.[0] || "?"}
//           </div>
//           <h2 className="mt-2 text-2xl font-bold">{user?.name || "Без имени"}</h2>
//           <p className="text-gray-500">{user?.role || "Роль не указана"}</p>
//         </div>

//         <div className="space-y-2">
//           <p><strong>Email:</strong> {user?.email}</p>
//           <p><strong>Телефон:</strong> {user?.phone || "Не указан"}</p>
//           <p><strong>ID:</strong> {user?.id}</p>
//         </div>

//         <div className="mt-6 flex justify-center">
//           <button
//             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
//             onClick={() => {
//               localStorage.removeItem("token");
//               window.location.reload();
//             }}
//           >
//             Выйти
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useGetUserByTokenQuery } from "@/store/pages/auth/logIn/login";

export default function Profile() {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMounted(true);
  }, []);

  const { data, isLoading, error } = useGetUserByTokenQuery(token, {
    skip: !token,
  });

  if (!mounted) return null; // ждём монтирования
  if (!token) return <p>Вы не авторизованы</p>;
  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке данных</p>;

  const user = data?.[0];
  return (
    <div>
      <h2>Привет, {user?.name || user?.email}</h2>
      <p>Роль: {user?.role}</p>
    </div>
  );
}
