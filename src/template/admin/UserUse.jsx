import React, { useState } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  SettingFilled,
  UserOutlined,
  CreditCardOutlined,
  SnippetsFilled,
  CreditCardFilled,
} from "@ant-design/icons";
import { Button, Menu, Dropdown, Space, Avatar } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { getLocal, getStringLocal } from "../../utils/config";
import { DATA_USER, USER_LOGIN } from "../../utils/constant";
export default function UserUse() {
  const links = document.querySelectorAll(".nav-link");
  if (links.length != "") {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        links.forEach((link) => {
          link.classList.remove("active");
        });
        e.preventDefault();
        link.classList.add("active");
      });
    });
  }
  const navigate = useNavigate();
  let [reset, setReset] = useState(0);
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const itemsUser = [
    getItem("Create task", "1", <PlusOutlined />),
    getItem("Search", "2", <SearchOutlined />),
  ];
  let isLogin = getStringLocal(USER_LOGIN);
  let dataUser = getLocal(DATA_USER);
  return (
    <div className="col-2" style={{ backgroundColor: "#f4f5f7" }}>
      <div className="pt-5">
        <div className="d-flex justify-content-start align-items-center cursor-pointer">
          <div className="dropdown">
            {isLogin ? (
              <>
                <button
                  className="d-flex justify-content-center algin-content-center"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar
                    style={{
                      color: "#f56a00",
                      background: "none",
                      fontSize: "40px",
                    }}
                    src={dataUser.avatar}
                  ></Avatar>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <p style={{ borderBottom: "1px solid black" }}>
                    Hello {dataUser.name}!
                  </p>
                  <button
                    onClick={() => {
                      setReset(reset + 1);
                      localStorage.removeItem(USER_LOGIN);
                      navigate(`user/login`);
                    }}
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  className="d-flex justify-content-center algin-content-center"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar icon={<UserOutlined />} />
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <p style={{ borderBottom: "1px solid black" }}>Hello !</p>
                  <button
                    onClick={() => {
                      navigate(`user/login`);
                    }}
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="d-flex flex-column pl-2">
            <div style={{ fontWeight: "bold" }}>
              {isLogin ? (
                <p style={{ paddingTop: "5px", margin: "0" }}>
                  {dataUser.name}
                </p>
              ) : (
                <p style={{ paddingTop: "5px", margin: "0" }}>
                  You are not logged in !
                </p>
              )}
            </div>

            <a
              style={{ textDecoration: "none", color: "black" }}
              href="/reportBug"
            >
              <p className="text-left m-0">Report bugs</p>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className="pt-3">
        <ul className="nav flex-column align-content-start">
          <li className="cursor-pointer d-flex align-items-center justify-content-start nav-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
            <a className="nav-link active" href="/cyberBoard">
              Cyber board
            </a>
          </li>
          <li className="cursor-pointer d-flex align-items-center justify-content-start nav-item">
            <SettingFilled />
            <a
              className="nav-link "
              onClick={() => {
                navigate("projectmanagement");
              }}
            >
              Project management
            </a>
          </li>
          <li className="cursor-pointer d-flex align-items-center justify-content-start nav-item">
            <SettingFilled />
            <a
              className="nav-link"
              onClick={() => {
                navigate("createProject");
              }}
            >
              Create project
            </a>
          </li>
        </ul>
      </div>
      <hr />
      <div style={{ borderTop: "0.5px solid black" }}>
        <ul className="nav flex-column align-content-start">
          <li className="cursor-pointer d-flex align-items-center justify-content-start nav-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="black"
              className="bi bi-truck"
              viewBox="0 0 16 16"
            >
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
            </svg>
            <a className="nav-link " href="/releasse">
              Releasse
            </a>
          </li>
          <li className="cursor-pointer d-flex align-items-center justify-content-start nav-item">
            <CreditCardFilled />
            <a className="nav-link " href="/issues">
              Issues and filter
            </a>
          </li>
          <li className="cursor-pointer d-flex align-items-center justify-content-start nav-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-send-fill"
              viewBox="0 0 16 16"
            >
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
            <a className="nav-link" href="report">
              Report
            </a>
          </li>
          <li className="cursor-pointer d-flex align-items-center justify-content-start nav-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box2-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4h-8.5ZM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6l.5.667Z" />
            </svg>
            <a className="nav-link" href="components">
              Components
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
