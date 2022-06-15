import React from 'react'

function PopupWithForm(props) {
  
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={props.onClose}
                        className="button button_type_close"
                        type="button"
                        aria-label="Закрыть окно">
                </button>
                <form className="popup__form" name={`${props.name}__form`} onSubmit={props.onSubmit} noValidate>
                    <h3 className="popup__title">{props.title}</h3>
                    <label className="popup__input">
                        {props.children}
                    </label>
                    <button className="button button_type_submit " type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;

