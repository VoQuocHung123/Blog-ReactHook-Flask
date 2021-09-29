import React from 'react'
import { Form, Input, Button, Checkbox,Typography } from 'antd';

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

function SignUp() {
  const {Title} = Typography;
    return (
        <div 
        style={{
          background: "rgba(167, 232, 243, 0.979)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          height: "100vh",
        }}     
        >
          <Title level={1} style={{marginBottom:"10vh"}}>ĐĂNG KÝ</Title>
            <Form
      name="basic"
      labelCol={{
        span: 10,
      }}
      wrapperCol={{
        span: 0,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tên Đăng Ký"
        name="username"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập Tên Đăng Ký!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật Khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        name="confirm"
        label="Xác thực mật khẩu" 
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'vui lòng nhập mật khẩu!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('mật khẩu xác thực không chính xác!'));
            },
          }),
        ]}
      >
          <Input.Password />
    </Form.Item>
    <Form.Item
        label="Role"
        name="role"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập role!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Đăng Ký
        </Button>
      </Form.Item>
    </Form>
            
        </div>
    )
}

export default SignUp
