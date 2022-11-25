import React from "react";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../utils/constant";
import { getStringLocal } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { callSignUp } from "../../redux/reducers/users/userSignUp";
export default function SignUp() {
  let navigate = useNavigate();
  let isLogin = getStringLocal(USER_LOGIN);
  let dispatch = useDispatch();
  const onSubmit = async (values) => {
    let { email, passWord, name, phoneNumber } = values;
    await dispatch(callSignUp({ email, passWord, name, phoneNumber }));
  };
  return (
    <div className="signup pt-5">
      <div className="form">
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
            <Input.Password placeholder="Mật khẩu" />
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
                navigate("/login");
              }}
              className="fw-bolder text-black"
            >
              Đăng nhập
            </a>
          </span>
        </Form>
      </div>
    </div>
  );
}
