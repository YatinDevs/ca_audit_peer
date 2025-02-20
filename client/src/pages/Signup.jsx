import { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Signup = () => {
  const [formData, setFormData] = useState({});
  const signup = useAuthStore((state) => state.signup);
  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    const response = await signup(formData);
    console.log(response);
    if (response.success) navigate("/dashboard");
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Username"
        name="username" // Make sure it's "username" and not "name"
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input onChange={(e) => handleChange("username", e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input onChange={(e) => handleChange("email", e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please select a role" }]}
      >
        <Select onChange={(value) => handleChange("role", value)}>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
          <Option value="superadmin">Superadmin</Option>
          <Option value="peer">Peer</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>

      <div>
        <a href="/login">Already Have an Account?</a>
      </div>
    </Form>
  );
};

export default Signup;
