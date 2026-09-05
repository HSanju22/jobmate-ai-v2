import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";
import Application from "./pages/Application";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/results" element={<Results />} />
          <Route path="/application" element={<Application />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;