import {createContext, useEffect, useState} from 'react'

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children})=>{
 const [DarkMode,setDarkMode]=useState(
    JSON.parse(localStorage.getItem("DarkMode"))|| false
    );

    const toggle = ()=>{
        setDarkMode(!DarkMode)
    }

  useEffect(()=>{
    localStorage.setItem("DarkMode",DarkMode)
  },[DarkMode])

  return(
    <DarkModeContext.Provider value={{DarkMode,toggle}}> {children} </DarkModeContext.Provider>
    
  )
}
