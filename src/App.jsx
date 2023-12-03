import { Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing/Landing";
import "./App.css";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
