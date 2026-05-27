import React from "react";

function StudentDashboard({ onMovePage }) {
  return (
    <>
      <section className="page-header">
        <div>
          <h1>대시보드</h1>
          <p>오늘의 자원 현황과 예약 정보를 확인하세요.</p>
        </div>
      </section>

      <section className="summary-grid">
        <div className="summary-card">
          <p>예약 현황</p>
          <h2>12</h2>
          <span>오늘 예약 수</span>
        </div>

        <div className="summary-card">
          <p>사용 중 자원</p>
          <h2>5</h2>
          <span>현재 사용 중</span>
        </div>

        <div className="summary-card">
          <p>이슈 대기</p>
          <h2>3</h2>
          <span>처리 대기 중</span>
        </div>

        <div className="summary-card">
          <p>가용 자원</p>
          <h2>8</h2>
          <span>예약 가능</span>
        </div>
      </section>

      <section className="dashboard-content">
        <div className="dashboard-left-column">
          <div className="dashboard-card usage-card">
            <div className="card-header">
              <h2>자원 사용률</h2>
              <p>현재 전체 자원 사용 상태입니다.</p>
            </div>

            <div className="usage-content">
              <div className="usage-circle">
                <strong>75%</strong>
                <span>전체 사용률</span>
              </div>

              <div className="usage-list">
                <div>
                  <span className="dot dot-blue"></span>
                  <p>사용 중</p>
                  <strong>5</strong>
                </div>
                <div>
                  <span className="dot dot-green"></span>
                  <p>예약됨</p>
                  <strong>4</strong>
                </div>
                <div>
                  <span className="dot dot-gray"></span>
                  <p>가용</p>
                  <strong>3</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card usage-guide-card">
            <div className="card-header">
              <h2>이용 안내 수칙</h2>
              <p>실습 자원 이용 전 확인해야 할 기본 수칙입니다.</p>
            </div>

            <ul className="usage-guide-list">
              <li>예약 시간이 되면 실시간 사용 메뉴에서 사용 시작 버튼을 눌러주세요.</li>
              <li>사용이 끝난 뒤에는 반드시 사용 완료 처리를 해주세요.</li>
              <li>자원 접속에 문제가 있으면 이슈 관리 메뉴에서 내용을 등록해주세요.</li>
              <li>예약 시간 외 장시간 점유나 임의 설정 변경은 제한될 수 있습니다.</li>
            </ul>
          </div>
        </div>

        <div className="dashboard-right-column">
          <div className="dashboard-card recent-card">
            <div className="card-header">
              <h2>최근 예약</h2>
              <p>최근 등록된 예약 현황입니다.</p>
            </div>

            <div className="recent-list">
              <div className="recent-item">
                <div>
                  <strong>Server-A-01</strong>
                  <p>10:00 - 12:00</p>
                </div>
                <span className="status-badge reserved">예약됨</span>
              </div>

              <div className="recent-item">
                <div>
                  <strong>Server-A-02</strong>
                  <p>09:00 - 11:00</p>
                </div>
                <span className="status-badge using">사용 중</span>
              </div>

              <div className="recent-item">
                <div>
                  <strong>Server-A-05</strong>
                  <p>13:00 - 15:00</p>
                </div>
                <span className="status-badge using">사용 중</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card notice-preview-card">
            <div className="card-header notice-preview-header">
              <div>
                <h2>공지사항</h2>
                <p>관리자가 등록한 최신 공지입니다.</p>
              </div>

              <button
                className="small-link-button"
                onClick={() => onMovePage("notices")}
              >
                전체 보기
              </button>
            </div>

            <div className="notice-preview-list">
              <div className="notice-preview-item">
                <div>
                  <strong>
                    AI 융합 전산 GPU 노드(Server-A-01) 리소스 확충 안내
                  </strong>
                  <p>2026-05-10 · 조회수 204</p>
                </div>
                <span className="notice-preview-badge">공지</span>
              </div>

              <div className="notice-preview-item">
                <div>
                  <strong>
                    [긴급] 내부 백본 스위치 교체 작업으로 인한 서비스 일시 중단 안내
                  </strong>
                  <p>2026-04-15 · 조회수 89</p>
                </div>
                <span className="notice-preview-badge urgent">긴급</span>
              </div>

              <div className="notice-preview-item">
                <div>
                  <strong>2026학년도 1학기 가상 실습실 이용 수칙 안내</strong>
                  <p>2026-03-02 · 조회수 142</p>
                </div>
                <span className="notice-preview-badge">공지</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default StudentDashboard;