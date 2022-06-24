import {useState} from 'react';

const Login = ({onLogin}) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = inputs
    if (onLogin && email && password) {
      onLogin(email, password)
    }
  }

  return (
    <div className="login">
      <h2 className="login__heading">
        Вход
      </h2>
      <form onSubmit={handleSubmit} className="login__form">
        <input className="login__input"
              id="email"
              required name="email"
              type="email"
              value={inputs.email}
              onChange={handleChange}
              placeholder="Email"
        />
        <p className="login__error" id="email-error"/>
        <input className="login__input"
              id="password"
              required name="password"
              type="password"
              value={inputs.password}
              onChange={handleChange}
              placeholder="Пароль"
        />
        <p className="login__error" id="email-error"/>
        <button type="submit" className="button button_type_submit_auth">
          Войти
        </button>
      </form>
    </div>
  )
}

export default Login;