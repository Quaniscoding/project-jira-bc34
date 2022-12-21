import { Button, Form, Input, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { callGetListUser } from "../../../redux/reducers/users/getUser";
import { useFormik } from "formik";
export default function User() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  let dispatch = useDispatch();
  const listUser = useSelector((state) => state.getUser.listUser);
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    timeout = setTimeout(() => {
      dispatch(callGetListUser(" "));
    }, 1000);
  });
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "User ID",
      dataIndex: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data = listUser.map((item, index) => {
    return {
      no: index,
      name: item.name,
      id: item.userId,
      email: item.email,
      phoneNumber: item.phoneNumber,
      action: [
        <div className="d-flex algin-content-center">
          <div>
            <span style={{ color: "#5bc0de" }} onClick={() => {}}>
              <EditOutlined
                onClick={() => {
                  listUser?.map((item, index) => {
                    console.log(item[index].userId);
                  });
                }}
                type="button"
                data-toggle="modal"
                data-target="#basicExampleModal"
              />
            </span>
            <div
              className="modal fade"
              id="basicExampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit User
                    </h5>
                  </div>
                  <div className="modal-body">
                    <Form
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={onsubmit}
                      className="d-flex flex-column"
                    >
                      <Form.Item name="userId" label="Id" required>
                        <Input placeholder="Id" disabled />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please input your email !",
                          },
                          {
                            type: "email",
                          },
                        ]}
                        required
                      >
                        <Input placeholder="Email" />
                      </Form.Item>
                      <Form.Item
                        name="name"
                        label="Name"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please input your name!",
                          },
                        ]}
                      >
                        <Input placeholder="Name" />
                      </Form.Item>
                      <Form.Item
                        name="phoneNumber"
                        label="Phone number"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please input your phone number!",
                          },
                          {
                            type: "string",
                            min: 10,
                            max: 10,
                          },
                        ]}
                      >
                        <Input placeholder="Phone number" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        label="Password"
                        required
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                          {
                            type: "string",
                            min: 0,
                            max: 10,
                          },
                        ]}
                      >
                        <Input type="password" placeholder="Password" />
                      </Form.Item>
                      <div className="mb-0 text-right d-flex justify-content-end">
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Update
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button type="ghost" data-dismiss="modal">
                            Cancel
                          </Button>
                        </Form.Item>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-3">
            <span
              style={{ color: "red" }}
              onClick={() => {
                if (
                  window.confirm(
                    `Do you want to delete user : ${listUser[index].name} `
                  )
                ) {
                  // dispatch(callDeleteProject(item.id));
                }
              }}
            >
              <DeleteOutlined />
            </span>
          </div>
        </div>,
      ],
    };
  });
  const onChange = (pagination, filters, sorter, extra) => {};
  return (
    <main className="container py-6 fs-14">
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </main>
  );
}
