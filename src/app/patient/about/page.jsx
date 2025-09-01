export default function About() {
  return (
    <section className="min-h-screen bg-gray-50 p-12 flex flex-col items-center">
      {/* Огромный заголовок */}
      <header className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-extrabold text-blue-600 mb-6 leading-tight">
          Добро пожаловать в нашу клинику!
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
          Здесь вы можете записаться к врачу, следить за своими назначениями и получать рекомендации онлайн — всё в одном месте.
        </p>
      </header>

      {/* Большие карточки услуг */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
        <div className="bg-white shadow-xl rounded-3xl p-10 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Онлайн записи</h2>
          <p className="text-gray-600 text-lg">
            Легко записывайтесь на приём к нужному врачу без очередей и звонков.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-3xl p-10 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">История здоровья</h2>
          <p className="text-gray-600 text-lg">
            Следите за своими диагнозами и рекомендациями врачей в одном удобном месте.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-3xl p-10 flex flex-col items-center text-center hover:scale-105 transition-transform">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Чат с врачом</h2>
          <p className="text-gray-600 text-lg">
            Получайте быстрые ответы на вопросы и консультации онлайн.
          </p>
        </div>
      </div>


    </section>
  );
}
