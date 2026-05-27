import React from "react";

function ReservationApply({ onMovePage }) {
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
            <select>
              <option>Server-A-01 / GPU Server / RTX 4090 / 64GB</option>
              <option>Server-A-02 / CPU Server / Xeon Gold / 128GB</option>
              <option>Storage-01 / NAS / 10TB Raid-5</option>
              <option>Server 2</option>
              <option>AI Server</option>
              <option>Docker Lab</option>
            </select>
          </div>

          <div className="form-group">
            <label>날짜</label>
            <input type="date" defaultValue="2025-05-20" />
          </div>

          <div className="form-group">
            <label>시작 시간</label>
            <select>
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
            <select>
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
            <textarea placeholder="사용 목적을 입력하세요." defaultValue="AI 모델 학습 실습" />
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-button" onClick={() => onMovePage("weekly")}>
            취소
          </button>
          <button
            className="primary-button"
            onClick={() => {
                alert("예약 신청이 완료되었습니다.");
                onMovePage("reservations");
                }}
                >
                    예약 신청
                </button>
        </div>
      </section>
    </>
  );
}

export default ReservationApply;