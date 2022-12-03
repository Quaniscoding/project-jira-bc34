import { Button, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callCreateProject } from "../../redux/reducers/projects/createProject";
import { callGetProjectCategory } from "../../redux/reducers/projects/getProjectCategory";
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
  const navigate = useNavigate();
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
        <div className="row col-8" style={{ paddingLeft: "5%" }}>
          <div className="col-8 d-flex align-items-start flex-column max-w-full">
            <h1>Create project</h1>
            <div className="col-12">
              <Form
                onFinish={onSubmit}
                layout="vertical"
                initialValues={{ remember: true }}
              >
                <Form.Item name="projectName" label="Name">
                  <Input />
                </Form.Item>
                <Form.Item name="alias" label="Alias">
                  <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                  <TextArea rows={8} />
                </Form.Item>
                <Form.Item name="categoryId" label="Select">
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
          </div>
        </div>
      )}
    </>
  );
}
