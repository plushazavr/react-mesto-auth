import React from 'react';

import doneIcon from '../images/done.svg'
import errorIcon from '../images/error.svg'

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_message">
                <img
                    className="popup__icon"
                    src={props.isSuccess ? doneIcon : errorIcon}
                    alt={props.isSuccess ? 'Иконка - "Успешно"' : 'Иконка - "Ошибка"'}
                />
                <p className="popup__message">
                    {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз!'}
                </p>
                <button
                    onClick={props.onClose}
                    className="button button_type_close"
                    type="button"
                    aria-label="Close popup">
                </button>
            </div>
        </div>
    )
}

export default InfoTooltip;