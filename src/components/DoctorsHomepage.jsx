import React, { useEffect, useState } from 'react';
import { Layout, Menu, Card, Statistic, Button } from 'antd';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header, Content, Sider } = Layout;

const DoctorsHomepage = () => {
const [patientsDetails , setPatientsDetails] = useState([]);
  const navigate = useNavigate()

  const handleViewPPatients = () => {
    navigate('/doctor-patientsinfo' , {state : patientsDetails})
  }

  const featchPatientsDetails = () => {
    axios.get('http://127.0.0.1:8000/patients')
      .then(response => {
        console.log(response.data);
        setPatientsDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }
useEffect(() => {
  featchPatientsDetails();
}, []);


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            Patients
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div style={{ float: 'right', marginRight: '20px' }}>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Card title="Appointments Overview">
              <Statistic title="Number of Patients" value={patientsDetails.length} />
            </Card>
            <Button onClick={handleViewPPatients}>
              View Patients Info
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DoctorsHomepage;
