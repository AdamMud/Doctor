"use client";

import { useGetPatientsQuery } from "@/store/pages/auth/logIn/login";
// import { useGetPatientsQuery } from "@/store/apiSlice";
import { useRouter } from "next/navigation";

export default function MyPatient() {
  const router = useRouter();
  const doctorId = localStorage.getItem("userId");
  const { data: patients, isLoading, error } = useGetPatientsQuery(doctorId);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке пациентов</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Мои пациенты</h2>
      <div className="grid gap-4">
        {patients.map((p) => (
          <div key={p.id} className="p-4 border rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p>{p.email}</p>
              <p>{p.phone}</p>
            </div>
            <button onClick={() => router.push(`/doctor/patientCard/${p.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >   Открыть </button>
          </div>
        ))}
      </div>
    </div>
  );
}
