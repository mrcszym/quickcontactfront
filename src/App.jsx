import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import StickersList from "./components/StickersList";
import "./Login.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/stickers" element={<StickersList />} />
      </Routes>
    </Router>
  );
}

export default App;
