import { useState } from "react";

const weekSchedules = {
  0: [
    {
      dayIndex: 0,
      startTime: "09:00",
      title: "Server-A-01",
      time: "09:00 - 11:00",
      status: "사용 중",
      type: "using",
    },
    {
      dayIndex: 1,
      startTime: "10:00",
      title: "Server-A-03",
      time: "10:00 - 12:00",
      status: "예약됨",
      type: "reserved",
    },
    {
      dayIndex: 2,
      startTime: "13:00",
      title: "Server-A-05",
      time: "13:00 - 15:00",
      status: "사용 중",
      type: "purple",
    },
    {
      dayIndex: 3,
      startTime: "14:00",
      title: "Server-A-02",
      time: "14:00 - 16:00",
      status: "예약됨",
      type: "reserved",
    },
    {
      dayIndex: 4,
      startTime: "15:00",
      title: "Server-A-04",
      time: "15:00 - 17:00",
      status: "예약됨",
      type: "purple",
    },
  ],
  1: [
    {
      dayIndex: 0,
      startTime: "10:00",
      title: "Docker-Node-01",
      time: "10:00 - 12:00",
      status: "예약됨",
      type: "reserved",
    },
    {
      dayIndex: 2,
      startTime: "14:00",
      title:  "Server-A-04",
      time: "14:00 - 16:00",
      status: "사용 중",
      type: "using",
    },
    {
      dayIndex: 4,
      startTime: "09:00",
      title: "Server-A-05",
      time: "09:00 - 11:00",
      status: "예약됨",
      type: "purple",
    },
  ],
  "-1": [
    {
      dayIndex: 1,
      startTime: "09:00",
      title: "Server-A-01",
      time: "09:00 - 11:00",
      status: "완료",
      type: "gray",
    },
    {
      dayIndex: 3,
      startTime: "13:00",
      title: "Docker-Node-01",
      time: "13:00 - 15:00",
      status: "완료",
      type: "gray",
    },
  ],
};

function WeeklyReservation({ onMovePage }) {
  const [weekOffset, setWeekOffset] = useState(0);

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const baseDate = new Date(2025, 4, 19);
  const currentMonday = new Date(baseDate);
  currentMonday.setDate(baseDate.getDate() + weekOffset * 7);

  const weekDays = ["월", "화", "수", "목", "금"].map((dayName, index) => {
    const date = new Date(currentMonday);
    date.setDate(currentMonday.getDate() + index);

    return {
      label: `${dayName} ${date.getMonth() + 1}/${date.getDate()}`,
      month: date.getMonth() + 1,
      date: date.getDate(),
      dayIndex: index,
    };
  });

  const startMonth = weekDays[0].month;
  const startDate = weekDays[0].date;
  const endMonth = weekDays[4].month;
  const endDate = weekDays[4].date;

  const schedules = weekSchedules[weekOffset] || [];

  const getBlockClassName = (type) => {
    if (type === "using") return "reservation-block using-block";
    if (type === "reserved") return "reservation-block reserved-block";
    if (type === "purple") return "reservation-block using-purple-block";
    if (type === "gray") return "reservation-block gray-block";

    return "reservation-block";
  };

  const findSchedule = (dayIndex, time) => {
    return schedules.find(
      (schedule) => schedule.dayIndex === dayIndex && schedule.startTime === time
    );
  };

  const handleTodayClick = () => {
    setWeekOffset(0);
  };

  return (
    <>
      <section className="page-header schedule-header">
        <div>
          <h1>주간 예약</h1>
          <p>자원별 예약 현황을 확인하고 원하는 시간대를 선택하세요.</p>
        </div>

        <button className="primary-button" onClick={() => onMovePage("apply")}>
          + 예약 신청
        </button>
      </section>

      <section className="schedule-card">
        <div className="schedule-toolbar">
          <button
            className="week-button"
            onClick={() => setWeekOffset((prev) => prev - 1)}
          >
            ‹
          </button>

          <strong>
            2025년 {startMonth}월 {startDate}일 ~ {endMonth}월 {endDate}일
          </strong>

          <button
            className="week-button"
            onClick={() => setWeekOffset((prev) => prev + 1)}
          >
            ›
          </button>

          <div className="toolbar-actions">
            <button className="sub-button" onClick={handleTodayClick}>
              오늘
            </button>
            <select className="view-select">
              <option>주간</option>
              <option>일간</option>
            </select>
          </div>
        </div>

        <div className="schedule-grid">
          <div className="time-column header-cell"></div>

          {weekDays.map((day) => (
            <div key={day.label} className="day-cell header-cell">
              {day.label}
            </div>
          ))}

          {times.map((time) => (
            <div className="schedule-row" key={time}>
              <div className="time-column">{time}</div>

              {weekDays.map((day) => {
                const schedule = findSchedule(day.dayIndex, time);

                return (
                  <div key={`${day.label}-${time}`} className="schedule-cell">
                    {schedule && (
                      <div className={getBlockClassName(schedule.type)}>
                        <strong>{schedule.title}</strong>
                        <span>{schedule.time}</span>
                        <p>{schedule.status}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="schedule-legend">
          <span>
            <i className="legend-dot using"></i>사용 중
          </span>
          <span>
            <i className="legend-dot reserved"></i>예약됨
          </span>
          <span>
            <i className="legend-dot purple"></i>실습 서버
          </span>
        </div>
      </section>
    </>
  );
}

export default WeeklyReservation;