 import { BrowserRouter  } from 'react-router-dom';
import AdminMenuComp from './Components/admin/pages/Dashboard/adminMenu.js';
import FooterComp from './Components/footer.jsx';
import MenuComp from './Components/menu.jsx';

function App() {
  return (
    <div   dir="rtl" style={{backgroundColor:"#f2f2f2",}} >
      <BrowserRouter>
      <MenuComp/>
      {/* <AdminMenuComp/> */}
      <FooterComp />
      </BrowserRouter>
      <br/>
    </div>
  );
}

export default App;
