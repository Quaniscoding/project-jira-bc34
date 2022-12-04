import React from "react";
import { SearchOutlined, PlusOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export default function Projectmanagement() {
  let navigate = useNavigate();
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
    getItem("Create task", "1", <PlusOutlined onClick={() => {}} />),
    getItem("Search", "2", <SearchOutlined />),
  ];
  return (
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
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
}
