import React from "react";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../utils/constant";
import { getStringLocal } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { callLogin } from "../../redux/reducers/users/userLogin";
export default function Login() {
  let navigate = useNavigate();
  let isLogin = getStringLocal(USER_LOGIN);
  let dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      let { email, passWord } = values;
      const result = await dispatch(callLogin({ email, passWord }));
    } catch (error) {}
  };
  return (
    <div className="login">
      <div className="form">
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          autoComplete="on"
        >
          <span id="dangNhap">Đăng nhập</span>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Hãy nhập ô này!",
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
                message: "Hãy nhập ô này!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <span>
            Bạn chưa có tài khoản ?{" "}
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="fw-bolder text-black"
            >
              Đăng ký
            </a>
          </span>
        </Form>
      </div>
    </div>
  );
}
