import MainPageComp from './Components/mainPage'
import { BrowserRouter  } from 'react-router-dom';

function App() {
  return (
    <div  >
      <BrowserRouter>
      <MainPageComp/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
