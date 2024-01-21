import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import Chat from "../assets/images/chatbot.png";
import FO from "../assets/images/fieldsVsOpp.png";
import LO from "../assets/images/locationVsopportunites.png";
import MO from "../assets/images/maxpercentopp.png";
import PS from "../assets/images/NoofpackageVsStipend.png";
import Bot from "../components/Bot";
import Carousel from "../components/Carousel";
import { useSelector } from "react-redux";
import { selectUserData } from "../store/index";
import Recruit from "../components/Recruit";
import axios from "axios";
import { getRecruitersRoute } from "../utils/api-routes";
export default function Feed() {
  const [section, setSection] = useState("Analytics");
  const userData = useSelector(selectUserData);
  const [bot, isBot] = useState(false);
  const [loading, isLoaded] = useState(false);
  const images = [FO, LO, MO, PS];

  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data);
    async function get() {
      try {
        const response = await axios.get(getRecruitersRoute);
        setData(response.data);
        isLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    get();
  }, [loading]);

  return (
    <Container>
      {loading && (
        <div className="posts">
          {data.map((item) => (
            <Post username={item.username} image={item.recruitments.imageUrl} />
          ))}
        </div>
      )}
      <div className="bot">
        <img src={Chat} alt="bot" onClick={() => isBot(!bot)} />
      </div>
      <div className="section">
        <div className="topbar">
          <h1 onClick={() => setSection("Analytics")}>Analytics</h1>
          {userData.userType === "recruiter" && (
            <h1 onClick={() => setSection("Recruit")}>Recruit</h1>
          )}
        </div>
        <div className="sec">
          {section === "Analytics" && (
            <div className="analysis">
              <h1>Analytics</h1>
              <Carousel images={images} />
            </div>
          )}
          {section === "Recruit" && (
            <div className="recruit">
              <Recruit />
            </div>
          )}
        </div>
      </div>
      {bot && (
        <div className="chat">
          <Bot />
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: #282a34;
  .posts {
    width: 33%;
    overflow: auto;
    gap: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.3rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      height: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
  .chat {
    position: absolute;
    right: 0;
    bottom: 6rem;
    padding: 1rem;
    width: fit-content;
  }
  .bot {
    padding: 1rem;
    bottom: 0;
    right: 0;
    position: absolute;
    img {
      cursor: pointer;
      height: 5rem;
      width: 5rem;
      border-radius: 2.5rem;
      padding: 0.1rem;
      border: 0.1rem solid #4e3eff;
    }
  }
  .section {
    height: 100%;
    width: 100%;
    background-color: #ffffff39;
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .topbar {
      position: absolute;
      top: 0;
      width: 100vh;
      background-color: #282a34;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      h1 {
        cursor: pointer;
        padding: 0 1rem;
        color: white;
      }
    }
    .sec {
      .analysis {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        h1 {
          color: white;
        }
        img {
          border-radius: 3rem;
        }
      }
      .chat {
      }
    }
  }
`;
