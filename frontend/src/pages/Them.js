import React, { useState, setState, useEffect } from 'react'
import { Menu,Form,Input, Button, Layout} from 'antd';
import axios from "axios";
import { useParams,Link} from 'react-router-dom';
import { UploadOutlined, UserOutlined, HomeOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const postBai = (data) => {
    const url = "http://localhost:5000/api/postbai";
    return axios.post(url, data);
  };

  
function Them() {
    const [file, setFile] = React.useState(""); 
    
   // chuc nang xem anh truoc khi post
   const ImageThumb = ({ image }) => {
    return <img className="image-upload" style={{width:"100px",height:"100px"}}  src={URL.createObjectURL(image)} alt={image.name} />;
  };
  function handleUpload(event) { 
    setFile(event.target.files[0]);
    console.log(event.target.files[0])
  }

  // <input type="file" onChange={handleUpload} />
  //<div >{file && <ImageThumb image={file} />}</div>
  // thuc hien format lai du lieu truoc khi gui len flask
  const onFinish = (fieldsValue) => {
    
    // dinh dang lai filedsValue
    const values = {
       ...fieldsValue,
      
     };
   
     const payload = new FormData(); // chuyen thanh form

     Object.keys(values).forEach((key) => {
       payload.append(key, values[key]);
     }); // bat dau gui vao form payload
     console.log(values)
     alert("Tạo bài thành công");
     postBai(payload); // payload
 
     
    }
    return (
      <div class="container" >
      <Layout style={{ marginTop: 15 }} >
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Trang Chủ
              <Link to="/"></Link>
            </Menu.Item>
             </Menu>
         
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ paddingLeft: 100, margin: '24px 16px 0', fontSize: '30pt', color: 'white', textAlign: 'center', background: 'rgb(100, 165, 238)' }} >Tạo Bài Viết </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Form
        enctype="multipart/form-data"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item label="Ảnh Bài Đăng:" name="hinhanh" wrapperCol={{ 
           sm: { span: 5, offset: 0 },
         }}>
        <Input type="text" />
        </Form.Item>

       <Form.Item label="Tên Tác Giả :" name="author_name" wrapperCol={{
           sm: { span: 5, offset: 0 },
         }}>
         <Input type="text" />
       </Form.Item>

       <Form.Item label="Tiêu Đề :" name="title" wrapperCol={{
           sm: { span: 8, offset: 0 },
         }}>
         <Input />
       </Form.Item>
       

       <Form.Item label="Nội Dung   :" name="body"
         wrapperCol={{
           sm: { span: 11, offset: 0 },
         }}>
       
         <Input. TextArea />
       </Form.Item>
      

       <Form.Item
         wrapperCol={{
           xs: { span: 20, offset: 0 },
           sm: { span: 10, offset: 4 },
         }}
       >
         <Button type="primary" htmlType="submit">
           Submit
         </Button>
       </Form.Item>
     </Form>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: 'rgba(170, 173, 158, 0.938' ,margin: '24px 16px 0'}}    >Ant Design ©2018 Created by HDT</Footer>
        </Layout>
      </Layout>,
    </div>
    )
}

export default Them


