import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen, currentUser]);

    const handleNameChange = (evt) => {
        setName(evt.target.value);
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWithForm
            name='edit'
            title='Редактировать профиль'
            buttonText={props.buttonText}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            onClose={props.onClose}
        >
            <input className="popup__input"
                   id='popup-name'
                   maxLength="40" minLength="2"
                   name="name"
                   type="text"
                   placeholder='Имя'
                   required
                   onChange={handleNameChange}
                   value={ name || ''}
            />
            <p className="popup__error" id="popup-name-error"/>
            <input
                    className="popup__input"
                    id='popup-about'
                    maxLength="200" minLength="2"
                    name="about"
                    type="text"
                    placeholder='Описание'
                    required
                    value={ description || ''}
                    onChange={handleDescriptionChange}
            />
            <p className="popup__error" id="popup-about-error"/>
        </PopupWithForm>
    )
}

export default EditProfilePopup;