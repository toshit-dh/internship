import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {jwtDecode as decode} from 'jwt-decode'
import { useDispatch, useSelector } from "react-redux";
import { setUserId, selectUserId ,selectUserData, fetchUserData} from "../store/index";
import styled from 'styled-components';
import FillData from '../components/FillData';
export default function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const userData = useSelector(selectUserData);
  useEffect(() => {
    async function setUser() {
      const token = localStorage.getItem("user")
      if (!token) {
        console.log(false);
        navigate("/login");
      } else {
        dispatch(setUserId(decode(token)))
        dispatch(fetchUserData())
      }
    }
    setUser();
  }, [dispatch]);
  return (
    <Container>
      {
        !userData && <FillData/>
      }
    </Container>
  )
}
const Container = styled.div``
