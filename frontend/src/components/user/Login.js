import React from 'react';
import axios from 'axios';    

import './Login.css'

export default function SignIn() {

  const  [infor, setInfor] = React.useState([]);

  
const apiURL = "http://localhost:5000"

axios
  .get(apiURL)
  .then((response) => {
   
  })
  .catch((error) => {
    console.log(error);     
  });

  // nhan tu flask gui ve duoi dang ma json
const getLogin = async (data) => {
  const url = "http://localhost:5000/api/login";
  return await axios.post(url , data);
}

  const handelSubmit = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("username" , infor["username"])
    formData.append("password" , infor["password"])
    const res = getLogin(formData);
    
    res.then(res =>{
      console.log(res.data);
      if(res.data.status_code === 200){
        alert("Đăng nhập thành công");
        console.log("token = " , res.data.token)
        window.location.href = 'http://localhost:3000/admin'
      }else{
        alert("Đăng nhập không thành công");
      }
    })
 
  }
  

  const handleChange = (e) => {
    e.preventDefault();
    var data = {...infor};
    data[e.target.name] = e.target.value;
    console.log(data)
    setInfor(data);
}

 
  return (
    <div className="container" style={{
      background: "rgba(167, 232, 243, 0.979)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      height: "100vh",
    }}     >
      <h1 className="h3 mb-3 font-weight-normal" style={{textAlign:'center',fontSize:'20pt'}}>ĐĂNG NHẬP</h1>
        <form className="form-signin" style={{paddingLeft:'30px'}}>
          <div className="row">
            <div className="col">
              <input style={{margin:10}}
                type="text"
                name="username"
                onChange={handleChange}
                placeholder="Enter Username"
              />
              <input style={{margin:10}}
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter Password"
              />
              <input onClick={handelSubmit} type="submit" value="Login" style={{margin:10}} />
            </div>
          </div>
        </form>
      </div>
  );
}