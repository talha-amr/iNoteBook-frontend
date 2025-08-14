import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/NoteState'; 
import LoginPage from './components/LoginPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import SignupPage from './components/SignupPage';
import Welcome from './components/Welcome';
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/Dashboard" element={
    <NoteState>
      <Home />
    </NoteState>
  } />
        <Route exact path="/About" element={ <NoteState><About/></NoteState>} /> 
        <Route exact path="/" element={<Welcome/>} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route exact path="/signup" element={<SignupPage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
