// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Jobs from "./pages/JobListPage";
import PageNotFound from "./pages/PageNotFound";
import JobDetailsPage from "./pages/JobDetailPage";
import AdminJobsPage from "./pages/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<Jobs />} />

        <Route path="/jobs/:id" element={<JobDetailsPage />} />

        <Route path="/admin/jobs" element={<AdminJobsPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;