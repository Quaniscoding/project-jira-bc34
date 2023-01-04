import React from "react";
import { useDispatch } from "react-redux";
import "./css/authMain.css";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, notification } from "antd";
import { callLogin } from "../../redux/reducers/auth/userLogin";

export default function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      let { email, passWord } = values;
      const result = await dispatch(callLogin({ email, passWord }));
      if (result.isError == true) {
        openNotificationFail();
      }
      if (result.isLogin == true) {
        openNotificationSuccess();
      }
    } catch (error) {}
  };
  const openNotificationSuccess = () => {
    notification["success"]({
      message: "Notification !",
      description: "Login success!",
    });
  };
  const openNotificationFail = () => {
    notification["error"]({
      message: "Notification !",
      description: "Your email or password is incorrect !",
    });
  };
  return (
    <section className="vh-100 pt-5">
      <div className="container-fluid h-custom content">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-6 ">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4">
            <Form
              id="formLogin"
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              autoComplete="on"
            >
              <span
                id="login"
                style={{
                  fontSize: "40px",
                  color: "#4b6cb7",
                  marginBottom: "25px",
                  display: "block",
                }}
              >
                Log in
              </span>
              <div>
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
                  <Input placeholder="Email" />
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
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
                <span>
                  Or{" "}
                  <a
                    onClick={() => {
                      navigate("/signup");
                    }}
                    className="fw-bolder text-black"
                  >
                    Sign up now ?
                  </a>
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="bottom d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2022. All rights reserved.
        </div>
      </div>
    </section>
  );
}
