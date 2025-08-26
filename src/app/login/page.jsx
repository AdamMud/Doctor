

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUsersQuery } from '@/store/pages/auth/logIn/login';
// import { useGetUsersQuery } from '../../store/apiSlice';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { data: users, isLoading, error: fetchError } = useGetUsersQuery();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!users) return;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Неверный email или пароль');
      return;
    }

    if (user.role === 'patient') router.push('/patient');
    if (user.role === 'doctor') router.push('/doctors');
    if (user.role === 'admin') router.push('/admin');
  };

  if (isLoading) return <p className="text-center mt-10">Загрузка...</p>;
  if (fetchError) return <p className="text-center mt-10 text-red-500">Ошибка сервера</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Войти
        </button>
      </form>
    </div>
  );
}
