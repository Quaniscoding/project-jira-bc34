import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callGetListProject } from "../../redux/reducers/projects/getAllProject";
import { getStringLocal } from "../../utils/config";
import { USER_LOGIN } from "../../utils/constant";
import { Avatar, Button, Input, Result, Space, Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { callDeleteProject } from "../../redux/reducers/projects/deleteProject";
import { callDeleteUserFromProject } from "../../redux/reducers/users/deleteUserFromProject";
import { callAsignUserFromProject } from "../../redux/reducers/users/asignUserFromProject";
import { callGetListUser } from "../../redux/reducers/users/getUser";
import { callGetListProjectDetail } from "./../../redux/reducers/projects/getProjectDetail";
import { callGetProjectCategory } from "../../redux/reducers/projects/getProjectCategory";

export default function Projectmanagement(props) {
  const reloadPage = () => {
    window.location.reload(false);
  };
  const [loading, setLoading] = useState(false);
  const listUser = useSelector((state) => state.getUser.listUser);
  const { value, onChange } = props;
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  let isLogin = getStringLocal(USER_LOGIN);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const listProject = useSelector((state) => state.getAllProject.listProject);
  const dataUser = {
    projectId: "",
    userId: "",
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      filteredValue: filteredInfo.id || null,
      onFilter: (value, record) => record.id.includes(value),
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortOrder:
        sortedInfo.columnKey === "projectName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Categogy",
      dataIndex: "categogy",
      key: "categogy",
      sorter: (a, b) => a.categogy.length - b.categogy.length,
      sortOrder: sortedInfo.columnKey === "categogy" ? sortedInfo.order : null,
      ellipsis: true,
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
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      dispatch(callGetListProject);
      dispatch(callGetListUser);
      dispatch(callGetListProjectDetail);
      dispatch(callGetProjectCategory);
    }, 1000);
  }, []);

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
          <p
            style={{
              border: "2px solid green",
              width: "fit-content",
              text: "#054905",
              backgroundColor: "#94dc94",
              textAlign: "left",
            }}
          >
            {item.creator.name}
          </p>
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
                                className=" btn-danger"
                                onClick={() => {
                                  dataUser.projectId = listProject[index].id;
                                  dataUser.userId = item.userId;
                                  if (
                                    window.confirm(
                                      `Do you want to delete user : ${item.name} `
                                    )
                                  ) {
                                    dispatch(
                                      callDeleteUserFromProject(dataUser)
                                    );
                                  }
                                  reloadPage(true);
                                }}
                              >
                                <Avatar>X</Avatar>
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
          <button
            onClick={() => {
              dataUser.projectId = listProject[index]?.id;
            }}
          >
            <Tooltip
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
                                  className="text-black pb-1"
                                  key={index}
                                  onClick={() => {
                                    dataUser.userId = item.userId;
                                    if (dataUser.projectId != "") {
                                      if (
                                        dispatch(
                                          callAsignUserFromProject(dataUser)
                                        )
                                      ) {
                                        setTimeout(() => {
                                          reloadPage(true);
                                        }, 1000);
                                      }
                                    }
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
        <div className="d-flex algin-content-center">
          <div>
            <button
              className="btn btn-info"
              onClick={() => {
                navigate(`edit/${listProject[index].id}`);
              }}
            >
              <EditOutlined />
            </button>
          </div>
          <div className="pl-3">
            <button
              className="btn"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                if (
                  window.confirm(
                    `Do you want to delete project : ${listProject[index].projectName} `
                  )
                ) {
                  dispatch(callDeleteProject(item.id));
                }
                reloadPage(true);
              }}
            >
              <DeleteOutlined />
            </button>
          </div>
        </div>,
      ],
    };
  });
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="col-8 d-flex" style={{ paddingLeft: "5%" }}>
          {isLogin ? (
            <div className="w-100">
              <div className="d-flex content-start">
                <h1>Project management</h1>
              </div>
              <br />
              <>
                <Space
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Button onClick={clearFilters}>Clear filters</Button>
                  <Button onClick={clearAll}>Clear filters and sorters</Button>
                </Space>
                <Table
                  columns={columns}
                  dataSource={data}
                  onChange={handleChange}
                />
              </>
            </div>
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
        </div>
      )}
    </>
  );
}
