
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/Approuter';
import './App.css'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App
