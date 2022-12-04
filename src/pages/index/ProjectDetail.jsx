import { Avatar, Button, Menu, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { callGetListProjectDetail } from "./../../redux/reducers/projects/getProjectDetail";
import { callGetListUser } from "../../redux/reducers/users/getUser";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectDetail() {
  const reloadPage = () => {
    window.location.reload(false);
  };
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(<button>Create task</button>, "1", <PlusOutlined />),
    getItem("Search", "2", <SearchOutlined />),
    getItem(
      <button
        onClick={() => {
          navigate("/projectmanagement");
        }}
      >
        Project management
      </button>,
      "3",
      <MenuOutlined />
    ),
    ,
    "",
    "",
  ];
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }

  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      dispatch(callGetListUser);
      dispatch(callGetListProjectDetail(params.id));
    }, 1000);
  }, []);
  const listProjectDetail = useSelector(
    (state) => state.getProjectDetail.listProjectDetail
  );
  console.log(listProjectDetail);

  return (
    <div className="row">
      <div
        className="col-2"
        style={{
          backgroundColor: "#001529",
        }}
      >
        <div className="d-flex justify-content-end">
          <Button
            style={{
              backgroundColor: "#001529",
              border: "none",
              color: "white",
            }}
          >
            <MenuOutlined />
          </Button>
        </div>
        <div style={{ backgroundColor: "black" }}></div>
        <Menu
          style={{ height: "100vh" }}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={items}
        />
      </div>
      <div className="col-10">
        <h1 style={{ padding: "0 0 0 50px" }}>Project Management</h1>
        <div>
          <div className="container">
            <div className="row">
              {listProjectDetail?.lstTask?.map((item, index) => {
                return (
                  <div className="col-3">
                    <div className="bg-gray-400 text-gray-600 p-1 rounded-3">
                      <p key={index}>{item.statusName}</p>
                      <div>
                        {item?.lstTaskDeTail?.map((item) => {
                          return (
                            <div
                              style={{
                                borderRadius: "10px",
                              }}
                              className="row bg-white ms-0 me-0 pb-3 mb-3"
                            >
                              <div
                                className="col-sm-12 pe-1 d-flex flex-column align-items-start"
                                key={item.taskId}
                                style={{
                                  margin: "10px 0",
                                }}
                              >
                                <div width={"100%"} style={{ color: "black" }}>
                                  <span> TASK NAME: {item.taskName}</span>
                                </div>
                                <div width={"100%"} className="mt-3">
                                  <span> DESCRIPTION: {item.description}</span>
                                </div>
                                <div className="row mt-3">
                                  <div
                                    className="col-sm-12"
                                    style={{
                                      color: "red",
                                      textTransform: "uppercase",
                                    }}
                                  >
                                    {item.priorityTask.priority}
                                  </div>
                                  <div className="col-sm-12 mt-3 row">
                                    {item.assigness.map((item) => {
                                      return (
                                        <div className="col-sm-2">
                                          <Avatar.Group>
                                            <Tooltip
                                              placement="bottom"
                                              title={
                                                <>
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
                                                        <td>{item.id}</td>
                                                        <td>
                                                          <Avatar
                                                            style={{
                                                              backgroundColor:
                                                                "white",
                                                            }}
                                                            src={item.avatar}
                                                          />
                                                        </td>
                                                        <td>{item.name}</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </>
                                              }
                                            >
                                              <div>
                                                <Avatar
                                                  src={item.avatar}
                                                ></Avatar>
                                              </div>
                                            </Tooltip>
                                          </Avatar.Group>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
