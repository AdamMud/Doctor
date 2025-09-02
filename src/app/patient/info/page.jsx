'use client';

// import { useGetUserByTokenQuery } from "@/store/pages/info/info";
import { useGetUserByTokenQuery } from "@/store/pages/auth/logIn/login";
import { Loader2 } from "lucide-react";

export default function Info() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data, isLoading, error } = useGetUserByTokenQuery(token, { skip: !token });

  if (!token) return (
    <p className="p-6 text-center text-gray-500 text-lg">Вы не авторизованы</p>
  );

  if (isLoading) return (
    <div className="p-6 flex justify-center">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  if (error) return (
    <p className="p-6 text-center text-red-600 text-lg">Ошибка при загрузке данных</p>
  );

  const user = data?.[0]; 

  if (!user) return (
    <p className="p-6 text-center text-gray-500 text-lg">Пользователь не найден</p>
  );

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-xl p-6 bg-gradient-to-r from-blue-50 to-white">
       
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
            {user?.name?.[0] || "?"}
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-800">{user?.name || "Без имени"}</h2>
          <p className="text-blue-600 font-semibold mt-1">{user?.role || "Роль не указана"}</p>
        </div>

        {/* Контакты */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Телефон:</strong> {user?.phone || "Не указан"}</p>
          <p><strong>ID:</strong> {user?.id}</p>
        </div>

        {/* Кнопка выхода */}
        <div className="mt-6 flex justify-center">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg" onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}> Выйти</button>
        </div>
      </div>
    </div>
  );
}
