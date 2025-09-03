// "use client";

// import { useGetPatientsQuery } from "@/store/pages/auth/logIn/login";
// // import { useGetPatientsQuery } from "@/store/apiSlice";
// import { useRouter } from "next/navigation";

// export default function MyPatient() {
//   const router = useRouter();
//   const doctorId = localStorage.getItem("userId");
//   const { data: patients, isLoading, error } = useGetPatientsQuery(doctorId);

//   if (isLoading) return <p>Загрузка...</p>;
//   if (error) return <p>Ошибка при загрузке пациентов</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Мои пациенты</h2>
//       <div className="grid gap-4">
//         {patients.map((p) => (
//           <div key={p.id} className="p-4 border rounded shadow flex justify-between items-center">
//             <div>
//               <h3 className="font-semibold">{p.name}</h3>
//               <p>{p.email}</p>
//               <p>{p.phone}</p>
//             </div>
//             <button onClick={() => router.push(`/doctor/patientCard/${p.id}`)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >   Открыть </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spin } from "antd";
import Link from "next/link";

export default function MyPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/users?role=patient").then((res) => {
      setPatients(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Мои пациенты</h1>
      <div className="grid grid-cols-3 gap-4">
        {patients.map((p) => (
          <Card key={p.id} title={p.name || "Без имени"} className="shadow-lg">
            <p>Email: {p.email}</p>
            <p>Телефон: {p.phone || "—"}</p>
            <Link href={`/doctor/patientCard?id=${p.id}`} className="text-blue-500">
              Открыть карточку
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
