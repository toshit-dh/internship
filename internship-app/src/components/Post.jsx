import React from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.png";
export default function Post({username,image}) {
  return (
    <Container>
      <div className="top">
        <div className="user">
          <img src={Logo} alt="dp" />
          <div className="detail">
            <h4>{username}</h4>
            <h5>...see more</h5>
            {
              <div className="more">
                <p></p>
              </div>
            }
          </div>
        </div>
        <div className="apply">
          <button>Apply</button>
        </div>
      </div>
      <div className="slider">
        <img src={`http://localhost:5000/${image}`} alt="" />
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 40%;
  padding: 1rem;
  background-color: #282a34;
  border-radius: 0.5rem;
  border: 0.1rem solid #4e3eff;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .top {
    display: flex;
    justify-content: space-between;
    border: 0.1rem solid cyan;
    border-radius: 0.5rem;
    .user {
      padding: 0.3rem;
      display: flex;
      gap: 1rem;
      img {
        height: 2rem;
        width: 2rem;
        border-radius: 1rem;
        padding: 0.2rem;
        border: 0.1rem solid #4e3eff;
      }
    }
    .apply {
        align-self: center;
        padding-right: 0.5rem;
      button {
        width: fit-content;
        background-color: cyan;
        color: white;
        padding: 0.5rem;
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
    .detail {
      display: flex;
      flex-direction: column;
      h4,
      h5 {
        color: white;
      }
    }
  }
  .slider {
    border-radius: 0.1rem solid #3c3eff;
    img {
      height: 10rem;
      width: 20rem;
    }
  }
`;
