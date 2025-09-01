'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AddDoctor() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async () => {
    if (!form.name || !form.email || !form.phone || !form.password) {
      alert('Заполните все поля!');
      return;
    }

    setLoading(true);
    try {
      const newDoctor = { ...form, role: 'doctor', token: `doctor-token-${Date.now()}` };
      await axios.post('http://localhost:3002/users', newDoctor);
      router.push('/admin/manageDoctors'); // после добавления редирект на список докторов
    } catch (error) {
      console.error('Ошибка при добавлении доктора:', error);
      alert('Не удалось добавить доктора');
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Добавить нового доктора</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Имя"
            value={form.name}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
          <button
            onClick={handleAddDoctor}
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition mt-2"
          >
            {loading ? 'Добавляем...' : 'Добавить доктора'}
          </button>
        </div>
      </div>
    </section>
  );
}
