import { Button, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import "./css/main.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callCreateProject } from "../../../redux/reducers/projects/createProject";
import { callGetProjectCategory } from "../../../redux/reducers/projects/getProjectCategory";
export default function CreateProject() {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    let { projectName, description, categoryId, alias } = values;
    console.log(values);
    await dispatch(
      callCreateProject({ projectName, description, categoryId, alias })
    );
  };
  let dispatch = useDispatch();
  const projectCategogy = useSelector(
    (state) => state.getProjectCategory.projectCategory
  );
  console.log(projectCategogy);
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      dispatch(callGetProjectCategory);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <main className="container py-6">
          <div className="mx-auto" style={{ maxWidth: 980 }}>
            <div className="ant-breadcrumb mb-4">
              <span>
                <span className="ant-breadcrumb-link">
                  <a href="/projectmanagement">Projects</a>
                </span>
                <span className="ant-breadcrumb-separator">/ </span>
              </span>
              <span>
                <span className="ant-breadcrumb-link text-black">
                  New project
                </span>
              </span>
            </div>
            <div className="mb-4">
              <h3 className="ant-typography">New project</h3>
            </div>
            <Form
              onFinish={onSubmit}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="projectName"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: "Please input project name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="alias"
                label="Alias"
                rules={[
                  {
                    required: true,
                    message: "Please input alias!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}
              >
                <TextArea rows={8} />
              </Form.Item>
              <Form.Item
                name="categoryId"
                label="Select"
                rules={[
                  {
                    required: true,
                    message: "Please input Category Id!",
                  },
                ]}
              >
                <Select>
                  {projectCategogy.map((item, index) => {
                    return (
                      <Select.Option value={index}>
                        {item.projectCategoryName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="d-flex">
                <Button type="primary" htmlType="submit">
                  Create Project
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      )}
    </>
  );
}
