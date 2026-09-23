const months = [
  {
    name: "Июль 2024",
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
    days: [
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, null],
    ],
  },
];

const chartData = [
  {
    category: "Еда",
    value: "3 590 ₽",
    height: 380,
    color: "#D9B6FF",
  },
  {
    category: "Транспорт",
    value: "1 835 ₽",
    height: 196,
    color: "#FFB53D",
  },
  {
    category: "Жилье",
    value: "0 ₽",
    height: 4,
    color: "#6EE4FE",
  },
  {
    category: "Развлечения",
    value: "1 250 ₽",
    height: 128,
    color: "#B0AEFF",
  },
  {
    category: "Образование",
    value: "600 ₽",
    height: 77,
    color: "#BCEC30",
  },
  {
    category: "Другое",
    value: "2 306 ₽",
    height: 250,
    color: "#FFB9B8",
  },
];

function AnalyticsPage() {
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

                        const isSelected =
                          month.name === "Июль 2024" && day === 10;

                        return (
                          <button
                            className={`calendar-day ${
                              isSelected ? "selected" : ""
                            }`}
                            type="button"
                            key={`${month.name}-${weekIndex}-${dayIndex}`}
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
            <div className="chart-total">9 581 ₽</div>

            <div className="chart-subtitle">
              Расходы за <strong>10 июля 2024</strong>
            </div>

            <div className="chart">
              {chartData.map((item) => (
                <div className="chart-item" key={item.category}>
                  <div className="chart-value">{item.value}</div>

                  <div
                    className="chart-bar"
                    style={{
                      height: `${item.height}px`,
                      backgroundColor: item.color,
                    }}
                  ></div>

                  <div className="chart-category">{item.category}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default AnalyticsPage;