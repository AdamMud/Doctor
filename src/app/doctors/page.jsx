// import React from 'react'

// const Doctor = () => {
//   return (
//     <div>Doctor</div>
//   )
// }

// export default Doctor
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Card, Avatar, List, Statistic, Row, Col, Spin, Divider } from "antd";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";

export default function Doctor() {
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const pricePerAppointment = 50;

  useEffect(() => {
    const doctorId = localStorage.getItem("doctorId");

    if (!doctorId) {
      // Если doctorId нет — редирект на login
      router.push("/doctor/login");
      return;
    }

    const fetchData = async () => {
      try {
        const doctorRes = await axios.get(`http://localhost:3002/doctors/${doctorId}`);
        setDoctor(doctorRes.data);

        const reviewsRes = await axios.get(`http://localhost:3002/reviews?doctorId=${doctorId}`);
        setReviews(reviewsRes.data);

        const appointmentsRes = await axios.get(`http://localhost:3002/appointments?doctorId=${doctorId}`);
        setAppointments(appointmentsRes.data);

        const patientsRes = await axios.get("http://localhost:3002/users?role=patient");
        setPatients(patientsRes.data.slice(0, 5));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  if (!doctor) return <p className="text-center mt-10 text-red-500">Доктор не найден</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Профиль */}
      <Card className="mb-6 flex items-center gap-6">
        <Avatar size={100} src={doctor.img} icon={<UserOutlined />} />
        <div>
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p><strong>Специализация:</strong> {doctor.specialization}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Телефон:</strong> {doctor.phone}</p>
        </div>
      </Card>

      {/* Статистика */}
      <Row gutter={16} className="mb-6 text-center">
        <Col span={12}>
          <Card>
            <Statistic title="Количество приёмов" value={appointments.length} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic 
              title="Примерный заработок ($)" 
              value={appointments.length * pricePerAppointment} 
              prefix={<DollarOutlined />} 
            />
          </Card>
        </Col>
      </Row>

      {/* Последние пациенты */}
      <Card title="Последние пациенты" className="mb-6">
        <List
          dataSource={patients}
          renderItem={(p) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={p.name}
                description={p.email}
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Отзывы пациентов */}
      <Card title="Отзывы пациентов">
        {reviews.length > 0 ? (
          <List
            dataSource={reviews}
            renderItem={(r) => (
              <List.Item>
                <List.Item.Meta
                  title={r.author}
                  description={r.text}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>Пока нет отзывов</p>
        )}
      </Card>

      <Divider />

      {/* Личное сообщение */}
      <Card>
        <h3>Личное сообщение</h3>
        <p>
          Добро пожаловать в мой профиль! Здесь вы можете видеть своих пациентов, отзывы и статистику.
          Я всегда рад помочь каждому пациенту и готов к новым приёмам.
        </p>
      </Card>
    </div>
  );
}
