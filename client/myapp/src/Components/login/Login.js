import React , { useState } from 'react';
import { Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import { Alert ,Button,Navbar,Nav }from 'react-bootstrap/';
import axios from 'axios';
import './Login.css';
 
 

async function loginUser(credentials) {

    try
    {
      let resp = await axios.post("http://localhost:8000/api/users/login",credentials)
       
      return resp.data
      
    }
    catch
    {
      return { token : '' , fullname : ''}
      
    }
  }


 




export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [ showAlert , setShowAlert] = useState(false);



  const handleSubmit = async e => {
    e.preventDefault();



    const data = await loginUser({
      username ,
      password 
    });
    setToken(data);
    if(!data.name)
    {
      setShowAlert(true)
    }
    sessionStorage['name'] = data.name
  }
  if (showAlert) {
    return (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Login Failed !</Alert.Heading>
        <p>
          Your username or password was invalid
        </p>
        <Button onClick={() => setShowAlert(false)} variant="outline-dark">Try agin</Button>
      </Alert>
    );
  }
  return(
    <div className="login-wrapper">
  <div   >

     
<Navbar bg="dark" variant="dark" fixed="top" >
  <Link to="/"> <Navbar.Brand >Movies - Subscriptions</Navbar.Brand></Link>
  <Nav className="mr-auto">
  <Link to="/"> <Button variant="dark">Home</Button></Link>
  <Link to="/subscriptions"> <Button variant="dark">Subscriptions</Button></Link>
    
  </Nav>
  <Navbar.Collapse className="justify-content-end">
    
  <Navbar.Text>
    Signed in as:  {sessionStorage['name']  } &nbsp;&nbsp;
  </Navbar.Text>  
 </Navbar.Collapse>

</Navbar>

 
</div  > 
    <div style= {{marginTop : '10em'}} >

    
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password"  onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <Button type="submit" variant="outline-info" >Submit</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}