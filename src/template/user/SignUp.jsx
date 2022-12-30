import React from "react";
import "./css/userMain.css";

import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../utils/constant";
import { getStringLocal } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { callSignUp } from "../../redux/reducers/users/userSignUp";
export default function SignUp() {
  let navigate = useNavigate();
  let isLogin = getStringLocal(USER_LOGIN);
  let dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      let { email, passWord, name, phoneNumber } = values;
      const result = await dispatch(
        callSignUp({ email, passWord, name, phoneNumber })
      );
      if (result.isError == true) {
        openNotificationError();
      }
      if (result.isSignUp == true) {
        openNotificationSuccess();
      }
    } catch (error) {}
  };
  const openNotificationError = () => {
    notification["error"]({
      message: "Notification !",
      description: "Email already in use!",
    });
  };
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Create Success!",
    });
  };
  return (
    <section className=" pt-5" id="formSignUp">
      <div className="container-fluid h-custom content-sign-up">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onSubmit}
              autoComplete="on"
            >
              <span
                id="signup"
                style={{
                  fontSize: "40px",
                  color: "#4b6cb7",
                  marginBottom: "25px",
                  display: "block",
                }}
              >
                Sign up
              </span>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email !",
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input type="email" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="passWord"
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
              <Form.Item
                name="name"
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
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
              <span>
                You have an account ?{" "}
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="fw-bolder text-black"
                >
                  Log in
                </a>
              </span>
            </Form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2022. All rights reserved.
        </div>
      </div>
    </section>
  );
}
