import { useNavigate } from "react-router-dom"
interface Header {
    header:string,
    des:string,
    link:string,
    navigate:string

}
export const Header = (props:Header)=>{
    const Navigate = useNavigate()
    return (
        <div>
            <h1 className="text-3xl text-gray-950 font-bold max-w-md text-center">{props.header}</h1>
            <h2 className="text-xl text-gray-600 font-semibold max-w-md text-center">{props.des}<button onClick={ ()=>{Navigate(props.navigate)}} className="text-xl text-gray-600 font-semibold underline">{props.link}</button></h2>
        </div>
    )
}