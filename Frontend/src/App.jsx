import "./App.css";

import Sidebar from "./components/sidebar/Sidebar.jsx";

import Home from "./pages/Home/home.jsx";
import Processes from "./pages/processes/processes.jsx";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter basename="/monitor">
    <Sidebar />

    <main className="main-content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/processes" element={<Processes />} />
        </Routes>
    </main>
</BrowserRouter>
    );
}

export default App;