import React, { useState, useEffect, setState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory } from "react-router-dom";
import { Layout, Menu, Space, List, Avatar } from 'antd';
import { UploadOutlined, UserOutlined, HomeOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import axios from "axios";

const apiURL = "http://localhost:5000"

axios
  .get(apiURL)
  .then((response) => {
    setState(response.message);
  })
  .catch((error) => {
    console.log(error);
  });

// nhan tu flask gui ve duoi dang ma json
const getDataAPI = () => {
  const url = "http://localhost:5000/api/post";
  return axios.get(url);
}




const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


const { Header, Content, Footer, Sider } = Layout;
function TrangAdmin() {
  const history = useHistory();

    // laydu lieu tu flask gui qua
    const [AllPost, setAllPost] = useState([]); 

    // lay du lieu goi ve
    // async await
    async function getPost() {
        try {
          const result =  await getDataAPI();
          if (result.status === 200) {
            // doc du lieu tu bang data.map
            const datas = result.data.map((item) => ({
              ...item,
              key: item.id,
    
            }));
    
            setAllPost(datas); // bo du lieu vao 
    
          }
        } catch (e) {
          console.log("Error: ", e);
        }
      }
      useEffect(() => {
        getPost();
         
      }, []);
     
      console.log(AllPost);
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Trang Chủ
              <Link to="/"></Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              Tạo bài viết
              <Link to="/them"></Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UserOutlined />}>
              Quản lý bài Đăng
              <Link to="/bangcapnhat"></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ paddingLeft: 100, margin: '24px 16px 0', fontSize: '30pt', color: 'white', textAlign: 'center', background: 'rgb(100, 165, 238)' }} >Quản Lý Bài Viết </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 3,
                }}
                dataSource={AllPost}

                renderItem={item => (
                  <List.Item
                    key={item.title}
                    actions={[
                      <IconText icon={StarOutlined} text="" key="list-vertical-star-o" />,
                      <IconText icon={LikeOutlined} text="" key="list-vertical-like-o" />,
                      <IconText icon={MessageOutlined} text="" key="list-vertical-message" />,
                    ]}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src={item.hinhanh}
                        
                      />
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="https://baominh.tech/wp-content/uploads/2020/09/nhan-dan-facebook.png" />}
                      title={<a style={{fontSize:'15pt'}}>{item.author_name}</a>}
                      description={item.title}
                    />
                    {item.body}
                  </List.Item>
                )}
              />,
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: 'rgba(170, 173, 158, 0.938' ,margin: '24px 16px 0'}}>Ant Design ©2018 Created by HDT</Footer>
        </Layout>
      </Layout>,
    </div>
  );
}

export default TrangAdmin


