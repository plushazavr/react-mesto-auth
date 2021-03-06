import {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  
  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    }

    return (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText='Сохранить'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          className="popup__input"
          id="avatar-link"
          name="avatarLink"
          placeholder="Ссылка на картинку"
          required
          type="url"
          ref={avatarRef}
        />
        <p className='popup__error' id='avatar-link-error'/>
      </PopupWithForm>
    )
}

export default EditAvatarPopup;