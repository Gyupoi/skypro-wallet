import { useEffect, useState } from "react";
import { getTransactionsByPeriod } from "../../api/api";

const months = [
  {
    name: "Июль 2024",
    month: 7,
    year: 2024,
    days: [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, null, null, null, null],
    ],
  },
  {
    name: "Август 2024",
    month: 8,
    year: 2024,
    days: [
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, null],
    ],
  },
];

const categoryNames = {
  food: "Еда",
  transport: "Транспорт",
  housing: "Жилье",
  joy: "Развлечения",
  education: "Образование",
  others: "Другое",
};

const categoryColors = {
  food: "#D9B6FF",
  transport: "#FFB53D",
  housing: "#6EE4FE",
  joy: "#B0AEFF",
  education: "#BCEC30",
  others: "#FFB9B8",
};

const categories = [
  "food",
  "transport",
  "housing",
  "joy",
  "education",
  "others",
];

function formatSum(sum) {
  return `${Number(sum).toLocaleString("ru-RU")} ₽`;
}

function getDateValue(day, month, year) {
  return new Date(year, month - 1, day).getTime();
}

function prepareDate(day, month, year) {
  return `${month}-${day}-${year}`;
}

function formatSelectedPeriod(start, end) {
  if (!start || !end) {
    return "";
  }

  if (
    start.day === end.day &&
    start.month === end.month &&
    start.year === end.year
  ) {
    return `${start.day} ${
      months.find((month) => month.month === start.month)?.name.split(" ")[0]
    } ${start.year}`;
  }

  const startMonth = months
    .find((month) => month.month === start.month)
    ?.name.split(" ")[0];

  const endMonth = months
    .find((month) => month.month === end.month)
    ?.name.split(" ")[0];

  if (start.year === end.year && start.month === end.month) {
    return `${start.day}–${end.day} ${startMonth} ${start.year}`;
  }

  return `${start.day} ${startMonth} – ${end.day} ${endMonth} ${end.year}`;
}

function AnalyticsPage() {
  const [periodStart, setPeriodStart] = useState({
    day: 10,
    month: 7,
    year: 2024,
  });

  const [periodEnd, setPeriodEnd] = useState({
    day: 10,
    month: 7,
    year: 2024,
  });

  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setIsLoading(true);

        const start = prepareDate(
          periodStart.day,
          periodStart.month,
          periodStart.year,
        );

        const end = prepareDate(periodEnd.day, periodEnd.month, periodEnd.year);

        const data = await getTransactionsByPeriod(start, end);

        setExpenses(
          Array.isArray(data) ? data : data.transactions || data.data || [],
        );
      } catch (error) {
        console.error("Ошибка загрузки расходов за период:", error);

        setExpenses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadExpenses();
  }, [periodStart, periodEnd]);

  const categoryTotals = categories.map((category) => {
    const total = expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + Number(expense.sum || 0), 0);

    return {
      category,
      value: total,
    };
  });

  const total = categoryTotals.reduce((sum, item) => sum + item.value, 0);

  const maxValue = Math.max(...categoryTotals.map((item) => item.value), 1);

  const handleDateSelect = (day, month, year) => {
    const selectedDate = {
      day,
      month,
      year,
    };

    const selectedValue = getDateValue(day, month, year);
    const startValue = getDateValue(
      periodStart.day,
      periodStart.month,
      periodStart.year,
    );

    const endValue = getDateValue(
      periodEnd.day,
      periodEnd.month,
      periodEnd.year,
    );

    if (periodStart && periodEnd && startValue === endValue) {
      if (selectedValue < startValue) {
        setPeriodStart(selectedDate);
        setPeriodEnd(periodStart);
      } else {
        setPeriodEnd(selectedDate);
      }

      return;
    }

    setPeriodStart(selectedDate);
    setPeriodEnd(selectedDate);
  };

  const startValue = getDateValue(
    periodStart.day,
    periodStart.month,
    periodStart.year,
  );

  const endValue = getDateValue(periodEnd.day, periodEnd.month, periodEnd.year);

  return (
    <main className="analytics-page">
      <div className="analytics-container">
        <h1 className="analytics-title">Анализ расходов</h1>

        <div className="analytics-layout">
          <section className="period-card">
            <h2 className="analytics-card-title">Период</h2>

            <div className="weekdays">
              <span>пн</span>
              <span>вт</span>
              <span>ср</span>
              <span>чт</span>
              <span>пт</span>
              <span>сб</span>
              <span>вс</span>
            </div>

            <div className="calendar">
              {months.map((month) => (
                <div className="calendar-month" key={month.name}>
                  <h3>{month.name}</h3>

                  <div className="calendar-grid">
                    {month.days.map((week, weekIndex) =>
                      week.map((day, dayIndex) => {
                        if (day === null) {
                          return (
                            <span
                              className="calendar-day-empty"
                              key={`${month.name}-${weekIndex}-${dayIndex}`}
                            />
                          );
                        }

                        const currentValue = getDateValue(
                          day,
                          month.month,
                          month.year,
                        );

                        const isStart = currentValue === startValue;

                        const isEnd = currentValue === endValue;

                        const isInRange =
                          currentValue >= startValue &&
                          currentValue <= endValue;

                        return (
                          <button
                            className={`calendar-day ${
                              isInRange ? "selected" : ""
                            } ${isStart ? "range-start" : ""} ${
                              isEnd ? "range-end" : ""
                            }`}
                            type="button"
                            key={`${month.name}-${weekIndex}-${dayIndex}`}
                            onClick={() =>
                              handleDateSelect(day, month.month, month.year)
                            }
                          >
                            {day}
                          </button>
                        );
                      }),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="chart-card">
            <div className="chart-total">
              {isLoading ? "Загрузка..." : formatSum(total)}
            </div>

            <div className="chart-subtitle">
              Расходы за{" "}
              <strong>{formatSelectedPeriod(periodStart, periodEnd)}</strong>
            </div>

            <div className="chart">
              {categoryTotals.map((item) => {
                const height =
                  item.value === 0
                    ? 4
                    : Math.max(4, Math.round((item.value / maxValue) * 380));

                return (
                  <div className="chart-item" key={item.category}>
                    <div className="chart-value">{formatSum(item.value)}</div>

                    <div
                      className="chart-bar"
                      style={{
                        height: `${height}px`,
                        backgroundColor: categoryColors[item.category],
                      }}
                    ></div>

                    <div className="chart-category">
                      {categoryNames[item.category]}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default AnalyticsPage;
