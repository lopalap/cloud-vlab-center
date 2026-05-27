import React from "react";

function NoticePage() {
  const notices = [
    {
      id: 1,
      type: "점검",
      title: "Docker 실습 자원 점검 안내",
      date: "2026.05.23",
      content:
        "오늘 18:00부터 19:00까지 Docker 기반 실습 자원 점검이 예정되어 있습니다. 해당 시간에는 일부 자원 접속이 제한될 수 있습니다.",
      important: true,
    },
    {
      id: 2,
      type: "안내",
      title: "실습 자원 사용 완료 버튼 안내",
      date: "2026.05.23",
      content:
        "예약한 자원을 다 사용한 경우 반드시 실시간 사용 관리 화면에서 사용 완료 버튼을 눌러주세요. 사용 완료 처리를 해야 다른 사용자가 자원을 효율적으로 이용할 수 있습니다.",
      important: false,
    },
    {
      id: 3,
      type: "예약",
      title: "예약 가능 시간 정책 안내",
      date: "2026.05.22",
      content:
        "동일 사용자는 하루 최대 2시간까지 실습 자원을 예약할 수 있습니다. 장시간 사용이 필요한 경우 관리자에게 문의해주세요.",
      important: false,
    },
    {
      id: 4,
      type: "주의",
      title: "GPU 서버 이용 시 주의사항",
      date: "2026.05.21",
      content:
        "GPU 서버 사용 중 임의로 시스템 설정을 변경하거나 장시간 미사용 상태로 방치하지 않도록 주의해주세요.",
      important: false,
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>공지사항</h1>
        <p>관리자가 등록한 실습실 운영 안내와 중요 공지를 확인하세요.</p>
      </div>

      <div className="notice-layout">
        <section className="content-card notice-summary-card">
          <h2>공지 요약</h2>
          <p className="card-description">
            현재 학생 사용자에게 표시되는 공지사항 목록입니다.
          </p>

          <div className="notice-summary-list">
            <div>
              <span>전체 공지</span>
              <strong>{notices.length}</strong>
            </div>
            <div>
              <span>중요 공지</span>
              <strong>{notices.filter((notice) => notice.important).length}</strong>
            </div>
            <div>
              <span>최근 등록</span>
              <strong>{notices[0].date}</strong>
            </div>
          </div>
        </section>

        <section className="notice-list">
          {notices.map((notice) => (
            <article
              key={notice.id}
              className={`content-card notice-card ${
                notice.important ? "important" : ""
              }`}
            >
              <div className="notice-card-header">
                <div>
                  <div className="notice-meta">
                    <span className="notice-type">{notice.type}</span>
                    <span>{notice.date}</span>
                    {notice.important && (
                      <span className="notice-important">중요</span>
                    )}
                  </div>
                  <h2>{notice.title}</h2>
                </div>
              </div>

              <p>{notice.content}</p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default NoticePage;