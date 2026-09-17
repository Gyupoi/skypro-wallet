import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Регистрация</h1>

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

          <input
            className="auth-input"
            type="password"
            placeholder="Повторите пароль"
            aria-label="Повторите пароль"
          />

          <button className="auth-button" type="submit">
            Зарегистрироваться
          </button>
        </form>

        <div className="auth-registration">
          <p>Уже есть аккаунт?</p>

          <Link to="/login" className="auth-link">
            Войдите здесь
          </Link>
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;