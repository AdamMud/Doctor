// const { default: Image } = require("next/image");

import Image from "next/image";



export function Cart1(props) {
    return(
        <div className=" hidden lg:flex gap-[20px] font-semibold items-center">
            <Image src={props.img}/>
            <div className="text-[16px] ">
                <h1>{props.name}</h1>
                <p className="text-[#159EEC] font-sans">{props.des}</p>
            </div>
        </div>
    )
}