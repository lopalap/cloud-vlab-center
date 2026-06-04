import React, { useEffect, useState } from "react";
import { getResources } from "../../api/resources";
import { createReservation } from "../../api/reservations";

function ReservationApply({ onMovePage }) {
  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    resource_id: "",
    date: "",
    start_time: "09:00",
    end_time: "10:00",
    purpose: "",
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoadingResources(true);
        setErrorMessage("");

        const data = await getResources();
        setResources(data);

        if (data.length > 0) {
          setForm((prev) => ({
            ...prev,
            resource_id: data[0]._id,
          }));
        }
      } catch (error) {
        console.error("자원 목록 조회 실패", error);
        setErrorMessage(
          error.response?.data?.message || "자원 목록을 불러오지 못했습니다."
        );
      } finally {
        setLoadingResources(false);
      }
    };

    fetchResources();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatResourceOption = (resource) => {
    const details = [
      resource.spec?.gpu,
      resource.spec?.cpu,
      resource.spec?.memory,
      resource.spec?.storage,
    ].filter(Boolean);

    const specText =
      details.length > 0
        ? details.join(" / ")
        : resource.spec?.description || "사양 정보 없음";

    return `${resource.name} / ${resource.lab_id} / ${specText}`;
  };
  
  const handleSubmit = async () => {
    if (!form.resource_id) {
      setErrorMessage("예약할 자원을 선택해주세요.");
      return;
    }

    if (!form.date) {
      setErrorMessage("예약 날짜를 선택해주세요.");
      return;
    }

    if (!form.purpose.trim()) {
      setErrorMessage("사용 목적을 입력해주세요.");
      return;
    }

    if (form.start_time >= form.end_time) {
      setErrorMessage("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    const startTime = `${form.date}T${form.start_time}:00`;
    const endTime = `${form.date}T${form.end_time}:00`;

    try {
      setSubmitting(true);
      setErrorMessage("");

      await createReservation(
        form.resource_id,
        startTime,
        endTime,
        form.purpose.trim()
      );

      alert("예약 신청이 완료되었습니다.");
      onMovePage("reservations");
    } catch (error) {
      console.error("예약 신청 실패", error);
      setErrorMessage(
        error.response?.data?.message || "예약 신청에 실패했습니다."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <h1>예약 신청</h1>
          <p>사용할 자원과 시간을 선택하여 예약을 신청하세요.</p>
        </div>
      </section>

      <section className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label>자원 선택</label>
            <select
              name="resource_id"
              value={form.resource_id}
              onChange={handleChange}
              disabled={loadingResources || resources.length === 0}
            >
              {loadingResources && (
                <option value="">자원 목록을 불러오는 중입니다.</option>
              )}

              {!loadingResources && resources.length === 0 && (
                <option value="">예약 가능한 자원이 없습니다.</option>
              )}

              {!loadingResources &&
                resources.map((resource) => (
                  <option key={resource._id} value={resource._id}>
                    {formatResourceOption(resource)}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>날짜</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>시작 시간</label>
            <select
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
            >
              <option>09:00</option>
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
              <option>19:00</option>
              <option>20:00</option>
            </select>
          </div>

          <div className="form-group">
            <label>종료 시간</label>
            <select
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
            >
              <option>10:00</option>
              <option>11:00</option>
              <option>12:00</option>
              <option>13:00</option>
              <option>14:00</option>
              <option>15:00</option>
              <option>16:00</option>
              <option>17:00</option>
              <option>18:00</option>
              <option>19:00</option>
              <option>20:00</option>
              <option>21:00</option>
              <option>22:00</option>
            </select>
          </div>

          <div className="form-group full">
            <label>사용 목적</label>
            <textarea
              name="purpose"
              placeholder="사용 목적을 입력하세요."
              value={form.purpose}
              onChange={handleChange}
            />
          </div>
        </div>

        {errorMessage && (
          <p style={{ color: "#dc2626", marginTop: "16px" }}>
            {errorMessage}
          </p>
        )}

        <div className="form-actions">
          <button
            className="cancel-button"
            onClick={() => onMovePage("weekly")}
            disabled={submitting}
          >
            취소
          </button>

          <button
            className="primary-button"
            onClick={handleSubmit}
            disabled={submitting || loadingResources || resources.length === 0}
          >
            {submitting ? "신청 중..." : "예약 신청"}
          </button>
        </div>
      </section>
    </>
  );
}

export default ReservationApply;