import React, { useState, setState, useEffect } from 'react'
import { Menu, Form, Input, Button, Layout, Alert } from 'antd';
import axios from "axios";
import { useParams, Link } from 'react-router-dom';
import { UploadOutlined, UserOutlined, HomeOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';



// truyen post len api 
const { Header, Content, Footer, Sider } = Layout;
function SuaChiTiet() {

  const { id } = useParams();
  // cap nhat gui lai bai viet len server
  const putBai = (data) => {
    const url = "http://localhost:5000/api/postbai/" + id;
    return axios.put(url, data);
  };
  // lay id tu bai viet cua minh tren server hien thi len ket qua 

  const getTheSVAPI = () => {
    const url = "http://localhost:5000/api/postbai/" + id;
    return axios.get(url);
  };

  const [listSV, setListSV] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = React.useState("");
  //--------------------- chuc nang xem anh truoc khi post
  const ImageThumb = ({ image }) => {
    return <img style={{ width: "100px", height: "100px", }} src={URL.createObjectURL(image)} alt={image.name} style={{ width: "100px", height: "100px" }} />;
  };
  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }
  //------------------------------------------ xu lieu so lieu


  //chuyen file thanh string  

  let author_name = JSON.stringify(listSV.map(list => list.author_name));
  author_name = author_name.slice(2, -2)
  let title = JSON.stringify(listSV.map(list => list.title));
  title = title.slice(2, -2)
  let body = JSON.stringify(listSV.map(list => list.body));
  body = body.slice(2, -2)
  let anhnen = JSON.stringify(listSV.map(list => list.hinhanh));
  anhnen = anhnen.slice(2, -2)

  let keyform = JSON.stringify(listSV.map(list => list.id));
  keyform = keyform.slice(1, -1)

  form.setFieldsValue({ author_name: author_name });
  form.setFieldsValue({ title: title });
  form.setFieldsValue({ body: body });
  form.setFieldsValue({ hinhanh: anhnen });
  // xu ly anh tu server gui ve 
  const [state, setState] = useState({ source: null });
  function componentDidMount() {
    axios
      .get(
        'http://localhost:5000/api/anhthe/' + id,
        { responseType: 'arraybuffer' },
      )
      .then(response => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );

        setState({ source: "data:;base64," + base64 });
      });
  }
  // ham lay bai tu api gui ve font end
  async function getSV() {
    try {
      const result = await getTheSVAPI();
      if (result.status === 200) {
        // doc du lieu tu bang data.map
        const datas = result.data.map((item) => ({
          ...item,
          key: item.id,

        }));

        setListSV(datas); // bo du lieu vao listSV

      }
    } catch (e) {
      console.log("Request lỗi: ", e);
    }
  }
  useEffect(() => {
    getSV();
    componentDidMount();

  }, []);
  console.log(listSV);
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
    alert("sửa bài thành công");
    putBai(payload); // payload

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
          <Header className="site-layout-sub-header-background" style={{ paddingLeft: 100, margin: '24px 16px 0', fontSize: '30pt', color: 'white', textAlign: 'center', background: 'rgb(100, 165, 238)' }} >Sửa Bài Viết </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Form

                form={form}
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


                <Form.Item label="Nội Dung :" name="body"
                  wrapperCol={{
                    sm: { span: 11, offset: 0 },
                  }}>

                  <Input.TextArea />
                </Form.Item>


                <Form.Item
                  wrapperCol={{
                    xs: { span: 20, offset: 0 },
                    sm: { span: 10, offset: 4 },
                  }}
                >
                  <Button type="primary" htmlType="submit">Chỉnh Sửa
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: 'rgba(170, 173, 158, 0.938', margin: '24px 16px 0' }}    >Ant Design ©2018 Created by HDT</Footer>
        </Layout>
      </Layout>,
    </div>
  )
}

export default SuaChiTiet
