// 'use client';
// import { useGetDoctorsQuery } from "@/store/pages/patient/doctors/doctors";
// import React from "react";
// import { useRouter } from "next/navigation";

// export default function Doctor() {
//   const { data, error, isLoading } = useGetDoctorsQuery();
//   const router = useRouter();

//   if (isLoading) return <p className="text-center mt-10 text-xl text-gray-500">Загрузка...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500 text-lg">Ошибка: {error.message}</p>;

//   const handleInfo = (id) => {
//     router.push(`/patient/doctors/${id}`);
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Наши врачи</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {data?.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transform transition duration-300"
//           >
//             {/* Фотография */}
//             <div className="w-full h-52 overflow-hidden">
//               <img
//                 src={doctor.img}
//                 alt={doctor.name}
//                 className="w-full  object-cover rounded-xl "
//               />

//             </div>

//             {/* Информация */}
//             <div className="p-5">
//               <h3 className="text-xl font-semibold text-[#159EEC]">{doctor.name}</h3>
//               <p className="text-gray-600 mt-1">{doctor.specialization}</p>
//               <p className="text-gray-500 mt-2">📧 {doctor.email}</p>
//               <p className="text-gray-500">📞 {doctor.phone}</p>

//               {/* Кнопка */}
//               <button
//                 onClick={() => handleInfo(doctor.id)}
//                 className="mt-5 w-full bg-gradient-to-r from-[#159EEC] to-blue-600 text-white py-2 px-4 rounded-xl hover:opacity-90 transition duration-300"
//               >
//                 Записаться
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";
// import { useGetUsersQuery } from "@/store/pages/patient/users/users";
import React from "react";
import { useRouter } from "next/navigation";
import { useGetUsersQuery } from "@/store/pages/auth/logIn/login";
import Image from "next/image";
// import { useGetUsersQuery } from "@/store/pages/patient/doctors/doctors";

export default function Doctor() {
  const { data, error, isLoading } = useGetUsersQuery();
  const router = useRouter();

  if (isLoading) return <p className="text-center mt-10 text-xl text-gray-500">Загрузка...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 text-lg">Ошибка: {error.message}</p>;

  // Фильтруем только докторов
  const doctors = data?.filter((user) => user.role === "doctor") || [];

  const handleInfo = (id) => {
    router.push(`/patient/doctors/${id}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Наши врачи</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-105 transform transition duration-300"
          >
            {/* Фото (если есть) */}
            <div className="relative w-full h-52 overflow-hidden">
              <Image
                src={doctor.img || "/doctor/Duxtur.jpeg"}
                alt={doctor.name || "Доктор"}
                fill
                className="object-cover rounded-xl"
              />
            </div>


            {/* Инфо */}
            <div className="p-5">
              <h3 className="text-xl font-semibold text-[#159EEC]">{doctor.name || "Без имени"}</h3>
              <p className="text-gray-500 mt-2">📧 {doctor.email}</p>
              <p className="text-gray-500">📞 {doctor.phone || "Нет телефона"}</p>

              {/* Кнопка */}
              <button
                onClick={() => handleInfo(doctor.id)}
                className="mt-5 w-full bg-gradient-to-r from-[#159EEC] to-blue-600 text-white py-2 px-4 rounded-xl hover:opacity-90 transition duration-300"
              >
                Записаться
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
