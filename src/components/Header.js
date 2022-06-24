import { useState, useEffect } from 'react'
import logoPath from "../images/logo.svg";
import {Link, Route, useLocation, Switch} from "react-router-dom";

function Header({ userEmail, onSignOut, onMobileMenuClick }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleMobileMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onMobileMenuClick();
  };

  return (
    <header className="header">
      <a href="#">
        <img alt="Логотип" className="header__logo" src={logoPath}/>
      </a>
      <Switch>
        <Route path='/sign-in'>
            <Link className="header__link"
                  to="/sign-up">
                Регистрация
            </Link>
        </Route>
        <Route path='/sign-up'>
            <Link className="header__link"
                  to="/sign-in">
                Войти
            </Link>
        </Route>
        <Route path='/'>
          <div className="header__user-info">
              <p className="header__email">{userEmail}</p>
              <button onClick={onSignOut} className="button_type_exit" type="button">
                  Выйти
              </button>
          </div>
          <nav className="burger">
            <button
              onClick={handleMobileMenuClick}
              className={`button burger__button ${
                isMenuOpen && 'burger__button_active'
              }`}>            
            </button>
          </nav>
        </Route>
      </Switch>
      
    </header>
  );
}

export default Header;