import React,{useState,useEffect} from 'react'
import {jwtDecode as decode} from 'jwt-decode'
export default function Home() {
  const [currentUser,setCurrentUser] = useState(null)
  useEffect(() => {
    async function setUser() {
      const token = localStorage.getItem("user")
      if (!token) {
        navigate("/login");
      } else {
        ((decode(token)));
      }
    }
    setUser();
  }, []);
  return (
    <div>
      hi
    </div>
  )
}
