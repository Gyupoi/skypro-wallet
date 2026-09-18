import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <span className="logo-bar logo-bar-1"></span>
            <span className="logo-bar logo-bar-2"></span>
            <span className="logo-bar logo-bar-3"></span>
          </div>

          <span className="logo-text">Skypro.Wallet</span>
        </Link>

        {!isAuthPage && (
          <>
            <nav className="header-nav">
              <NavLink
                to="/expenses"
                className={({ isActive }) =>
                  isActive
                    ? "header-nav-link active"
                    : "header-nav-link"
                }
              >
                Мои расходы
              </NavLink>

              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive
                    ? "header-nav-link active"
                    : "header-nav-link"
                }
              >
                Анализ расходов
              </NavLink>
            </nav>

            <Link to="/login" className="header-logout">
              Выйти
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;