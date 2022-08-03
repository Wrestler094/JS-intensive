import {Link} from "react-router-dom";

function Header() {
    const authData = JSON.parse(localStorage.getItem('auth'));
    const isCompany = authData.data.isCompany;

    function handleLogout() {
        localStorage.setItem('auth', null);
        window.location.href = `/`;
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center pt-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="h1">BV</span>
                </Link>

                {isCompany &&
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link to="/vacancies" className="nav-link" aria-current="page">All vacancies</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/active-vacancies" className="nav-link">Active vacancies</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/create-vacancy" className="nav-link">Create vacancy</Link>
                        </li>
                    </ul>
                }

                {!isCompany &&
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link to="/vacancies" className="nav-link" aria-current="page">All vacancies</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/my-vacancies" className="nav-link">My vacancies</Link>
                        </li>
                    </ul>
                }

                <p className="btn btn-outline-primary" onClick={handleLogout}>Logout</p>
            </header>
        </div>
    );
}

export default Header;
