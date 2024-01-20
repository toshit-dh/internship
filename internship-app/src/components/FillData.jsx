import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/images/logo.png";

export default function FillData() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    fullname: "",
    mno: "",
    skills: [],
    aoi: [],
    userType: "worker",
    area: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "skills" || name === "aoi"
          ? value.split(",").map((skill) => skill.trim())
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 1) {
      setPage(2);
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="inputs">
            <div className="brand">
              <img src={Logo} alt="logo" />
              <h2>WELCOME TO INTERN-EXPLORER</h2>
            </div>
            {page === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  placeholder="Mobile Number"
                  name="mno"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  placeholder="Location"
                  name="area"
                  onChange={(e) => handleChange(e)}
                />
                <div className="loc">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="recruiter"
                      checked={formData.userType === "recruiter"}
                      onChange={(e) => handleChange(e)}
                    />
                    Recruiter
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="worker"
                      checked={formData.userType === "worker"}
                      onChange={(e) => handleChange(e)}
                    />
                    Worker
                  </label>
                </div>
                <button type="submit">Next Page</button>
              </>
            )}
            {page === 2 && formData.userType === "recruiter" && (
              <>
                <input
                  type="text"
                  placeholder="Skills Required (comma, separated)"
                  name="skills"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  placeholder="Fields For Requirement (comma, separated)"
                  name="aoi"
                  onChange={(e) => handleChange(e)}
                />
                <button type="button" onClick={() => setPage(1)}>
                  Previous Page
                </button>
                <button type="submit">Submit</button>
              </>
            )}
            {page === 2 && formData.userType === "worker" && (
              <>
                <select name="proffesion">
                  <option value="">Select Profession</option>
                  <option value="student">Student</option>
                  <option value="ug">Undergraduate (UG)</option>
                  <option value="pg">Postgraduate (PG)</option>
                  <option value="service">Service</option>
                </select>
                <input
                  type="text"
                  placeholder="Skills (comma, separated)"
                  name="skills"
                  onChange={(e) => handleChange(e)}
                />
                <input
                  type="text"
                  placeholder="Areas Of Interest (comma, separated)"
                  name="aoi"
                  onChange={(e) => handleChange(e)}
                />
                <button type="button" onClick={() => setPage(1)}>
                  Previous Page
                </button>
                <button type="submit">Submit</button>
              </>
            )}
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2.5rem;
    }
    h2 {
      color: white;
      text-transform: uppercase;
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
      select {
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
        option{
            color: transparent;
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
      .radio {
        background-color: transparent;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 1rem;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.4rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
        label {
          display: flex;
          gap: 0.5rem;
          color: white;
        }
      }
      .loc {
        display: flex;
        gap: 0.5rem;
      }
    }
    .gif {
      @media only screen and (max-width: 1280px) {
        img {
          display: none;
        }
      }
    }
  }
`;
