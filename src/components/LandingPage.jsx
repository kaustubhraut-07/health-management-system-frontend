import React from 'react';
import { Layout, Button, Row, Col, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AppointmentBooking from './AppintmentBooking';
import {Flex} from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const LandingPage = () => {
  return (
    <>
    <Flex>
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', padding: '0 24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ color: '#001529', margin: 0 }}>
              Health Management System
            </Title>
          </Col>
          <Col>
          <Link to="/patients-login" type='button' style={{ color: '#001529', margin: 0 , paddingRight: '10px'}} >
            {/* <Button type="primary" icon={<UserOutlined />} href="/doctor-login"> */}
              Patients Login
            {/* </Button>/ */}
            </Link>
          <Link to="/doctor-login" type='button' style={{ color: '#001529', margin: 0 }} >
            {/* <Button type="primary" icon={<UserOutlined />} href="/doctor-login"> */}
              Doctor Login
            {/* </Button>/ */}
            </Link>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <img
                src="https://via.placeholder.com/300"
                alt="Placeholder 1"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Col>
            <Col span={8}>
              <img
                src="https://via.placeholder.com/300"
                alt="Placeholder 2"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Col>
            <Col span={8}>
              <img
                src="https://via.placeholder.com/300"
                alt="Placeholder 3"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Col>
          </Row>
        </div>
      
      </Content>
      
      
    </Layout>
    {/* <AppointmentBooking/> */}
    </Flex>
    <Footer style={{ textAlign: 'center', background: '#f0f2f5', padding: '24px 50px' }}>
    Footer
   </Footer>
   </>
  );
};

export default LandingPage;
