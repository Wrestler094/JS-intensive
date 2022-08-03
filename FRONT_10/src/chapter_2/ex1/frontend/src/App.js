import './App.css';
import {Routes, Route, Navigate} from "react-router-dom";
import Login from "./routes/Login/Login";
import Signup from "./routes/Signup/Signup";
import CompanySignup from "./routes/CompanySignup/CompanySignup";
import Vacancies from "./routes/Vacancies/Vacancies";
import Vacancy from "./routes/Vacancy/Vacancy";
import CreateVacancy from "./routes/CreateVacancy/CreateVacancy";
import ActiveVacancies from "./routes/ActiveVacancies/ActiveVacancies";
import MyVacancies from "./routes/MyVacancies/MyVacancies";

function App() {
    let authData = JSON.parse(localStorage.getItem('auth'));
    const isAuthenticate = !!(authData?.data?.id);
    const isCompany = authData?.data?.isCompany;

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={isAuthenticate ? <Navigate replace to="/vacancies"/> : <Navigate replace to="/login"/>}/>
                {/*Auth*/}
                <Route path="login" element={isAuthenticate ? <Navigate replace to="/vacancies"/> : <Login/>}/>
                <Route path="signup" element={isAuthenticate ? <Navigate replace to="/vacancies"/> : <Signup/>}/>
                <Route path="company-signup" element={isAuthenticate ? <Navigate replace to="/vacancies"/> : <CompanySignup/>}/>
                {/*All*/}
                <Route path="vacancies" element={isAuthenticate ? <Vacancies/> : <Navigate replace to="/login"/>} />
                <Route path="vacancies/:id" element={isAuthenticate ? <Vacancy/> : <Navigate replace to="/login"/>} />
                {/*Users*/}
                <Route path="my-vacancies" element={!isCompany ? <MyVacancies/> : isAuthenticate ? <Navigate replace to="/vacancies"/> : <Navigate replace to="/login"/>} />
                {/*Company*/}
                <Route path="active-vacancies" element={isCompany ? <ActiveVacancies /> : isAuthenticate ? <Navigate replace to="/vacancies"/> : <Navigate replace to="/login"/>} />
                <Route path="create-vacancy" element={isCompany ? <CreateVacancy/> : isAuthenticate ? <Navigate replace to="/vacancies"/> : <Navigate replace to="/login"/>} />
                <Route path="*" element={<h1 className={"text-center my-5"}>404</h1>} />
            </Routes>
        </div>
    );
}

export default App;
