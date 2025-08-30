// src/components/DoctorList.jsx
import { useGetDoctorsQuery } from "@/store/pages/patient/doctors/doctors";
import React from "react";
// import { useGetDoctorsQuery } from "../redux/doctorApi";

export default function Duxtur() {
  const { data, error, isLoading } = useGetDoctorsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Doctors List</h2>
      <ul>
        {data?.map((doctor) => (
          <li key={doctor.id}>{doctor.name}</li>
        ))}
      </ul>
    </div>
  );
}
