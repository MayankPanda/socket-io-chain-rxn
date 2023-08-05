import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TestSocket from "./components/TestSocket";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Use <Route element> syntax to conditionally render based on authentication */}
        {user ? (
          <Route path="/" element={<Main />} />
        ) : (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>
        )}
        <Route path="/connect" element={<TestSocket />} />
      </Routes>
    </Router>
  );
}

export default App;
