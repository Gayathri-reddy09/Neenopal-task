import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import {Button} from '@mui/material';
import { MailOutlined, PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const Card = ({ id, name: initialName, email: initialEmail, phone: initialPhone, website: initialWebsite, onEdit, onDelete }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [website, setWebsite] = useState(initialWebsite);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };
  
  const handleOk = () => {
    if (typeof onEdit === 'function') {
      onEdit(id, {
        name: name,
        email: email,
        phone: phone,
        website: website
      });
    }
      
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    if (typeof onDelete === 'function') {
      onDelete(id);
    }
    setIsDeleted(true);
  };

  if (isDeleted) {
    return null; 
  }

  return (
    <div className='card'>
    <div className="card-body">
      <img src={`https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy${id}`} alt="User" style={{ width:"200px" ,height: '150px',marginLeft:"25px" }} />
      <h2 style={{ color: "grey" }}>{name}</h2>
      <p style={{ color: "grey" }}><MailOutlined /> {email}</p>
      <p style={{ color: "grey" }}><PhoneOutlined />{phone}</p>
      <p style={{ color: "grey" }}><GlobalOutlined />{website}</p>
      </div>
      <hr/>
      <div className="icons">
      <Button style={{ color: "red", borderRight:" 1px solid grey"}} className="heart" onClick={() => setIsLiked(!isLiked)}>
          {isLiked ? <FavoriteIcon color="red" /> : <FavoriteBorderIcon />}
        </Button>

        <span className="edit" style={{borderRight:" 1px solid grey", paddingRight:'50px'}} onClick={handleEditClick}>&#9998;</span>
        <span className="delete" style={{marginRight:"10px"}} onClick={handleDelete}>
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"/>
          </svg>
        </span>
      </div>
      <Modal title="Edit Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical">
          <Form.Item label="Name" required>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Phone" required>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
          <Form.Item label="Website" required>
            <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Card;
