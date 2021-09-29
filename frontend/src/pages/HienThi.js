import React ,{useState,useEffect,setState}from 'react'
import {BrowserRouter as Router, Switch, Route,  Link , useParams,useHistory} from "react-router-dom";

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

    const getDataAPI = () => {
        const url = "http://localhost:5000/api/post";
        return axios.get(url);
      }
      
    

function HienThi() {
    
    const history = useHistory();

    // doc du lieu tu flask gui qua
    const [listSV, setListSV] = useState([]);

    // lay du lieu goi ve
    async function getSV() {
        try {
          const result = await getDataAPI();
          if (result.status === 200) {
            const datas = result.data.map((item) => ({
              ...item,
              key: item.id,
    
            }));
    
            setListSV(datas);
    
          }
        } catch (e) {
          console.log("Request lỗi: ", e);
        }
      }
      useEffect(() => {
        getSV();
         
      }, []);
     
      console.log(listSV);
    return (
       <div>
           jhiehiehie
        </div>
      );
}

export default HienThi


