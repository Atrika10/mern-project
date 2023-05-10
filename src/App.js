import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './Context/notes/NoteState';
function App() {
  return (
    <> 
    <NoteState> 
      <Router> 
      <Navbar/>
      <div className="container"> 
        <Routes> 
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/" element={<div className="App">
              <h2> Welcome to iNoteBook - get your note from the cloud </h2>
              </div>} />
              
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
