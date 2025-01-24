import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientsLogin = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    email: '',
    address: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    try{
        const res = await axios.post('http://127.0.0.1:8000/patients', formData);

        console.log(res.data);
        if(res.status === 200){
          navigate('/patients-appointment', {state : res.data});
        }
    }catch(e){
        console.log(e);
        

    }

    
  };

  return (
    <div>
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile No:</label>
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientsLogin;
