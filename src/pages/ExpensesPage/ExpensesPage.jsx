const expenses = [
  ["Пятерочка", "Еда", "03.07.2024", "3 500 ₽"],
  ["Яндекс Такси", "Транспорт", "03.07.2024", "730 ₽"],
  ["Аптека Вита", "Другое", "03.07.2024", "1 200 ₽"],
  ["Бургер Кинг", "Еда", "03.07.2024", "950 ₽"],
  ["Деливери", "Еда", "02.07.2024", "1 320 ₽"],
  ["Кофейня №1", "Еда", "02.07.2024", "400 ₽"],
  ["Бильярд", "Развлечения", "29.06.2024", "600 ₽"],
  ["Перекресток", "Еда", "29.06.2024", "2 360 ₽"],
  ["Лукойл", "Транспорт", "29.06.2024", "1 000 ₽"],
  ["Летуаль", "Другое", "29.06.2024", "4 300 ₽"],
  ["Яндекс Такси", "Транспорт", "28.06.2024", "320 ₽"],
  ["Перекресток", "Еда", "28.06.2024", "1 360 ₽"],
  ["Деливери", "Еда", "28.06.2024", "2 320 ₽"],
  ["Вкусвилл", "Еда", "27.06.2024", "1 220 ₽"],
  ["Кофейня №1", "Еда", "27.06.2024", "920 ₽"],
  ["Вкусвилл", "Еда", "26.06.2024", "840 ₽"],
  ["Кофейня №1", "Еда", "26.06.2024", "920 ₽"],
];

const categories = [
  { name: "Еда", icon: "food" },
  { name: "Транспорт", icon: "transport" },
  { name: "Жилье", icon: "home" },
  { name: "Развлечения", icon: "entertainment" },
  { name: "Образование", icon: "education" },
  { name: "Другое", icon: "other" },
];

function CategoryIcon({ type }) {
  if (type === "food") {
    return (
      <svg
        className="category-icon"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 10h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8Z"
          fill="currentColor"
        />
        <path
          d="M4 9h16M8 6a4 4 0 0 1 8 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "transport") {
    return (
      <svg
        className="category-icon"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M5 17V9l2-4h10l2 4v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 10h16M7 18v2M17 18v2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="8" cy="15" r="1.5" fill="currentColor" />
        <circle cx="16" cy="15" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === "home") {
    return (
      <svg
        className="category-icon"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z"
          fill="currentColor"
        />
        <path
          d="M9 20v-5h6v5"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "entertainment") {
    return (
      <svg
        className="category-icon"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="m7 4 10 0a2 2 0 0 1 2 2v3a3 3 0 0 0 0 6v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 1 2-2Z"
          fill="currentColor"
        />
        <path
          d="M12 7v10"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
      </svg>
    );
  }

  if (type === "education") {
    return (
      <svg
        className="category-icon"
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="m3 9 9-5 9 5-9 5-9-5Z"
          fill="currentColor"
        />
        <path
          d="M7 11v5c2.7 2.3 7.3 2.3 10 0v-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M21 10v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className="category-icon"
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="4"
        y="6"
        width="16"
        height="13"
        rx="2"
        fill="currentColor"
      />
      <path
        d="M4 10h16"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <path
        d="M8 14h3"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ExpensesPage() {
  return (
    <main className="expenses-page">
      <div className="expenses-container">
        <h1 className="expenses-title">Мои расходы</h1>

        <div className="expenses-layout">
          <section className="expenses-table-card">
            <h2 className="expenses-card-title">
              Таблица расходов
            </h2>

            <div className="expenses-table">
              <div className="expenses-row expenses-row-head">
                <span>Описание</span>
                <span>Категория</span>
                <span>Дата</span>
                <span>Сумма</span>
                <span></span>
              </div>

              {expenses.map((expense, index) => (
                <div
                  className="expenses-row"
                  key={`${expense[0]}-${index}`}
                >
                  <span>{expense[0]}</span>
                  <span>{expense[1]}</span>
                  <span>{expense[2]}</span>
                  <span>{expense[3]}</span>

                  <button
                    className="expense-delete"
                    type="button"
                    aria-label={`Удалить расход ${expense[0]}`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 4h6M5 7h14M10 10v8M14 10v8M7 7l1 13h8l1-13"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="new-expense-card">
            <h2 className="expenses-card-title">
              Новый расход
            </h2>

            <form className="new-expense-form">
              <label
                className="expense-label"
                htmlFor="description"
              >
                Описание
              </label>

              <input
                id="description"
                className="expense-input"
                type="text"
                placeholder="Введите описание"
              />

              <span className="expense-label">
                Категория
              </span>

              <div className="category-list">
                {categories.map((category) => (
                  <button
                    className="category-button"
                    type="button"
                    key={category.name}
                  >
                    <CategoryIcon type={category.icon} />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              <label
                className="expense-label"
                htmlFor="date"
              >
                Дата
              </label>

              <input
                id="date"
                className="expense-input"
                type="text"
                placeholder="Введите дату"
              />

              <label
                className="expense-label"
                htmlFor="amount"
              >
                Сумма
              </label>

              <input
                id="amount"
                className="expense-input"
                type="text"
                placeholder="Введите сумму"
              />

              <button
                className="expense-submit"
                type="submit"
              >
                Добавить новый расход
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ExpensesPage;