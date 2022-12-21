import React, { useState } from "react";
import { ProjectOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { DATA_USER, USER_LOGIN } from "../../utils/constant";
import { getLocal, getStringLocal } from "../../utils/config";
import "./css/adminMainCss.css";
export default function Projectmanagement() {
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
  let isLogin = getStringLocal(USER_LOGIN);
  let dataUser = getLocal(DATA_USER);
  return (
    <>
      <header
        className="h-14 bg-white shadow px-4 fixed left-0 top-0 w-full"
        style={{ zIndex: 1030 }}
      >
        <div className="h-full flex justify-between items-center">
          <div className="d-flex justify-content-between align-items-center">
            <nav
              className="navbar navbar-expand-lg navbar-light bg-white"
              style={{ marginBottom: 0 }}
            >
              <div className="container-fluid">
                <ProjectOutlined style={{ fontSize: "35px", color: "blue" }} />
                <a className="navbar-brand" href="/projectmanagement">
                  Jira
                </a>
                <button
                  className="navbar-toggler "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown"
                  aria-controls="navbarNavDropdown"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>
              </div>
            </nav>
            <form className="d-flex align-items-center">
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <Tooltip placement="bottom">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle active"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "blue" }}
                      >
                        Project
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <div>
                          <a
                            className="dropdown-item p-3"
                            href="/projectmanagement"
                          >
                            <button>View all project</button>
                          </a>
                          <a
                            className="dropdown-item p-3"
                            href="/createProject"
                          >
                            Create Project
                          </a>
                        </div>
                      </ul>
                    </li>
                  </Tooltip>
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <Tooltip placement="bottom">
                    <li className="nav-item dropdown pl-2">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ color: "blue" }}
                      >
                        <span>Users</span>
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <button className="dropdown-item" href="/user">
                          View all users
                        </button>
                      </ul>
                    </li>
                  </Tooltip>
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <Tooltip placement="bottom">
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#"
                        style={{ color: "blue" }}
                      >
                        Create Task
                      </a>
                    </li>
                  </Tooltip>
                </ul>
              </div>
            </form>
          </div>

          <form className="d-flex">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <Tooltip title={<span className="text-black">Setting</span>}>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "black", fontSize: "18px" }}
                    >
                      <SettingOutlined />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <div>
                        <div
                          className="dropdown-item p-3"
                          style={{ hover: "background-color:#fff" }}
                        >
                          <span className="text-gray-400 ">
                            ATLASSIAN ADMIN
                          </span>
                        </div>
                        <a className="dropdown-item" href="#">
                          <button
                            onClick={() => {
                              navigate(``);
                            }}
                          >
                            User management
                          </button>
                        </a>
                      </div>
                      <div>
                        <div
                          className="dropdown-item p-3"
                          style={{ hover: "background-color:#fff" }}
                        >
                          <span className="text-gray-400 ">JIRA SETTING</span>
                        </div>
                        <a className="dropdown-item" href="#">
                          <button
                            onClick={() => {
                              navigate(`/projectmanagement`);
                            }}
                          >
                            Project
                          </button>
                        </a>
                      </div>
                    </ul>
                  </li>
                </Tooltip>
              </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <Tooltip
                  placement="bottomRight"
                  title={
                    <span className="text-black">Your profile and setting</span>
                  }
                >
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link "
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ color: "black", fontSize: "18px" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <Avatar
                        style={{
                          color: "#f56a00",
                          background: "none",
                          fontSize: "18px",
                          width: 24,
                          height: 24,
                        }}
                        src={dataUser.avatar}
                      ></Avatar>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div>
                        <div
                          className="dropdown-item p-3"
                          style={{ hover: "background-color:#fff" }}
                        >
                          <span className="text-gray-400 ">Admin</span>
                        </div>
                        <a className="dropdown-item" href="#">
                          <button
                            onClick={() => {
                              navigate(``);
                            }}
                          >
                            Profiles
                          </button>
                        </a>
                      </div>
                      <div>
                        <a className="dropdown-item" href="#">
                          <button
                            onClick={() => {
                              setReset(reset + 1);
                              localStorage.removeItem(USER_LOGIN);
                              navigate(`/login`);
                            }}
                          >
                            Log out
                          </button>
                        </a>
                      </div>
                    </div>
                  </li>
                </Tooltip>
              </ul>
            </div>
          </form>
        </div>
      </header>
      <div className="header-placehoder" style={{ height: "7.5rem" }}></div>
    </>
  );
}
