import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaUpload as Upload } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectUserId } from "../store/index";
import { useDropzone } from "react-dropzone";
import { recruitRoute } from "../utils/api-routes";
export default function Recruit() {
  const id = useSelector(selectUserId);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [values, setValues] = useState({
    rd: "",
    ot: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log(id);
      const formData = new FormData();
      formData.append("rd", values.rd);
      formData.append("ot", values.ot);
      formData.append("image", selectedFile);
      console.log(formData);
      await axios.post(`${recruitRoute}${id.user}`, formData, {
        headers: {
          Authorization: localStorage.getItem("user"),
        },
      });
    }
  };
  const handleFileChange = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      toast.error("Please select a Image file", toastOptions);
      setSelectedFile(null);
      setImagePreview(null);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: "image/*",
    multiple: false,
  });
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
    const { rd, ot } = values;
    if (rd === "") {
      toast.error("Details should be filled.", toastOptions);
      return false;
    } else if (ot === "") {
      toast.error("OPen to field should be filled.");
      return false;
    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {selectedFile && (
              <div className="image-preview">
                <p>Selected Image Preview</p>
                <img src={imagePreview} alt="dp" className="logo" />
              </div>
            )}
            <p>
              <Upload />
              {`Upload ${selectedFile ? "Other" : ""} Recruitment Picture`}
            </p>
            {selectedFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
              >
                Cancel Upload
              </button>
            )}
          </div>
          <input
            type="text"
            placeholder="Recruitment Details"
            name="rd"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
            placeholder="Open to:"
            name="ot"
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
  padding: 1rem;
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
    img {
      align-self: center;
      height: 6rem;
      width: 6rem;
      border: 0.1rem solid #4e0eff;
    }
    .dropzone {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 2px dashed #4e0eff;
      border-radius: 4px;
      background-color: #282a34;
      padding: 0.5rem;
      cursor: pointer;
      margin-bottom: 20px;
      .logo {
        height: 100px;
        width: 100px;
        margin-bottom: 10px;
      }
      p {
        color: white;
      }
      .image-preview {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        p {
          color: white;
          align-self: center;
        }
      }
      button {
        align-self: center;
        background-color: #997af0;
        color: white;
        width: fit-content;
        padding: 0.3rem 0.3rem;
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
