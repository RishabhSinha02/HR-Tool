import "./App.css";
import Process from "./pages/Process/process";
import Login from "./pages/Login/login";
import JdCreation from "./pages/JdCreation/jdCreation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/protectedRoute";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#F9F9F9" }}>
      {/* rounte this process page in process url  */}
      <Router>
        <Routes>
          <Route
            path="/process"
            element={
              <ProtectedRoute>
                <Process />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jd-creation"
            element={
              <ProtectedRoute>
                <JdCreation />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
