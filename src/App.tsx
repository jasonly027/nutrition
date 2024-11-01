import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginComponent from './Login'
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <section>                              
            <Routes> 
              <Route path="/" element={<LoginComponent/>}/>                                                         
              <Route path="/login" element={<LoginComponent/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App
