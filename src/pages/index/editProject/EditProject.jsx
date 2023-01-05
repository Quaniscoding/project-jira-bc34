import React, { useEffect, useState } from "react";
import { callGetProjectCategory } from "../../../redux/reducers/projects/getProjectCategory";
import { callGetListProjectDetail } from "../../../redux/reducers/projects/getProjectDetail";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, notification, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { callUpdateProject } from "../../../redux/reducers/projects/updateProject";
import "./css/main.css";
export default function EditProject() {
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Update project successfully !",
    });
  };
  const err = () => {
    notification["error"]({
      message: "Notification !",
      description: "Update project fail !",
    });
  };
  const [loading, setLoading] = useState(false);
  const params = useParams();
  let dispatch = useDispatch();
  const projectCategogy = useSelector(
    (state) => state.getProjectCategory.projectCategory
  );
  const listProjectDetail = useSelector(
    (state) => state.getProjectDetail.listProjectDetail
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: listProjectDetail.id,
      creator: listProjectDetail.creator?.id,
      projectName: listProjectDetail.projectName,
      description: listProjectDetail.description,
      categoryId: listProjectDetail.projectCategory?.id,
    },
    onSubmit: async (values) => {
      const res = await dispatch(
        callUpdateProject(listProjectDetail.id, values)
      );
      if (res.isUpdate == true) {
        openNotificationSuccess();
      } else {
        err();
      }
    },
  });
  const handleChangeProjectCategogy = (values) => {
    formik.setFieldValue("categoryId", values);
  };
  let timeout = null;
  if (timeout != null) {
    clearTimeout(timeout);
  }
  useEffect(() => {
    setLoading(true);
    timeout = setTimeout(() => {
      setLoading(false);
      dispatch(callGetListProjectDetail(params.id));
      dispatch(callGetProjectCategory);
    }, 1000);
  }, [params.id]);
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
                  <a href="/projectmanagement">Projects/ </a>
                </span>
                <span className="ant-breadcrumb-separator">
                  <a href="">{formik.values.projectName}</a>
                </span>
                <span className="ant-breadcrumb-separator">/ </span>
              </span>
              <span>
                <span className="ant-breadcrumb-link text-black">
                  Project settings
                </span>
              </span>
            </div>
            <Form
              onSubmitCapture={formik.handleSubmit}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item label="Project id">
                <Input
                  disabled
                  name="projectId"
                  value={formik.values.id}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Project name" required>
                <Input
                  name="projectName"
                  value={formik.values.projectName}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item label="Description">
                <TextArea
                  name="description"
                  rows={8}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Category Id">
                <Select
                  name="categoryId"
                  onChange={handleChangeProjectCategogy}
                  defaultValue={listProjectDetail?.projectCategory?.name}
                >
                  {projectCategogy.map((item) => {
                    return (
                      <Select.Option value={item.id}>
                        {item.projectCategoryName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="d-flex">
                <Button type="primary" htmlType="submit">
                  Update project
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      )}
    </>
  );
}
