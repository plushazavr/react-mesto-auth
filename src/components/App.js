import React, {useEffect, useState} from 'react'
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


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = React.useState({
        name: 'TestUser',
        about: 'Test',
        avatar: 'Test avatar',
    });

    useEffect(() => {
        setIsLoading(true);

        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setCurrentUser(userData);
                setCards(cardsData);
            })
            .catch((err) => {
                console.log(`Не удалось получить данные с сервера. ${err}`);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    function handleUpdateUser(data) {
        api.setUserInfo(data)
            .then(res => {
                setCurrentUser(res);
            })
            .then(() => {
                setEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(`${err}`);
            })
    }

    function handleAddPlace(data) {
        api.addUserCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
            .then(() => {
                setAddPlacePopupOpen(false);
            })
            .catch((err) => {
                console.log(`${err}`);
            })
    }

    function handleUpdateAvatar(data) {
        api.updateUserAvatar(data)
            .then(res => {
                setCurrentUser(res);
            })
            .then(() => {
                setEditAvatarPopupOpen(false);
            })
            .catch((err) => {
                console.log(`${err}`);
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
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlacePopupOpen() {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleEditAvatarPopupOpen() {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="container">
                    <Header/>

                    <Main
                        cards={cards}
                        onEditProfile={handleEditProfilePopupOpen}
                        onAddPlace={handleAddPlacePopupOpen}
                        onEditAvatar={handleEditAvatarPopupOpen}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
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
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}
export default App;