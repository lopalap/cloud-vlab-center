import React from "react";

function MyPage({ onLogout }) {
  return (
    <>
      <section className="page-header">
        <div>
          <h1>마이페이지</h1>
          <p>내 계정 정보와 예약 이용 현황을 확인하세요.</p>
        </div>
      </section>

      <section className="mypage-layout">
        <div className="profile-card">
          <div className="profile-avatar">CS</div>

          <h2>홍길동</h2>
          <p>20201234</p>
          <span>컴퓨터공학과</span>

          <div className="profile-info-list">
            <div>
              <strong>이메일</strong>
              <p>student@example.com</p>
            </div>

            <div>
              <strong>권한</strong>
              <p>학생 사용자</p>
            </div>

            <div>
              <strong>가입일</strong>
              <p>2025-03-02</p>
            </div>
          </div>
        </div>

        <div className="mypage-content">
          <div className="mypage-card">
            <div className="card-header">
              <h2>이용 요약</h2>
              <p>최근 자원 예약 및 사용 현황입니다.</p>
            </div>

            <div className="mypage-stats">
              <div>
                <p>전체 예약</p>
                <strong>12</strong>
              </div>
              <div>
                <p>사용 완료</p>
                <strong>8</strong>
              </div>
              <div>
                <p>진행 중</p>
                <strong>1</strong>
              </div>
              <div>
                <p>등록 이슈</p>
                <strong>3</strong>
              </div>
            </div>
          </div>

          <div className="mypage-card">
            <div className="card-header">
              <h2>계정 관리</h2>
              <p>비밀번호 변경, 알림 설정, 로그아웃을 할 수 있습니다.</p>
            </div>

            <div className="setting-list">
              <button>개인 정보 수정</button>
              <button>비밀번호 변경</button>
              <button>알림 설정</button>
              <button
                type="button"
                className="danger-setting"
                onClick={onLogout}
                  >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyPage;