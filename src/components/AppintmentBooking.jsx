import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, Row, Col } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const { Option } = Select;

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const[doctorsList , setDoctorsList] = useState([]);

  const locationdata = useLocation();
  console.log(locationdata.state , "location data");

  const [formData, setFormData] = useState({
    appoinment_time: '',
    appoinment_day: '',
    appoinment_status: '',
    doctos_id: '',
    patient_id: locationdata.state.id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  useEffect(() => {
    // Fetch the list of doctors from the API
    axios.get('https://your-api-endpoint/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  const onFinish = async(values) => {
    console.log('Received values:', values);
    const dataa = {...values , patient_id : locationdata.state.id}
      try{
        const res = await axios.post('http://127.0.0.1:8000/patients/bookappointment',dataa);
        console.log(res.data);
      }catch(error){

        console.log(error)

      }
  };

  const handleAppointmentBooking = async()=>{
    try{
      console.log(FormData);
      const response = await axios.post('http://127.0.0.1:8000/patients/bookappointment',{
        ...FormData
      });
    }catch(e){
      console.log(e);
    }
  };
  

  const handleGetAllDoctors = async() => {
    try{
      const res = await axios.get('http://127.0.0.1:8000/doctors');
      console.log(res.data);
      setDoctorsList(res.data);
    }catch(e){
      console.log(e) ;

    }
  };

  useEffect(()=>{            
    handleGetAllDoctors();
  } , [])

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  

  return (
    <div style={{ padding: '10rem', background: '#fff' }}>
      <Form
        name="appointment_booking"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ appointment_status: 'pending' }}
      >
        <Form.Item
          label="Appointment Day"
          name="appointment_day"
          rules={[{ required: true, message: 'Please select the appointment day!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Appointment Time"
          name="appointment_time"
          rules={[{ required: true, message: 'Please select the appointment time!' }]}
        >
          <TimePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Appointment Status"
          name="appointment_status"
          rules={[{ required: true, message: 'Please select the appointment status!' }]}
        >
          <Select style={{ width: '100%' }}>
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Doctor"
          name="doctor_id"
          rules={[{ required: true, message: 'Please select a doctor!' }]}
        >
          <Select defaultValue={"Select"} style={{ width: '100%' }}>
            {doctorsList?.map(doctor => (
              <Option  key={doctor._id} value={doctor._id}>
                {doctor.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

      
<Form.Item label="Upload File" name="file">
        <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
     Upload Sigle or multiple reports
    </p>
  </Dragger>
  </Form.Item>
  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Book Appointment
          </Button>
        </Form.Item>

        
      </Form>
    </div>
  );
};

export default AppointmentBooking;
