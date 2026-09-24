import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";

function LoginPage() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setHasError(false);

    const trimmedLogin = login.trim();

    if (!trimmedLogin || !password.trim()) {
      setHasError(true);
      return;
    }

    try {
      setIsLoading(true);

      const data = await loginUser({
        login: trimmedLogin,
        password,
      });

      localStorage.setItem("token", data.user.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/expenses", { replace: true });
    } catch (error) {
      console.error("Ошибка входа:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="auth-title">Вход</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            {isLoading ? "Входим..." : "Войти"}
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