 import { BrowserRouter  } from 'react-router-dom';
import AdminMenuComp from './Components/admin/pages/Dashboard/adminMenu.js';
import MenuComp from './Components/menu.jsx';

function App() {
  return (
    <div   dir="rtl" style={{backgroundColor:"#f2f2f2",}} >
      <BrowserRouter>
      <MenuComp/>
      {/* <AdminMenuComp/> */}
      </BrowserRouter>
      <br/>
    </div>
  );
}

export default App;
