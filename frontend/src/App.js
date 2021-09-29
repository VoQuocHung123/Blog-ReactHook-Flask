import {BrowserRouter as Router, Switch, Route,  Link ,useRouteMatch, useParams,useHistory} from "react-router-dom";
import Trangchu from "./pages/Trangchu"
import BangCapNhat from "./pages/BangCapNhat"
import Login from "./components/user/Login";
import Signup from "./components/user/SignUp"
import Them from "./pages/Them"
import SuaChiTiet from "./pages/SuaChiTiet"
import TrangAdmin  from "./pages/TrangAdmin";
import 'antd/dist/antd.css';

function App() {
  
  return (
    <Router>  
      <Switch>
    
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/them">
          <Them/>
        </Route>
        <Route path="/bangcapnhat/capnhat/:id">
          <SuaChiTiet/>
        </Route>
        <Route path="/bangcapnhat">
          <BangCapNhat/>
        </Route>
        <Route path="/admin">
          <TrangAdmin/>
        </Route>
       
        <Route path="/">
          <Trangchu/>  
        </Route>
      </Switch>
    </Router>
  )
}

export default App;

 
    