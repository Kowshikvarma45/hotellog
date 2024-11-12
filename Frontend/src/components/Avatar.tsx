interface username {
    Authorname:string
    size:number
    pad:number
}

export const Avatar = ({Authorname,size,pad}:username)=>{
    return (
        <div className={`hover:scale-105 hover:bg-gray-900 relative flex items-center flex-col justify-center w-${size.toString()} h-${size.toString()} p-${pad.toString()} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
                <span className="font-medium text-gray-800 dark:text-gray-300">{Authorname[0]}</span>
        </div>
    )
}