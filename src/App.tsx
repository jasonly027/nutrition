import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import LoginComponent from "./Login";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Day } from "./Day";
import NavBar from "./NavBar";
import { ItemsProvider } from "./ItemsProvider";

function App() {
  const [day, setDay] = useState<Date>(new Date());

  return (
    <>
      {/* <Router>
        <div>
          <section>
            <Routes>
              <Route
                path="/"
                element={<LoginComponent />}
              />
              <Route
                path="/login"
                element={<LoginComponent />}
              />
            </Routes>
          </section>
        </div>
      </Router> */}
      <ItemsProvider>
        <Day />
      </ItemsProvider>
    </>
  );
}

export default App;
