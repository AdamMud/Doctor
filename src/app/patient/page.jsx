'use client'

import { useEffect, useState } from "react";




export default function Patients() {
    let APIDOCtors = "http://localhost:3002/doctors"
    let [data, setData] = useState([])

    async function get() {
        try {
            let { data } = await axios.get(APIDOCtors)
            setData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        get()
    },[])

    return (<>

        <section className="bg">
            <div className="lg:w-[800px] pt-[150px] px-[20px] lg:px-[100px]">
                <h1 className="text-[#159EEC] font-bold">Забота о жизни</h1>
                <h1 className="text-[#1F2B6C] font-bold text-[20px] lg:text-[40px]"> Лидерство в медицинском совершенстве</h1>
            </div>
        </section>


        <section className="w-[90%] m-auto">
            {data.map((e)=>{
                return(<div key={e.id} className="w-[300px] h-[400px] border ">
                    <h1>{e.name}</h1>
                </div>)
            })}
        </section>
    </>)
}