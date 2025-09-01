'use client'

export default function Patients() {
  return (
    <>
      {/* Хедер с фоном */}
   <section className="bg-hero flex flex-col justify-center items-center text-center px-6">
  <h1 className="text-white font-bold text-4xl lg:text-6xl drop-shadow-lg">
    Забота о жизни
  </h1>
  <p className="text-white mt-4 text-lg lg:text-2xl drop-shadow-md">
    Лидерство в медицинском совершенстве
  </p>
</section>


      {/* Секция с описанием */}
      <section className="bg-white py-16 px-6 mt-16 rounded-2xl w-[90%] m-auto shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Почему пациенты выбирают нас
        </h2>
        <p className="text-gray-700 max-w-3xl m-auto text-center">
          Мы предоставляем профессиональную медицинскую помощь, современное оборудование
          и индивидуальный подход к каждому пациенту. Здесь здоровье и забота — на первом месте.
        </p>
      </section>

      {/* Статистика */}
      <section className="w-[90%] m-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-blue-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-3xl font-bold text-blue-800">100+</h3>
          <p className="text-gray-700 mt-2">Довольных пациентов</p>
        </div>
        <div className="bg-blue-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-3xl font-bold text-blue-800">24/7</h3>
          <p className="text-gray-700 mt-2">Поддержка и консультации</p>
        </div>
        <div className="bg-blue-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-3xl font-bold text-blue-800">50+</h3>
          <p className="text-gray-700 mt-2">Опытных врачей</p>
        </div>
      </section>

      {/* Дополнительная секция */}
      <section className="bg-white py-16 px-6 mt-16 rounded-2xl w-[90%] m-auto shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Мы заботимся о вашем здоровье
        </h2>
        <p className="text-gray-700 max-w-3xl m-auto">
          Наши специалисты всегда готовы помочь и дать рекомендации по профилактике
          и лечению любых заболеваний. Ваша жизнь — наша главная ценность.
        </p>
      </section>
    </>
  );
}
