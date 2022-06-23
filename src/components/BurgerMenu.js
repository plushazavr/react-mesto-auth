function BurgerMenu({ userEmail, onSignOut }) {
  return (
    <div className="burger-menu">
      <div className="burger-menu__user-info">
        <p className="burger-menu__email">{userEmail}</p>
        <button onClick={onSignOut} className="button_type_exit" type="button">
          Выйти
        </button>
      </div>
    </div>
  );
}

export default BurgerMenu;