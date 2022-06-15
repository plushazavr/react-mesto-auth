import React from 'react';

function ImagePopup({card, onClose}) {
    return (
      <section className={`popup popup_type_open-image ${card && 'popup_opened'}`}>
        <div className="popup__window">
          <button type="button" className="button button_type_close" aria-label="Закрыть" onClick={onClose}></button>
          <img className="popup__image" src={card ? card.link : ""} alt={card ? card.name: ""}/>
          <p className="popup__image-title">{card ? card.name: ""}</p>
        </div>
      </section>
    )
}

export default ImagePopup;