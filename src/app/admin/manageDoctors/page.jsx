'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получаем пользователей с role doctor
        const usersRes = await axios.get('http://localhost:3002/users');
        const doctorsData = usersRes.data.filter(user => user.role === 'doctor');

        const patientsRes = await axios.get('http://localhost:3002/patients');

        setDoctors(doctorsData);
        setPatients(patientsRes.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const getPatientCount = (doctor) => {
    // Можно посчитать количество пациентов по patients массиву
    return patients.filter(p => p.medicalRecord?.some(r => r.doctor === doctor.name)).length;
  };

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Управление Врачами</h1>
      <Link href={'/admin/addDoctor'} className="inline-block mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Добавить доктора
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700">{doctor.name}</h2>
            <p className="text-gray-500 mt-1">Специализация: <span className="font-medium">{doctor.specialization || 'Не указана'}</span></p>
            <p className="text-gray-500 mt-1">Email: <span className="font-medium">{doctor.email}</span></p>
            <p className="text-gray-500 mt-1">Телефон: <span className="font-medium">{doctor.phone || 'Не указан'}</span></p>
            <p className="text-gray-500 mt-2">Пациентов: <span className="font-bold text-gray-800">{getPatientCount(doctor)}</span></p>
          </div>
        ))}
      </div>
    </section>
  );
}
