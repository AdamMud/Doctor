"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, Card, Spin, List } from "antd";

export default function PatientCard() {
  const params = useSearchParams();
  const patientId = params.get("id");
  const [patient, setPatient] = useState(null);
  const [medicalData, setMedicalData] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (patientId) {
      // Берем данные пациента из users
      axios.get(`http://localhost:3001/users/${patientId}`).then((res) => {
        setPatient(res.data);
      });
      // Медицинские записи из patients
      axios.get(`http://localhost:3001/patients/${patientId}`).then((res) => {
        setMedicalData(res.data);
        setLoading(false);
      });
    }
  }, [patientId]);

  const handleSave = async () => {
    if (!medicalData) return;
    const record = {
      date: new Date().toISOString().split("T")[0],
      doctor: localStorage.getItem("doctorName") || "Врач",
      diagnosis,
      recommendations,
    };

    await axios.patch(`http://localhost:3001/patients/${patientId}`, {
      ...medicalData,
      medicalRecord: [...(medicalData.medicalRecord || []), record],
    });

    setMedicalData((prev) => ({
      ...prev,
      medicalRecord: [...(prev?.medicalRecord || []), record],
    }));

    setDiagnosis("");
    setRecommendations("");
  };

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card title={`Карточка: ${patient?.name || "Пациент"}`} className="shadow-lg mb-4">
        <div className="mb-3">
          <Input
            placeholder="Диагноз"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Input.TextArea
            placeholder="Рекомендации"
            rows={3}
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Card>

      <Card title="История болезней" className="shadow-lg">
        <List
          dataSource={medicalData?.medicalRecord || []}
          renderItem={(item) => (
            <List.Item>
              <strong>{item.date}</strong> — {item.diagnosis} | {item.recommendations}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
