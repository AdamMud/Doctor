"use client";
// import { useParams } from "next/navigation";
// import { useGetDoctorsQuery } from "@/store/pages/patient/doctors/doctors";
// import { MessageCircle } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// export default function InfoDoctor() {
//   const { id } = useParams();
//   const { data, isLoading } = useGetDoctorsQuery();
//   const [reviews, setReviews] = useState([
//     { id: 1, author: "Алексей", text: "Отличный врач, помог разобраться с проблемой!" },
//   ]);
//   const [newReview, setNewReview] = useState("");

//   if (isLoading)
//     return <p className="text-center mt-10 text-xl text-gray-500">Загрузка...</p>;

//   const doctor = data?.find((doc) => String(doc.id) === String(id));

//   if (!doctor)
//     return <p className="text-center mt-10 text-xl text-gray-500">Доктор не найден...</p>;

//   const handleAddReview = () => {
//     if (!newReview.trim()) return;
//     setReviews([...reviews, { id: Date.now(), author: "Пациент", text: newReview }]);
//     setNewReview("");
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
//       <h1 className="text-3xl font-bold text-center text-[#159EEC] mb-6">
//         Информация о докторе
//       </h1>

//       {/* Фото доктора */}
//       <div className="flex justify-center mb-6">
//         <Image
//           src={doctor.img}
//           alt={`Фото доктора ${doctor.name}`}
//           width={128}
//           height={128}
//           className="w-32 h-32 rounded-full object-cover border-4 border-[#159EEC]"
//           priority
//         />
//       </div>

//       {/* Информация */}
//       <p className="text-lg"><strong>Имя:</strong> {doctor.name}</p>
//       <p className="text-lg"><strong>Специализация:</strong> {doctor.specialization}</p>
//       <p className="text-lg"><strong>Email:</strong> {doctor.email}</p>
//       <p className="text-lg"><strong>Телефон:</strong> {doctor.phone}</p>

//       {/* Описание */}
//       <div className="mt-4 bg-gray-100 p-4 rounded-xl">
//         <h2 className="text-xl font-semibold mb-2">О докторе</h2>
//         <p className="text-gray-700">
//           {doctor.description ||
//             "Опытный и внимательный врач, который всегда находит индивидуальный подход к каждому пациенту."}
//         </p>
//       </div>

//       {/* Кнопка для записи */}
//       <button className="mt-6 w-full bg-[#159EEC] text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition">
//         Подтвердить запись
//       </button>

//       {/* Кнопка для чата */}
//       <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition">
//         <MessageCircle size={20} /> Связаться с врачом
//       </button>

//       {/* Отзывы */}
//       <div className="mt-8">
//         <h2 className="text-xl font-semibold mb-3">Отзывы пациентов</h2>
//         <div className="space-y-3 mb-4">
//           {reviews.map((review) => (
//             <div key={review.id} className="bg-gray-100 p-3 rounded-xl">
//               <p className="text-sm text-gray-500">{review.author}</p>
//               <p className="text-gray-800">{review.text}</p>
//             </div>
//           ))}
//         </div>

//         {/* Форма для нового отзыва */}
//         <textarea
//           className="w-full border rounded-xl p-2 mb-2"
//           rows="3"
//           placeholder="Оставьте свой отзыв..."
//           value={newReview}
//           onChange={(e) => setNewReview(e.target.value)}
//         />
//         <button
//           onClick={handleAddReview}
//           className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
//         >
//           Добавить отзыв
//         </button>
//       </div>
//     </div>
//   );
// }



import { useParams } from "next/navigation";
import { useGetDoctorsQuery } from "@/store/pages/patient/doctors/doctors";
// import { useGetReviewsQuery, useAddReviewMutation } from "@/store/api/reviewsApi";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAddReviewMutation, useGetReviewsQuery } from "@/store/pages/patient/doctors/reviews/reviews";
// import { useState } from "react";

export default function InfoDoctor() {
  const { id } = useParams();
  const { data: doctorsData, isLoading: doctorsLoading } = useGetDoctorsQuery();
  const doctor = doctorsData?.find((doc) => String(doc.id) === String(id));

  const { data: reviews = [], isLoading: reviewsLoading } = useGetReviewsQuery(doctor?.id, {
    skip: !doctor,
  });

  const [newReview, setNewReview] = useState("");
  const [addReview] = useAddReviewMutation();

  if (doctorsLoading) return <p className="text-center mt-10 text-xl text-gray-500">Загрузка...</p>;
  if (!doctor) return <p className="text-center mt-10 text-xl text-gray-500">Доктор не найден...</p>;

  const handleAddReview = async () => {
    if (!newReview.trim()) return;

    try {
      await addReview({ doctorId: doctor.id, author: "Пациент", text: newReview });
      setNewReview("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-center text-[#159EEC] mb-6">Информация о докторе</h1>

      <div className="flex justify-center mb-6">
        <Image
          src={doctor.img}
          alt={`Фото доктора ${doctor.name}`}
          width={128}
          height={128}
          className="w-32 h-32 rounded-full object-cover border-4 border-[#159EEC]"
          priority
        />
      </div>

      <p className="text-lg"><strong>Имя:</strong> {doctor.name}</p>
      <p className="text-lg"><strong>Специализация:</strong> {doctor.specialization}</p>
      <p className="text-lg"><strong>Email:</strong> {doctor.email}</p>
      <p className="text-lg"><strong>Телефон:</strong> {doctor.phone}</p>

      <div className="mt-4 bg-gray-100 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">О докторе</h2>
        <p className="text-gray-700">
          {doctor.description || "Опытный и внимательный врач, который всегда находит индивидуальный подход к каждому пациенту."}
        </p>
      </div>

      <button className="mt-6 w-full bg-[#159EEC] text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition">
        Подтвердить запись
      </button>

      <button className="mt-4 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition">
        <MessageCircle size={20} /> Связаться с врачом
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Отзывы пациентов</h2>

        {reviewsLoading ? (
          <p>Загрузка отзывов...</p>
        ) : (
          <div className="space-y-3 mb-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 p-3 rounded-xl">
                <p className="text-sm text-gray-500">{review.author}</p>
                <p className="text-gray-800">{review.text}</p>
              </div>
            ))}
          </div>
        )}

        <textarea
          className="w-full border rounded-xl p-2 mb-2"
          rows={3}
          placeholder="Оставьте свой отзыв..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <button
          onClick={handleAddReview}
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Добавить отзыв
        </button>
      </div>
    </div>
  );
}
