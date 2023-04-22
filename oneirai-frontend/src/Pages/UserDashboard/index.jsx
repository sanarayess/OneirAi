import React, { useState, useEffect } from "react";
import SideNav from "../../components/SideNav";
import "./userdashboard.css";
import UserDash from "../../components/UserDash";
import axios from "axios";

const UserDashboard = () => {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    const getDreams = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/getDreams", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setDreams(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDreams();
  }, []);

  return (
    <div className="body2">
      <div className="box">
        <div className="side-nav">
          <SideNav />
        </div>
        <div className="page-left">
          <UserDash />
          <div className="dreams-container">
           
            {dreams.map((dream) => (
              <div className="dream-card" key={dream.id}>
                <div className="dream-details">
                  <h3>{dream.title}</h3>
                  <p2>{dream.date}</p2><br/><br/>
                  <p1>{dream.description}</p1>
                  
                </div>
                <div className="dream-card-button">
                 <div> <button className="button-dream">Visualize</button></div>
                 <div> <button className="button-dream">Interpret</button></div>
                 <div> <button className="button-dream">Delete</button></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
