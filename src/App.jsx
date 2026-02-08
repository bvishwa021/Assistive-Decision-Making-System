import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InputForm from "./pages/InputForm";
import Insights from "./pages/Insights";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/input" element={<InputForm />} />
        <Route path="/insight" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
