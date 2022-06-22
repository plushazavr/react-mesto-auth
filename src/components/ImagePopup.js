import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_open-image ${card && 'popup_opened'}`}>
      <figure className="popup__window">
        <button aria-label="Закрыть форму"
                className="button button_type_close"
                type="button"
                onClick={onClose}>
        </button>
        <img alt={card ? card.name: ""}
              className="popup__image"
              src={card ? card.link : ""}/>
        <p className="popup__image-title">{card ? card.name: ""}</p>
      </figure>
    </section>
  )
}

export default ImagePopup;