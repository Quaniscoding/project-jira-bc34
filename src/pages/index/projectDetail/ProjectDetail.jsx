import React, { useEffect, useState } from "react";
import "./css/cssProject.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callGetListProjectDetail } from "../../../redux/reducers/projects/getProjectDetail";
import {
  Avatar,
  Divider,
  Input,
  Modal,
  Skeleton,
  List,
  Button,
  notification,
} from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  UserOutlined,
  ExclamationCircleFilled,
  BugOutlined,
} from "@ant-design/icons";
import { callGetListUser } from "../../../redux/reducers/users/getUser";
import InfiniteScroll from "react-infinite-scroll-component";
import useRoute from "../../../hooks/useRoute";
import { callAsignUserTask } from "./../../../redux/reducers/task/asignUserTask";
import { callGetListTaskDetail } from "../../../redux/reducers/task/getTaskDetail";
import { callDeleteTask } from "../../../redux/reducers/task/deleteTask";
import { callAsignUserFromProject } from "../../../redux/reducers/users/asignUserFromProject";
import { callDeleteUserFromProject } from "./../../../redux/reducers/users/deleteUserFromProject";
const { confirm } = Modal;
export default function ProjectDetail() {
  const [modal1Open, setModal1Open] = useState(false);
  const params = useParams();
  const openNotificationDeleteTask = () => {
    notification["success"]({
      message: "Notification !",
      description: "Delete task successfully !",
    });
  };
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "Delete task fail !",
    });
  };
  const errUnthor = () => {
    notification["error"]({
      message: "Notification !",
      description: "User is unthorization!",
    });
  };
  const openNotificationAsignUserFromProject = () => {
    notification["success"]({
      message: "Notification !",
      description: "Asign user successfully !",
    });
  };
  const errUser = () => {
    notification["error"]({
      message: "Notification !",
      description: "User already exists !",
    });
  };
  const listProjectDetail = useSelector(
    (state) => state.getProjectDetail.listProjectDetail
  );
  console.log(listProjectDetail);
  const listUser = useSelector((state) => state.getUser.listUser);
  const listTaskDetail = useSelector(
    (state) => state.getTaskDetail.listTaskDetail
  );
  let dispatch = useDispatch();
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  const {
    searchParams: [searchParams, setSearchParams],
  } = useRoute();
  const keyWord = searchParams.has("keyWord")
    ? searchParams.get("keyWord")
    : "";
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListUser(keyWord));
      dispatch(callGetListProjectDetail(params.id));
      // dispatch(callGetListTaskDetail());
    }, 1000);
  }, [keyWord]);
  let title = `Add members to project ${listProjectDetail.projectName}`;
  const dataTask = () => {
    let listTask = listProjectDetail.lstTask;
    return listTask?.map((item, index) => {
      var bg = "";
      let bgColor = item.statusId;
      if (bgColor == 1) {
        bg = "bg-gray-400";
      }
      if (bgColor == 2) {
        bg = "bg-blue-200";
      }
      if (bgColor == 3) {
        bg = "";
      }
      if (bgColor == 4) {
        bg = "bg-green-200";
      }
      return (
        <div className="col-3 cursor-pointer" key={index}>
          <div className="bg-gray-200 w-full h-full p-2 rounded d-flex flex-column">
            <div>
              <span
                className={`inline-block px-2 py-0.5 mb-1 text-xl font-semibold rounded ${bg} `}
              >
                {item.statusName}
              </span>
              <div>
                {item.lstTaskDeTail.map((item, index) => {
                  let taskType = "";
                  if (item.taskTypeDetail.taskType == "bug") {
                    taskType = (
                      <BugOutlined className="bg-red-500 rounded text-white" />
                    );
                  } else {
                    taskType = (
                      <CheckOutlined className="bg-green-500 rounded text-white" />
                    );
                  }
                  console.log(item.taskTypeDetail.taskType);
                  return (
                    <div className="border border-danger rounded border-3 mt-2">
                      <div className="mt-2 bg-white p-2 shadow rounded">
                        <div className="d-flex justify-content-between">
                          <div className="d-flex align-items-center">
                            {taskType}
                            <b> {item.taskTypeDetail.taskType}</b>
                          </div>
                          <div className="text-right mt-2">
                            <button
                              className="btn bg-danger text-white font-bold"
                              onClick={async () => {
                                try {
                                  const res = await dispatch(
                                    callDeleteTask(item.taskId)
                                  );
                                  if (res.isDelete == true) {
                                    openNotificationDeleteTask();
                                  } else {
                                    err();
                                  }
                                  dispatch(callGetListProjectDetail(params.id));
                                } catch (error) {}
                              }}
                            >
                              X
                            </button>
                          </div>
                        </div>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-body">
                                <div className="d-flex justify-content-between align-items-center"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-full bg-white rounded py-3 px-2 mt-1"
                          role={"button"}
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          <div className="row row-gap-0">
                            <div className="col-8">
                              <div className="mb-2">{item.description}</div>
                              <span className="text-xl rounded px-1 pb-0.5 text-orange-700 border border-orange-700">
                                {item.priorityTask.priority}
                              </span>
                            </div>
                            <div className="col-4">
                              <div className="h-full w-full d-flex justify-end items end">
                                <Avatar size="small" icon={<UserOutlined />} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const data = {
    userId: "",
    projectId: "",
  };
  return (
    <main className="container py-6">
      <div className="ant-breadcrumb mb-4">
        <span>
          <span className="ant-breadcrumb-link">
            <a href="/projectmanagement">Projects/ </a>
          </span>
        </span>
        <span>
          <span className="ant-breadcrumb-link text-black">
            {listProjectDetail.projectName}
          </span>
        </span>
      </div>
      <div className="row">
        <div className="col-3">
          <h3 className="ant-typography">Board</h3>
        </div>
        <div className="col-6 d-flex align-items-center">
          <h5>Members</h5>
          <span className="d-flex pl-3">
            {listProjectDetail?.members?.map((item, index) => {
              return <Avatar src={item.avatar} />;
            })}
            <button onClick={() => setModal1Open(true)}>
              <Avatar>+</Avatar>
            </button>
            <Modal
              width={900}
              title={title}
              open={modal1Open}
              onOk={() => setModal1Open(false)}
              onCancel={() => setModal1Open(false)}
              footer={null}
            >
              <div className="row">
                <div className="col-6">
                  <div className="d-flex align-items-center justify-content-around pb-3">
                    <span className="ant-typography">Search user</span>
                    <div style={{ maxWidth: 300 }}>
                      {" "}
                      <Input
                        type="text"
                        placeholder="Search"
                        value={keyWord}
                        onChange={(event) => {
                          let { value } = event.target;
                          setSearchParams({ keyWord: value });
                        }}
                      />
                    </div>
                  </div>
                  <h4>Not yet added</h4>
                  <div
                    id="scrollableDiv"
                    style={{
                      height: 400,
                      overflow: "auto",
                      padding: "0 16px",
                      border: "1px solid rgba(140, 140, 140, 0.35)",
                    }}
                  >
                    <InfiniteScroll
                      dataLength={listUser.length}
                      hasMore={listUser.length < 50}
                      loader={
                        <Skeleton
                          avatar
                          paragraph={{
                            rows: 1,
                          }}
                          active
                        />
                      }
                      endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                      }
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={listUser}
                        renderItem={(item, index) => (
                          <List.Item key={index}>
                            <List.Item.Meta
                              avatar={<Avatar src={item.avatar} />}
                              title={<a>{item.name}</a>}
                              description={`User Id: ${item.userId}`}
                            />
                            <div>
                              <Button
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Double click to add !"
                                type="primary"
                                onClick={() => {
                                  data.projectId = params.id;
                                  data.userId = item.userId;
                                  confirm({
                                    title: "Do you want to asign this user ?",
                                    icon: <ExclamationCircleFilled />,
                                    okText: "Add",
                                    okType: "primary",
                                    cancelType: "primary",
                                    onOk: async () => {
                                      try {
                                        const res = await dispatch(
                                          callAsignUserFromProject(data)
                                        );
                                        if (res.isAsign == true) {
                                          openNotificationAsignUserFromProject();
                                        }
                                        if (res.isUnthor == true) {
                                          errUnthor();
                                        } else {
                                          errUser();
                                        }
                                        await dispatch(
                                          callGetListProjectDetail(params.id)
                                        );
                                      } catch (error) {}
                                    },
                                    onCancel() {},
                                  });
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ height: 42 }}></div>
                  <h4>Already in project</h4>
                  <List
                    dataSource={listProjectDetail.members}
                    renderItem={(item, index) => (
                      <List.Item key={index}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a>{item.name}</a>}
                          description={`User Id: ${item.userId}`}
                        />
                        <div>
                          <button
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Double click to remove !"
                            className="btn bg-red-600 bg-red-700 hover:bg-red-600 focus:bg-red-600 text-white hover:text-white focus:text-white"
                            onClick={() => {
                              let data = {
                                userId: item.userId,
                                projectId: params.id,
                              };
                              confirm({
                                title: "Do you want delete this user ?",
                                icon: <ExclamationCircleFilled />,
                                okText: "Delete",
                                okType: "danger",
                                cancelType: "primary",
                                onOk: async () => {
                                  try {
                                    await dispatch(
                                      callDeleteUserFromProject(data)
                                    );
                                    dispatch(
                                      callGetListProjectDetail(params.id)
                                    );
                                  } catch (error) {}
                                },
                                onCancel() {},
                              });
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      <div className="row row-gap-0">{dataTask()}</div>
    </main>
  );
}
