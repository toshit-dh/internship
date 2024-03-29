import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/images/logo.png";
import GIF from "../assets/images/job.gif";
import { loginRoute } from "../utils/api-routes";
export default function Reccomend() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      const { data } = await axios.post(loginRoute, { email, password });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("user", JSON.stringify(data.token));
        navigate("/");
      }
    }
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
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
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
          <div className="inputs">
            <div className="gif">
              <img src={GIF} alt="gig" />
            </div>
            <input
              type="text"
              placeholder="Location"
              name="loc"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Area Of Interest"
              name="aoi"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Submit</button>
            <span>
              
            </span>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #282a34;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2.5rem;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    .inputs {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      background-color: #00000076;
      padding: 3rem 5rem;
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
      span {
        text-transform: uppercase;
        color: white;
        a {
          color: #4e0eff;
          text-decoration: none;
          font-weight: bold;
        }
      }
      .gif {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 15rem;
          width: 15rem;
          @media only screen and (max-width: 1280px) {
            display: none;
          }
        }
      }
    }
  }
`;
