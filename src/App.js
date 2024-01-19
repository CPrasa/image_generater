import './App.css';
import AboutPage from './components/AboutPage';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"


function App() {
  return (

    <Router>
    <div>
     <Routes>
     <Route path="" exact Component={HomePage} />
     </Routes>
     <Routes>
     <Route path="about" exact Component={AboutPage} />
     </Routes>
  
    </div>

    
    </Router>
    
  );
}

export default App;
