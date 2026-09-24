import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setHasError(false);

    const trimmedName = name.trim();
    const trimmedLogin = login.trim();

    if (!trimmedName || !trimmedLogin || !password.trim()) {
      setHasError(true);
      return;
    }

    try {
      setIsLoading(true);

      await registerUser({
        login: trimmedLogin,
        name: trimmedName,
        password,
      });

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setHasError(false);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
    setHasError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setHasError(false);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Регистрация</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className={`auth-input ${hasError ? "auth-input-error" : ""}`}
            type="text"
            placeholder={hasError && !name ? "Имя *" : "Имя"}
            aria-label="Имя"
            value={hasError && name ? `${name}*` : name}
            onChange={handleNameChange}
          />

          <input
            className={`auth-input ${hasError ? "auth-input-error" : ""}`}
            type="email"
            placeholder={hasError && !login ? "Эл. почта *" : "Эл. почта"}
            aria-label="Эл. почта"
            value={hasError && login ? `${login}*` : login}
            onChange={handleLoginChange}
          />

          <input
            className={`auth-input ${hasError ? "auth-input-error" : ""}`}
            type="password"
            placeholder={hasError && !password ? "Пароль *" : "Пароль"}
            aria-label="Пароль"
            value={hasError && password ? `${password}*` : password}
            onChange={handlePasswordChange}
          />

          {hasError && (
        <div className="auth-error">
              Упс! Введенные вами данные некорректны. Введите данные корректно и повторите попытку.
            </div>
          )}

          <button
            className="auth-button"
            type="submit"
            disabled={isLoading || hasError}
          >
            {isLoading ? "Регистрируем..." : "Зарегистрироваться"}
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