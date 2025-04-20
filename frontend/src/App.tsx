import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SignupPage />} path="/signup" />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
