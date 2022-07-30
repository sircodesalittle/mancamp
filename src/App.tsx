import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import Home from "./pages/home";
import Registration from "./pages/registration";
import { AuthProvider } from "./AuthContext";
import { Header } from "./components/Header";
import { WhiteWaterForm } from "./pages/whitewaterform";
import { Pay } from "./pages/pay";
import { Schedule } from "./components/Schedule";
import { PackingList } from "./pages/packing-list";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="container">
            <main className="main-content">
              <Link to="/schedule">
                <button
                  style={{ marginRight: "10px", fontSize: ".5em" }}
                  type="button"
                  className="nes-btn"
                >
                  Schedule
                </button>
              </Link>
              <Link to="/packing-list">
                <button
                  type="button"
                  className="nes-btn "
                  style={{ marginRight: "10px", fontSize: ".5em" }}
                >
                  Packing List
                </button>
              </Link>

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/whitewater" element={<WhiteWaterForm />} />
                <Route path="/pay" element={<Pay />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/packing-list" element={<PackingList />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
