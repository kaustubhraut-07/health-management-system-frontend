import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker, TimePicker, Button, Row, Col } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const[doctorsList , setDoctorsList] = useState([]);

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
      try{
        const res = await axios.post('http://127.0.0.1:8000/patients/bookappointment',values);
        console.log(res.data);
      }catch(error){

        console.log(error)

      }
  };

  const handleAppointmentBooking = async()=>{
    try{
      const response = await axios.post('http://127.0.0.1:8000/patients/bookappointment',{

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
