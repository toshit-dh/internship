import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import JOB from '../assets/images/job.gif'
export default function Recruit() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (handleValidation()) {
    //   const { email, password } = values;
    //   const { data } = await axios.post(loginRoute, { email, password });
    //   if (data.status === false) {
    //     toast.error(data.msg, toastOptions);
    //   }
    //   if (data.status === true) {
    //     localStorage.setItem("user", JSON.stringify(data.token));
    //     navigate("/");
    //   }
    // }
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleValidation = () => {
    const { email, password } = values;
    if (password === "") {
      toast.error("Email should be filled.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email should be filled.");
      return false;
    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button>Upload</button>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: fit-content;
  width: fit-content;
  gap: 1rem;
  align-items: center;
  background-color: #282a34;
  form {
    display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
      input {
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
      button {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.5s ease-in-out;
        &:hover {
          background-color: #4e0eff;
        }
      }
    }
`;
