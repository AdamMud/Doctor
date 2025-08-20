const { default: Image } = require("next/image");



export function Cart1(props) {
    return(
        <div className="flex gap-[10px] font-semibold">
            <Image src={props.img}/>
            <div className="text-[16px]">
                <h1>{props.name}</h1>
                <p className="text-[#159EEC] font-sans">{props.des}</p>
            </div>
        </div>
    )
}