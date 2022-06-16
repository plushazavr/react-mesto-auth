import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacesPopup(props) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    function handleCardName(event) {
        setName(event.target.value)
    }

    function handleCardLink(event) {
        setLink(event.target.value)
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        props.onAddPlace({
            name: name,
            link: link
        })
    }
    
    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    return (
        <PopupWithForm
            name='add'
            title="Новое место"
            buttonText='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input"
                id='popup-add-name'
                maxLength="40" minLength="2"
                name="name"
                placeholder="Название"
                required
                type="text"
                value={name}
                onChange={handleCardName}
            />
            <p className="popup__error" id="popup-add-name-error"/>
            <input
                className="popup__input"
                id='link'
                maxLength="200" minLength="2"
                name="link"
                placeholder="Ссылка на картинку"
                required
                type="url"
                value={link}
                onChange={handleCardLink}
            />
            <p className="popup__error" id="link-error"/>
        </PopupWithForm>
    )
}

export default AddPlacesPopup;