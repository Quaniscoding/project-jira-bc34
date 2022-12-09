import React, { useEffect, useState } from "react";
import { callGetProjectCategory } from "../../redux/reducers/projects/getProjectCategory";
import { callGetListProjectDetail } from "../../redux/reducers/projects/getProjectDetail";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { callUpdateProject } from "../../redux/reducers/projects/updateProject";

export default function EditProject() {
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
    onSubmit: (values) => {
      dispatch(callUpdateProject(listProjectDetail.id, values));
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
        <div className="row col-8" style={{ paddingLeft: "5%" }}>
          <div className="col-8 d-flex align-items-start flex-column max-w-full">
            <h1>Edit project</h1>
            <div className="col-12">
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
                    options={projectCategogy.map((item) => ({
                      label: item.projectCategoryName,
                      value: item.id,
                    }))}
                  />
                </Form.Item>
                <Form.Item className="d-flex">
                  <Button type="primary" htmlType="submit">
                    Update project
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
