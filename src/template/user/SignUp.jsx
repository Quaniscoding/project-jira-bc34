import React from "react";
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
        openNotificationWithIcon();
      }
    } catch (error) {}
  };
  const openNotificationWithIcon = () => {
    notification["error"]({
      message: "Notification !",
      description: "Email already in use!",
    });
  };
  return (
    <section className="vh-100 pt-5">
      <div className="container-fluid h-custom">
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
              <span id="dangKy">Đăng ký</span>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập email!",
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
                    message: "Hãy nhập mật khẩu!",
                  },
                ]}
              >
                <Input type="password" placeholder="Mật khẩu" />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên của bạn!",
                  },
                ]}
              >
                <Input placeholder="Họ tên" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập số điện thoại của bạn!",
                  },
                ]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng ký
                </Button>
              </Form.Item>
              <span>
                Bạn đã có tài khoản ?{" "}
                <a
                  onClick={() => {
                    navigate("/user/login");
                  }}
                  className="fw-bolder text-black"
                >
                  Đăng nhập
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
