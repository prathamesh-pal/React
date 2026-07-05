import { create } from "zustand" 

export const useImageStore = create(persist(
    (set)=>({
        image:[],
        setImage:(binary)=> set(()=>({
            setImage:(payload)
        }))
    }),
    {name: "Image-store"}
))