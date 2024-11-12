import { atom } from "recoil";


export const readblogAtom = atom({
    key:"readblogAtom",
    default:""

})

export const fullblogatom = atom({
    key:"fullblogatom",
    default:{
        msg:"",
        response:{
                id: "",
                title: "",
                content:"",
                published:false,
                authorId:""
        }
    }
})