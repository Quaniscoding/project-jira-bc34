import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callGetListProject } from "../../../redux/reducers/projects/getAllProject";
import { getLocal, getStringLocal } from "../../../utils/config";
import { USER_LOGIN, DATA_USER } from "../../../utils/constant";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { callDeleteProject } from "../../../redux/reducers/projects/deleteProject";
import {
  Avatar,
  Button,
  Input,
  Result,
  Table,
  Tooltip,
  Modal,
  notification,
} from "antd";
import { callDeleteUserFromProject } from "../../../redux/reducers/users/deleteUserFromProject";
import { callAsignUserFromProject } from "../../../redux/reducers/users/asignUserFromProject";
import { callGetListUser } from "../../../redux/reducers/users/getUser";
import { callGetListProjectDetail } from "../../../redux/reducers/projects/getProjectDetail";
import { callGetProjectCategory } from "../../../redux/reducers/projects/getProjectCategory";
import useRoute from "../../../hooks/useRoute";
import "./css/project.css";
const { confirm } = Modal;
export default function Projectmanagement() {
  const openNotificationDeleteUserFromProject = () => {
    notification["success"]({
      message: "Notification !",
      description: "Delete user successfully !",
    });
  };
  const openNotificationAsignUserFromProject = () => {
    notification["success"]({
      message: "Notification !",
      description: "Asign user successfully !",
    });
  };
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "User already exists !",
    });
  };
  const errUnthor = () => {
    notification["error"]({
      message: "Notification !",
      description: "User is unthorization!",
    });
  };
  const openNotificationDeleteProject = () => {
    notification["success"]({
      message: "Notification !",
      description: "Delete project successfully !",
    });
  };
  const listUser = useSelector((state) => state.getUser.listUser);
  let isLogin = getStringLocal(USER_LOGIN);
  const dataUserLogin = getLocal(DATA_USER);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const listProject = useSelector((state) => state.getAllProject.listProject);
  const {
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.has("keyWord")
    ? searchParams.get("keyWord")
    : "";

  const dataUser = {
    projectId: "",
    userId: "",
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Categogy",
      dataIndex: "categogy",
      key: "categogy",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Members",
      dataIndex: "member",
      key: "member",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListProject(keyWord));
      dispatch(callGetListUser);
      dispatch(callGetListProjectDetail);
      dispatch(callGetProjectCategory);
    }, 1000);
  }, [keyWord]);
  const data = listProject.map((item, index) => {
    return {
      key: index,
      id: item.id,
      projectName: (
        <button
          className="p-0 m-0 text-blue-500"
          onClick={() => {
            navigate(`/projectDetail/${item.id}`);
          }}
        >
          {item.projectName}
        </button>
      ),
      categogy: item.categoryName,
      creator: (
        <div className="m-auto">
          <p>{item.creator.name}</p>
        </div>
      ),
      member: (
        <span className="d-flex">
          <Avatar.Group
            maxCount={3}
            maxPopoverTrigger="hover"
            size="default"
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            {item.members.map((item, i) => (
              <>
                <Tooltip
                  title={
                    <>
                      <h5 key={i} className="text-black">
                        Members
                      </h5>
                      <table className="table bg-white">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{item.userId}</td>
                            <td>
                              <Avatar
                                style={{
                                  backgroundColor: "white",
                                }}
                                src={item.avatar}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  confirm({
                                    title: "Do you want delete this user ?",
                                    icon: <ExclamationCircleFilled />,
                                    okText: "Delete",
                                    okType: "danger",
                                    cancelType: "primary",
                                    onOk: async () => {
                                      try {
                                        dataUser.projectId =
                                          listProject[index].id;
                                        dataUser.userId = item.userId;
                                        if (
                                          listProject[index].creator.id ==
                                          dataUserLogin.id
                                        ) {
                                          const res = await dispatch(
                                            callDeleteUserFromProject(dataUser)
                                          );
                                          if (res.isDelete == true) {
                                            openNotificationDeleteUserFromProject();
                                          }
                                          dispatch(callGetListProject(keyWord));
                                        } else {
                                          errUnthor();
                                        }
                                      } catch (error) {}
                                    },
                                    onCancel() {},
                                  });
                                }}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  }
                  placement="bottom"
                >
                  <div>
                    <Avatar src={item.avatar}></Avatar>
                  </div>
                </Tooltip>
              </>
            ))}
          </Avatar.Group>{" "}
          {listUser.map((item) => {
            dataUser.userId = item.userId;
          })}
          <button
            onClick={() => {
              dataUser.projectId = listProject[index]?.id;
            }}
          >
            <Tooltip
              placement="right"
              trigger={"click"}
              title={
                <>
                  <h5 className="text-black">Add users</h5>
                  <Tooltip
                    trigger={["click"]}
                    title={
                      <>
                        {listUser.map((item, index) => {
                          let i = index;
                          for (; i < 10; i++) {
                            return (
                              <>
                                <button
                                  className="btn btn-white text-black pb-1"
                                  key={index}
                                  onClick={() => {
                                    dataUser.userId = item.userId;
                                    confirm({
                                      title: "Do you want to asign this user ?",
                                      icon: <ExclamationCircleFilled />,
                                      okText: "Add",
                                      okType: "primary",
                                      cancelType: "primary",
                                      onOk: async () => {
                                        try {
                                          if (dataUser.projectId != "") {
                                            const res = await dispatch(
                                              callAsignUserFromProject(dataUser)
                                            );
                                            if (res.isAsign == true) {
                                              openNotificationAsignUserFromProject();
                                            }
                                            if (res.isUnthor == true) {
                                              errUnthor();
                                            }
                                            if (res.isAsign == false) {
                                              err();
                                            }
                                            dispatch(
                                              callGetListProject(keyWord)
                                            );
                                          }
                                        } catch (error) {
                                          err();
                                        }
                                      },
                                    });
                                  }}
                                >
                                  {item.name}
                                </button>
                                <br />
                              </>
                            );
                          }
                        })}
                      </>
                    }
                    placement="bottom"
                  >
                    <Input
                      onChange={(e) => {
                        const { value } = e.target;
                        dispatch(callGetListUser(value));
                      }}
                    />
                  </Tooltip>
                </>
              }
            >
              <Avatar>+</Avatar>
            </Tooltip>
          </button>
        </span>
      ),
      action: [
        <>
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle dots"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a
                className="dropdown-item"
                onClick={() => {
                  navigate(`edit/${listProject[index].id}`);
                }}
              >
                Edit Project
              </a>
              <a
                className="dropdown-item"
                onClick={() => {
                  confirm({
                    title: ` Do you want delete project: 
                    ${item.projectName} ?`,
                    icon: <ExclamationCircleFilled />,
                    okText: "Delete",
                    okType: "danger",
                    cancelType: "primary",
                    onOk: async () => {
                      try {
                        if (dataUserLogin.id == listProject[index].creator.id) {
                          const res = await dispatch(
                            callDeleteProject(item.id)
                          );
                          if (res.isDelete == true) {
                            openNotificationDeleteProject();
                          }
                          dispatch(callGetListProject(keyWord));
                        } else {
                          errUnthor();
                        }
                      } catch (error) {}
                    },
                    onCancel() {},
                  });
                }}
              >
                {" "}
                Delete project
              </a>
            </div>
          </div>
        </>,
      ],
    };
  });
  return (
    <main className="containerProject container py-6">
      {isLogin ? (
        <>
          <div className="d-flex content-start">
            <h3>Project</h3>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <form>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={keyWord}
                  onChange={(event) => {
                    let { value } = event.target;
                    setSearchParams({ keyWord: value });
                  }}
                />
                <div className="input-group-btn">
                  <button className="btn btn-default">
                    <i className="glyphicon glyphicon-search" />
                  </button>
                </div>
              </div>
            </form>
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/createProject");
                }}
              >
                Create Project
              </button>
            </div>
          </div>

          <br />
          <Table columns={columns} dataSource={data} />
        </>
      ) : (
        <Result
          className="col-12"
          title="You are not logged in !"
          extra={
            <>
              <span>Click button to log in !</span>
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  navigate(`/user/login`);
                }}
              >
                Login{" "}
              </Button>
            </>
          }
        />
      )}
    </main>
  );
}
