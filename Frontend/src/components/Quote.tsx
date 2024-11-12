// @ts-ignore
export const Quote = (props)=>{
    return (
        <div className="min-h-screen flex items-center justify-center align-middle bg-slate-200">
            <div>
                <h1 className="text-3xl text-gray-950 font-bold max-w-md text-center">{props.main}</h1>
                <h2 className="text-xl text-gray-600 font-semibold max-w-md text-center">{props.by}<button className="text-xl text-gray-600 font-semibold underline">{props.link?props.link:null}</button></h2>
            </div>
        </div>
    )
}