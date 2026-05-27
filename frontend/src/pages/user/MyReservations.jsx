import { useState } from "react";

const reservations = [
  {
    id: 1,
    nodeName: "Server-A-02",
    category: "CPU Server",
    spec: "Xeon Gold / 128GB",
    date: "2025-05-19",
    time: "09:00 - 11:00",
    status: "사용중",
    tab: "사용 중",
  },
  {
    id: 2,
    nodeName: "Server-A-01",
    category: "GPU Server",
    spec: "RTX 4090 / 64GB",
    date: "2025-05-20",
    time: "10:00 - 12:00",
    status: "예약됨",
    tab: "예약 예정",
  },
  {
    id: 3,
    nodeName: "Storage-01",
    category: "NAS",
    spec: "10TB Raid-5",
    date: "2025-05-21",
    time: "09:00 - 11:00",
    status: "예약됨",
    tab: "예약 예정",
  },
  {
    id: 6,
    nodeName: "Server-A-03",
    category: "GPU Server",
    spec: "RTX 4080 / 32GB",
    date: "2025-05-22",
    time: "15:00 - 17:00",
    status: "대기중",
    tab: "예약 예정",
  },
  {
    id: 4,
    nodeName: "Server-A-01",
    category: "GPU Server",
    spec: "RTX 4090 / 64GB",
    date: "2025-05-18",
    time: "13:00 - 15:00",
    status: "완료",
    tab: "지난 예약",
  },
  {
    id: 5,
    nodeName: "Server-A-02",
    category: "CPU Server",
    spec: "Xeon Gold / 128GB",
    date: "2025-05-17",
    time: "14:00 - 16:00",
    status: "취소됨",
    tab: "취소된 예약",
  },
];

function MyReservations() {
  const [activeTab, setActiveTab] = useState("예약 예정");

  const tabs = ["예약 예정", "사용 중", "지난 예약", "취소된 예약"];

  const filteredReservations = reservations.filter(
    (reservation) => reservation.tab === activeTab
  );

  const getBadgeClassName = (status) => {
  if (status === "대기중") return "status-badge pending";
  if (status === "예약됨") return "status-badge reserved";
  if (status === "사용중") return "status-badge using";
  if (status === "완료") return "status-badge completed";
  if (status === "취소됨") return "status-badge canceled";
  return "status-badge";
};

  return (
    <>
      <section className="page-header">
        <div>
          <h1>내 예약 현황</h1>
          <p>나의 예약 내역과 현재 사용 상태를 확인하세요.</p>
        </div>
      </section>

      <section className="reservation-card">
        <div className="reservation-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <table className="reservation-table">
          <thead>
            <tr>
              <th>노드 이름</th>
              <th>자원 분류</th>
              <th>스펙</th>
              <th>날짜</th>
              <th>시간</th>
              <th>상태</th>
              <th>작업</th>
            </tr>
          </thead>

          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.nodeName}</td>
                <td>{reservation.category}</td>
                <td>{reservation.spec}</td>
                <td>{reservation.date}</td>
                <td>{reservation.time}</td>
                <td>
                  <span className={getBadgeClassName(reservation.status)}>
                    {reservation.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    {(reservation.status === "예약됨"|| reservation.status === "대기중") && (
                      <>
                        <button>수정</button>
                        <button>취소</button>
                      </>
                    )}

                    {reservation.status !== "예약됨" && reservation.status !== "대기중" && (
                      <button>상세보기</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredReservations.length === 0 && (
          <div className="empty-message">
            해당 상태의 예약 내역이 없습니다.
          </div>
        )}

        <div className="table-footer">
          <button className="page-arrow">‹</button>
          <span>1 / 1</span>
          <button className="page-arrow">›</button>
        </div>
      </section>
    </>
  );
}

export default MyReservations;