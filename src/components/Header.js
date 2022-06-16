import React from 'react'
import logoPath from "../images/logo.svg";
import {Link, Route} from "react-router-dom";

function Header({loggedIn, userEmail, onSignOut}) {
    return (
      <header className="header">      
        <img className="header__logo" src={logoPath} alt="Логотип"/>

        {!loggedIn ?
                (<nav>
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
                    </nav>
                ) :
                (
                    <div className="header__user-info">
                        <p className="header__email">{userEmail}</p>
                        <button onClick={onSignOut} className="button_type_exit" type="button">
                            Выход
                        </button>
                    </div>
                )
          }
      </header>
    );
}

export default Header;