'use client';
import { useParams } from "next/navigation";
import { useGetDoctorsQuery } from "@/store/pages/patient/doctors/doctors";

export default function InfoDoctor() {
  const { id } = useParams();
  const { data } = useGetDoctorsQuery();

  const doctor = data?.find((doc) => doc.id.toString() === id);

  if (!doctor) return <p className="text-center mt-10 text-xl text-gray-500">Доктор не найден...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-center text-[#159EEC] mb-6">Информация о докторе</h1>
      <p className="text-lg"><strong>Имя:</strong> {doctor.name}</p>
      <p className="text-lg"><strong>Специализация:</strong> {doctor.specialization}</p>
      <p className="text-lg"><strong>Email:</strong> {doctor.email}</p>
      <p className="text-lg"><strong>Телефон:</strong> {doctor.phone}</p>
      <button className="mt-6 w-full bg-[#159EEC] text-white py-2 px-4 rounded-xl hover:bg-blue-600 transition">
        Подтвердить запись
      </button>
    </div>
  );
}
