'use client'

import { useEffect, useState } from "react";
import axios from "axios";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Получаем всех пользователей
        const usersRes = await axios.get("http://localhost:3002/users");

        // Фильтруем только пациентов
        const patientUsers = usersRes.data.filter(user => user.role === "patient");

        // Сохраняем в state
        setPatients(patientUsers);
      } catch (error) {
        console.error("Ошибка при загрузке пациентов:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-600">Наши Пациенты</h1>
        <p className="text-center text-gray-500 mt-2">Список всех зарегистрированных пациентов</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                {patient.name?.[0] || "?"}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{patient.name || "Без имени"}</h2>
                <p className="text-gray-500">{patient.email}</p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-gray-600"><strong>Телефон:</strong> {patient.phone || "Не указан"}</p>
            </div>

            <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 rounded-xl hover:opacity-90 transition">
              Подробнее
            </button>
          </div>
        ))}

        {patients.length === 0 && (
          <p className="text-center text-gray-500 col-span-full">Пациенты отсутствуют</p>
        )}
      </div>
    </section>
  );
}
