import axios from "axios";
import { createContext,useEffect,useState} from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentuser,setcurrentuser]=useState(JSON.parse(localStorage.getItem("user"))|| null);

     const login = async(inputs)=>{
       const res = await axios.post("http://localhost:5000/api/auth/login",inputs,{withCredentials:true});
       setcurrentuser(res.data);
     }
       
     

    useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(currentuser));
    },[currentuser]);

    return (
        <AuthContext.Provider value={{currentuser, login}}>{children}</AuthContext.Provider>
    );
}