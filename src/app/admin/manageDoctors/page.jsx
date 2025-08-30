'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Manage() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, patientsRes] = await Promise.all([
          axios.get('http://localhost:3002/doctors'),
          axios.get('http://localhost:3002/patients')
        ]);

        setDoctors(doctorsRes.data);
        setPatients(patientsRes.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  const getPatientCount = (doctor) => {
    if (!doctor.patients) return 0;
    return doctor.patients.length;
  };

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Управление Врачами</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700">{doctor.name}</h2>
            <p className="text-gray-500 mt-1">Специализация: <span className="font-medium">{doctor.specialization}</span></p>
            <p className="text-gray-500 mt-1">Email: <span className="font-medium">{doctor.email}</span></p>
            <p className="text-gray-500 mt-1">Телефон: <span className="font-medium">{doctor.phone}</span></p>
            <p className="text-gray-500 mt-2">Пациентов: <span className="font-bold text-gray-800">{getPatientCount(doctor)}</span></p>
          </div>
        ))}
      </div>
    </section>
  );
}
