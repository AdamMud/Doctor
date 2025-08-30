'use client'

import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [data, setData] = useState({
    patients: [],
    doctors: [],
    appointments: [],
    users: [],
    chat: [],
  });

  const admin = {
    name: "Admin User",
    email: "admin@mail.com",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes, appointmentsRes, usersRes, chatRes] = await Promise.all([
          axios.get('http://localhost:3002/patients'),
          axios.get('http://localhost:3002/doctors'),
          axios.get('http://localhost:3002/appointments'),
          axios.get('http://localhost:3002/users'),
          axios.get('http://localhost:3002/chat'),
        ]);

        setData({
          patients: patientsRes.data,
          doctors: doctorsRes.data,
          appointments: appointmentsRes.data,
          users: usersRes.data,
          chat: chatRes.data,
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 p-6">
      {/* Хедер с именем администратора */}
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Админ Панель</h1>
          <p className="text-gray-500 mt-1">Обзор показателей и данных</p>
        </div>
        <div className="mt-4 md:mt-0 text-gray-700">
          Привет, <span className="font-semibold">{admin.name}</span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Карточка с графиком */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">График продаж</h2>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
            series={[
              { data: [2, 5.5, 2, 8.5, 1.5, 5] },
              { data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5] },
              { data: [7, 8, 5, 4, null, null, 2, 5.5, 1] },
            ]}
            height={250}
            margin={{ bottom: 20 }}
          />
        </div>

        {/* Карточка с пациентами */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Пациенты</h2>
          <p className="text-gray-500">
            Всего зарегистрированных: <span className="font-bold text-gray-800">{data.patients.length}</span>
          </p>
        </div>

        {/* Карточка с врачами */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Врачи</h2>
          <p className="text-gray-500">
            Всего врачей: <span className="font-bold text-gray-800">{data.doctors.length}</span>
          </p>
        </div>

        {/* Карточка с пользователями */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Пользователи</h2>
          <p className="text-gray-500">
            Всего пользователей: <span className="font-bold text-gray-800">{data.users.length}</span>
          </p>
        </div>

        {/* Карточка с назначениями */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Назначения</h2>
          <p className="text-gray-500">
            Всего назначений: <span className="font-bold text-gray-800">{data.appointments.length}</span>
          </p>
        </div>

        {/* Карточка с чатом */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Чат сообщений</h2>
          <p className="text-gray-500">
            Всего сообщений: <span className="font-bold text-gray-800">{data.chat.length}</span>
          </p>
        </div>
      </main>
    </section>
  );
}
