import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Editor from "./pages/Editor.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
    </Routes>
  );
}

export default App;