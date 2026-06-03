import React, { useEffect, useState } from "react";
import {
  getMyReservations,
  cancelReservation,
} from "../../api/reservations";

function MyReservations({ onUseReservation }) {
  const [activeTab, setActiveTab] = useState("예약 예정");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const tabs = ["예약 예정", "사용 중", "지난 예약", "취소된 예약"];

  const statusLabel = {
    waiting: "대기중",
    reserved: "예약됨",
    using: "사용중",
    completed: "완료",
    cancelled: "취소됨",
  };

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getMyReservations();
      setReservations(data);
    } catch (error) {
      console.error("내 예약 목록 조회 실패", error);
      setErrorMessage("예약 내역을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    const confirmed = window.confirm("해당 예약을 취소하시겠습니까?");

    if (!confirmed) {
      return;
    }

    try {
      await cancelReservation(id);
      alert("예약이 취소되었습니다.");
      await fetchReservations();
    } catch (error) {
      console.error("예약 취소 실패", error);
      const message =
        error.response?.data?.message || "예약 취소에 실패했습니다.";
      alert(message);
    }
  };

  const formatDate = (dateTime) => {
    if (!dateTime) {
      return "-";
    }

    const date = new Date(dateTime);

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (startTime, endTime) => {
    if (!startTime || !endTime) {
      return "-";
    }

    const start = new Date(startTime).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const end = new Date(endTime).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${start} - ${end}`;
  };

  const formatSpec = (spec) => {
    if (!spec) {
      return "-";
    }

    if (typeof spec === "string") {
      return spec;
    }

    const details = [
      spec.gpu,
      spec.cpu,
      spec.memory,
      spec.storage,
    ].filter(Boolean);

    if (details.length > 0) {
      return details.join(" / ");
    }

    return spec.description || "-";
  };

  const isReservationAvailableNow = (reservation) => {
    if (reservation.status !== "reserved") {
      return false;
    }

    const now = new Date();
    const startTime = new Date(reservation.start_time);
    const endTime = new Date(reservation.end_time);

    return now >= startTime && now < endTime;
  };

  const getReservationTab = (reservation) => {
    if (reservation.status === "waiting") {
      return "예약 예정";
    }

    if (reservation.status === "reserved") {
      if (isReservationAvailableNow(reservation)) {
        return "사용 중";
      }

      if (new Date() >= new Date(reservation.end_time)) {
        return "지난 예약";
      }

      return "예약 예정";
    }

    if (reservation.status === "using") {
      return "사용 중";
    }

    if (reservation.status === "completed") {
      return "지난 예약";
    }

    if (reservation.status === "cancelled") {
      return "취소된 예약";
    }

    return "예약 예정";
  };

  const canEnterUsageStatus = (reservation) => {
    return (
      reservation.status === "using" ||
      isReservationAvailableNow(reservation)
    );
  };

  const filteredReservations = reservations.filter(
    (reservation) => getReservationTab(reservation) === activeTab
  );

  const getBadgeClassName = (status) => {
    if (status === "waiting") return "status-badge pending";
    if (status === "reserved") return "status-badge reserved";
    if (status === "using") return "status-badge using";
    if (status === "completed") return "status-badge completed";
    if (status === "cancelled") return "status-badge canceled";
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
            {!loading &&
              filteredReservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.resource_id?.name || "-"}</td>
                  <td>{reservation.resource_id?.lab_id || "-"}</td>
                  <td>{formatSpec(reservation.resource_id?.spec)}</td>
                  <td>{formatDate(reservation.start_time)}</td>
                  <td>
                    {formatTime(
                      reservation.start_time,
                      reservation.end_time
                    )}
                  </td>
                  <td>
                    <span className={getBadgeClassName(reservation.status)}>
                      {statusLabel[reservation.status] || reservation.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      {canEnterUsageStatus(reservation) && (
                        <button
                          className="primary-button"
                          onClick={() => onUseReservation(reservation._id)}
                        >
                          실시간 사용
                        </button>
                      )}

                      {(reservation.status === "waiting" ||
                        (reservation.status === "reserved" &&
                          !isReservationAvailableNow(reservation))) && (
                        <button
                          onClick={() => handleCancel(reservation._id)}
                        >
                          취소
                        </button>
                      )}

                      {(reservation.status === "completed" ||
                        reservation.status === "cancelled") && (
                        <button>상세보기</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {loading && (
          <div className="empty-message">
            예약 내역을 불러오는 중입니다.
          </div>
        )}

        {!loading && errorMessage && (
          <div className="empty-message">
            {errorMessage}
          </div>
        )}

        {!loading &&
          !errorMessage &&
          filteredReservations.length === 0 && (
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