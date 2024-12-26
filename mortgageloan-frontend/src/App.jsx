import "./App.css";
import Navbarr from "./components/MyNavbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import Home from "./components/Home";
import AddUser from "./components/AddUser";
import AddCreditApplication from "./components/AddCreditApplication";
import CreditApplicationList from "./components/CreditApplicationList";
import CreditApplicationEvaluation from "./components/evaluateCredit/CreditApplicationEvaluation";
import CreditApplicationView from "./components/CreditApplicationView";
import CreditApplicationManagment from "./components/CreditApplicationManagment";
import SimulateCredit from "./components/SimulateCredit";

function App() {
  return (
    <Router>
      <div className="container-fluid" data-bs-theme="dark">
        <Navbarr />
        <div className="content">
          <Routes>
            <Route path="/user/list" element={<UsersList />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/add/:id" element={<AddUser />} />
            <Route
              path="/creditApplication/add"
              element={<AddCreditApplication />}
            />
            <Route
              path="/creditApplication/list"
              element={<CreditApplicationList />}
            />
            <Route
              path="/creditApplication/list/:userRut"
              element={<CreditApplicationList />}
            />
            <Route
              path="/creditApplication/list/:userRut/:id"
              element={<CreditApplicationView />}
            />
            <Route
              path="/creditApplication/managment/:id"
              element={<CreditApplicationManagment />}
            />
            <Route
              path="/creditApplication/simulate"
              element={<SimulateCredit />}
            />
            {/** 
            <Route
              path="/creditApplication/evaluation/:id"
              element={<CreditApplicationEvaluation />}
            />
            */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
