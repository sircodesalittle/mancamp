import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/signin";
import Home from "./pages/home";
import Registration from "./pages/registration";
import { AuthProvider, useAuth } from "./AuthContext";
import { Header } from "./components/Header";
import { WhiteWaterForm } from "./pages/whitewaterform";
import { Pay } from "./pages/pay";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="container">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/whitewater" element={<WhiteWaterForm />} />
                <Route path="/pay" element={<Pay />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
