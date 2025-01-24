

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Tabs, InputNumber } from 'antd';
import { Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TabPane } = Tabs;

const DoctorLoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);

    if(activeTab === 'login') {
        axios.post('http://127.0.0.1:8000/doctors/doctorlogin', {
            email: values.email,
            password: values.password
            })
            .then((response) => {
              console.log(response.data.access_token);
                sessionStorage.setItem('token', response.data.access_token);
                navigate('/doctor-home');
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    else if(activeTab === 'signup') {
      axios.post('http://127.0.0.1:8000/doctors', {
        name: values.name,
        email: values.email,
        password: values.password,
        mobileNo: values.mobileno,
        address: values.address,
        specility: values.specility,
        experience: values.experience

      })
        .then((response) => {
            
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <TabPane tab="Login" key="login">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
      <TabPane tab="Sign Up" key="signup">
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="MobileNo"
            name="mobileno"
            rules={[{ required: true, message: 'Please input your Mobile No!' }]}
            
          >
            <Input />
          </Form.Item>



          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Specility"
            name="specility"
            rules={[{ required: true, message: 'Please input your specility!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Experience"
            name="experience"
            rules={[{ required: true, message: 'Please input your experience!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </TabPane>
    </Tabs>
  );
};

export default DoctorLoginPage;
