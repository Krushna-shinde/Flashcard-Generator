import "./App.css";
import NavBar from "./Componants/NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateFlashCard from "./Componants/CreateFlashCard/CreateFlashCard";
import MyFlashCard from "./Componants/MyFlashCard/MyFlashCard";
import FlashCardDetails from "./Componants/Details/FlashCardDetails";
import TopBar from "./Componants/TopBar/TopBar";

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar/>
        <NavBar />
        <div className=" ml-20 mr-20"> 
        <Routes>
          <Route path="/" element={<CreateFlashCard />}></Route>
          <Route path="/myflashcard" element={<MyFlashCard/>}></Route>
          <Route path="/flashcard-details" element={<FlashCardDetails />}>
          </Route>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
