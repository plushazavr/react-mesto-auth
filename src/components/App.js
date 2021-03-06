import {useEffect, useState} from 'react'
import './../index.css'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacesPopup from './AddPlacePopup';
import {CurrentUserContext,} from '../contexts/CurrentUserContext';
import api from "../utils/api";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from './Register.js';
import * as auth from '../utils/auth';
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import BurgerMenu from './BurgerMenu';

function App() {

  useEffect(() => {
    checkToken()
  }, [])


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);    
  const [cards, setCards] = useState([]);    
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: 'TestUser',
    about: 'Test',
    avatar: 'Test avatar',
  });    
  const [loggedIn, setLoggedIn] = useState(false);    
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);   
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
            setCurrentUser(userData);
            setCards(cardsData);
        })
        .catch((err) => {
            console.log(`Не удалось получить данные с сервера. ${err}`);
        })
    }
  }, [loggedIn]);

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(res => {
          setCurrentUser(res);
      })
      .then(() => {
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
          console.log(`Ошибка обновления информации о пользователе: ${err}`);
      })
  }

  function handleAddPlace(data) {
    api.addUserCard(data)
      .then((newCard) => {
          setCards([newCard, ...cards]);
      })
      .then(() => {
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
          console.log(`Невозможно опубликовать карту. ${err}`);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateUserAvatar(data)
      .then(res => {
          setCurrentUser(res);
      })
      .then(() => {
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
          console.log(`Ошибка обновления аватара пользователя: ${err}`);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
          console.log(`${err}`);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
          console.log(`${err}`);
      })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleRegister(email, password) {
    auth.register({email, password})
      .then(() => {
        setIsSuccess(true);        
        history.push('/sign-in');
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`Ошибка регистрации. ${err}`);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      })
}

  function handleLogin(email, password) {
    auth.authorize({email, password})
      .then((response) => {
        if (response) {
          setLoggedIn(true)
          localStorage.setItem('jwt', response.token);
          setUserEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(`Невозможно войти. ${err}`);
      })
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push("/sign-in");
    setIsMobileMenuOpen(false);
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      console.log('jwt', jwt)
      auth.checkToken(jwt)
        .then(response => {
          setLoggedIn(true);
          setUserEmail(response.data.email);
          history.push('/')
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        })
    }
  }

  return (
    
    <CurrentUserContext.Provider value={currentUser}>
      <div className={`page ${isMobileMenuOpen && 'page_type_mobile_opened'} ${
        !loggedIn && 'page_type_mobile__hidden'
      }`}>
        <div className="container">
          <BurgerMenu onSignOut={handleSignOut} userEmail={userEmail}/>
          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            onSignOut={handleSignOut}
            onMobileMenuClick={onMobileMenuClick}
          />
          <Switch>
              <ProtectedRoute
                exact path="/"
                loggedIn={loggedIn}
                component={Main}
                cards={cards}
                onEditProfile={handleEditProfilePopupOpen}
                onAddPlace={handleAddPlacePopupOpen}
                onEditAvatar={handleEditAvatarPopupOpen}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Route path="/sign-up">
                <Register
                  onRegister={handleRegister}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  onLogin={handleLogin}
                />
              </Route>
              <Route exact path="*">
                {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
              </Route>
          </Switch>

          <Footer/>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            buttonText='Сохранить'
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            buttonText='Сохранить'
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacesPopup
            onClose={closeAllPopups}
            buttonText='Сохранить'
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlace}
          />

          <PopupWithForm
            onClose={closeAllPopups}
            name="confirm"
            title="Вы уверены?"
            buttonText="Да"
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
