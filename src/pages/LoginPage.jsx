import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Вход</h1>

        <form className="auth-form">
          <input
            className="auth-input"
            type="email"
            placeholder="Эл. почта"
            aria-label="Эл. почта"
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Пароль"
            aria-label="Пароль"
          />

          <button className="auth-button" type="submit">
            Войти
          </button>
        </form>

        <div className="auth-registration">
          <p>Нужно зарегистрироваться?</p>

          <Link to="/register" className="auth-link">
            Регистрируйтесь здесь
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;