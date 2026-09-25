import { useEffect, useState } from "react";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
} from "../../api/api";

const categories = [
  { name: "Еда", icon: "food", value: "food" },
  { name: "Транспорт", icon: "transport", value: "transport" },
  { name: "Жилье", icon: "home", value: "housing" },
  {
    name: "Развлечения",
    icon: "entertainment",
    value: "joy",
  },
  {
    name: "Образование",
    icon: "education",
    value: "education",
  },
  { name: "Другое", icon: "other", value: "others" },
];

const categoryNames = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое",
};

function formatDate(date) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("ru-RU");
}

function formatSum(sum) {
  return `${Number(sum).toLocaleString("ru-RU")} ₽`;
}

function prepareDate(date) {
  const trimmedDate = date.trim();

  const match = trimmedDate.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);

  if (!match) {
    return null;
  }

  const [, day, month, year] = match;

  return `${Number(month)}-${Number(day)}-${year}`;
}

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
          d="m7 4 10 0a2 2 0 0 1 2 2v3a3 3 0 0 0 0 6v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3a3 3 0 0 0-0-6V6a2 2 0 0 1 2-2Z"
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
        <path d="m3 9 9-5 9 5-9 5-9-5Z" fill="currentColor" />
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
      <rect x="4" y="6" width="16" height="13" rx="2" fill="currentColor" />
      <path d="M4 10h16" stroke="#ffffff" strokeWidth="2" />
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
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");

  const [isCreating, setIsCreating] = useState(false);

  const [errors, setErrors] = useState({
    description: false,
    category: false,
    date: false,
    amount: false,
  });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const data = await getTransactions();

        setExpenses(
          Array.isArray(data) ? data : data.transactions || data.data || [],
        );
      } catch (error) {
        console.error("Ошибка загрузки расходов:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();
    const trimmedDate = date.trim();

    const normalizedAmount = amount.replace(/\s/g, "").replace(",", ".");

    const numericAmount = Number(normalizedAmount);
    const preparedDate = prepareDate(trimmedDate);

    const newErrors = {
      description: trimmedDescription.length < 4,
      category: !selectedCategory,
      date: !preparedDate,
      amount: !Number.isFinite(numericAmount) || numericAmount <= 0,
    };

    setErrors(newErrors);

    const hasValidationErrors = Object.values(newErrors).some(Boolean);

    if (hasValidationErrors) {
      return;
    }

    try {
      setIsCreating(true);

      const updatedExpenses = await createTransaction({
        description: trimmedDescription,
        sum: numericAmount,
        category: selectedCategory,
        date: preparedDate,
      });

      setExpenses(
        Array.isArray(updatedExpenses)
          ? updatedExpenses
          : updatedExpenses.transactions || updatedExpenses.data || [],
      );

      setDescription("");
      setSelectedCategory("");
      setDate("");
      setAmount("");

      setErrors({
        description: false,
        category: false,
        date: false,
        amount: false,
      });
    } catch (error) {
      console.error("Ошибка добавления расхода:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const updatedExpenses = await deleteTransaction(id);

      setExpenses(
        Array.isArray(updatedExpenses)
          ? updatedExpenses
          : updatedExpenses.transactions || updatedExpenses.data || [],
      );
    } catch (error) {
      console.error("Ошибка удаления расхода:", error);
    }
  };

  const isFormInvalid =
    errors.description || errors.category || errors.date || errors.amount;

  return (
    <main className="expenses-page">
      <div className="expenses-container">
        <h1 className="expenses-title">Мои расходы</h1>

        <div className="expenses-layout">
          <section className="expenses-table-card">
            <h2 className="expenses-card-title">Таблица расходов</h2>

            <div className="expenses-table">
              <div className="expenses-row expenses-row-head">
                <span>Описание</span>
                <span>Категория</span>
                <span>Дата</span>
                <span>Сумма</span>
                <span></span>
              </div>

              {isLoading && (
                <div className="expenses-row">
                  <span>Загрузка...</span>
                </div>
              )}

              {hasError && !isLoading && (
                <div className="expenses-row">
                  <span>Не удалось загрузить расходы</span>
                </div>
              )}

              {!isLoading &&
                !hasError &&
                expenses.map((expense) => (
                  <div className="expenses-row" key={expense._id}>
                    <span>{expense.description}</span>

                    <span>
                      {categoryNames[expense.category] || expense.category}
                    </span>

                    <span>{formatDate(expense.date)}</span>

                    <span>{formatSum(expense.sum)}</span>

                    <button
                      className="expense-delete"
                      type="button"
                      aria-label={`Удалить расход ${expense.description}`}
                      onClick={() => handleDelete(expense._id)}
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
            <h2 className="expenses-card-title">Новый расход</h2>

            <form className="new-expense-form" onSubmit={handleSubmit}>
              <label
                className={`expense-label ${
                  errors.description ? "expense-label-error" : ""
                }`}
                htmlFor="description"
              >
                {errors.description ? "Описание *" : "Описание"}
              </label>

              <input
                id="description"
                className={`expense-input ${
                  errors.description ? "expense-input-error" : ""
                }`}
                type="text"
                placeholder={
                  errors.description ? "Введите описание *" : "Введите описание"
                }
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);

                  if (event.target.value.trim().length >= 4) {
                    setErrors((prev) => ({
                      ...prev,
                      description: false,
                    }));
                  }
                }}
              />

              <span
                className={`expense-label ${
                  errors.category ? "expense-label-error" : ""
                }`}
              >
                {errors.category ? "Категория *" : "Категория"}
              </span>

              <div
                className={`category-list ${
                  errors.category ? "category-list-error" : ""
                }`}
              >
                {categories.map((item) => (
                  <button
                    className={`category-button ${
                      selectedCategory === item.value ? "selected" : ""
                    } ${errors.category ? "category-button-error" : ""}`}
                    type="button"
                    key={item.name}
                    onClick={() => {
                      setSelectedCategory(item.value);

                      setErrors((prev) => ({
                        ...prev,
                        category: false,
                      }));
                    }}
                  >
                    <CategoryIcon type={item.icon} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>

              <label
                className={`expense-label ${
                  errors.date ? "expense-label-error" : ""
                }`}
                htmlFor="date"
              >
                {errors.date ? "Дата *" : "Дата"}
              </label>

              <input
                id="date"
                className={`expense-input ${
                  errors.date ? "expense-input-error" : ""
                }`}
                type="text"
                placeholder={errors.date ? "Введите дату *" : "Введите дату"}
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);

                  if (prepareDate(event.target.value)) {
                    setErrors((prev) => ({
                      ...prev,
                      date: false,
                    }));
                  }
                }}
              />

              <label
                className={`expense-label ${
                  errors.amount ? "expense-label-error" : ""
                }`}
                htmlFor="amount"
              >
                {errors.amount ? "Сумма *" : "Сумма"}
              </label>

              <input
                id="amount"
                className={`expense-input ${
                  errors.amount ? "expense-input-error" : ""
                }`}
                type="text"
                placeholder={
                  errors.amount ? "Введите сумму *" : "Введите сумму"
                }
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);

                  const value = Number(
                    event.target.value.replace(/\s/g, "").replace(",", "."),
                  );

                  if (Number.isFinite(value) && value > 0) {
                    setErrors((prev) => ({
                      ...prev,
                      amount: false,
                    }));
                  }
                }}
              />

              <button
                className="expense-submit"
                type="submit"
                disabled={isCreating || isFormInvalid}
              >
                {isCreating ? "Добавляем..." : "Добавить новый расход"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default ExpensesPage;
