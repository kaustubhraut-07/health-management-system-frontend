import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const DoctorPatientsinfo = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientsData, setPatientsData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setPatientsData(location.state);
    }
  }, [location.state]);

  const columns = [
    {
      title: 'Patient Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Appointment Time',
      dataIndex: 'appoints_data',
      key: 'appointmentTime',
      render: (appoints_data) => appoints_data[0]?.appointment_time || 'N/A',
    },
    {
      title: 'Appointment Date',
      dataIndex: 'appoints_data',
      key: 'appointmentDate',
      render: (appoints_data) => appoints_data[0]?.appointment_day || 'N/A',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => showModal(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const showModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Table dataSource={patientsData} pagination={true} columns={columns} />
      <Modal
        title="Patient Details"
     
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedPatient && (
          <div>
            <Title level={4}>{selectedPatient.name}</Title>
            <Text>Appointment Time: {selectedPatient.appoints_data[0]?.appointment_time || 'N/A'}</Text>
            <br />
            <Text>Appointment Date: {selectedPatient.appoints_data[0]?.appointment_day || 'N/A'}</Text>
            <br />
            <Text>Address: {selectedPatient.address}</Text>
            <br />
            <Text>Consult to Doctor: {selectedPatient.consult_to_doctor}</Text>
            <br />
            <Text>Description: {selectedPatient.description}</Text>
            <br />
            <Text>Email: {selectedPatient.email}</Text>
            <br />
            <Text>Mobile No: {selectedPatient.mobileNo}</Text>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorPatientsinfo;
