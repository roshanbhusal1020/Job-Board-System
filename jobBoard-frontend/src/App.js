import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Feed from ".com/pages/employee/Feed";

import Feed from "./components/pages/employee/Feed";
import AppliedJobs from "./components/pages/employee/AppliedJobs";
import MyJobs from "./components/pages/employer/MyJobs";
import PostJob from "./components/pages/employer/PostJob";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

export default App;
