import React, { useState } from "react";

function EditProfile({ onMovePage }) {
  const [formData, setFormData] = useState({
    name: "홍길동",
    studentId: "20201234",
    department: "컴퓨터공학과",
    email: "student@example.com",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    alert("개인정보 수정 기능은 백엔드 API 연동 후 저장됩니다.");
    onMovePage("mypage");
  };

  const handleWithdraw = () => {
    const isConfirmed = window.confirm(
      "정말 회원탈퇴를 진행하시겠습니까?\n탈퇴 후에는 계정과 예약 정보를 복구할 수 없습니다."
    );

    if (isConfirmed) {
      alert("회원탈퇴 기능은 백엔드 API 연동 후 처리됩니다.");
    }
  };

  return (
    <>
      <section className="page-header">
        <div>
          <h1>개인정보 수정</h1>
          <p>계정에 등록된 기본 정보를 확인하고 수정하세요.</p>
        </div>
      </section>

      <section className="edit-profile-layout">
        <form className="edit-profile-card" onSubmit={handleSave}>
          <div className="card-header">
            <h2>기본 정보</h2>
            <p>수정할 정보를 입력한 뒤 변경사항을 저장하세요.</p>
          </div>

          <div className="form-grid edit-profile-form">
            <div className="form-group">
              <label htmlFor="name">이름</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="studentId">학번</label>
              <input
                id="studentId"
                name="studentId"
                type="text"
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">학과</label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={() => onMovePage("mypage")}
            >
              취소
            </button>

            <button type="submit" className="primary-button">
              변경사항 저장
            </button>
          </div>
        </form>

        <div className="withdraw-card">
          <div>
            <h2>회원 탈퇴</h2>
            <p>
              회원탈퇴 시 계정 정보와 예약 이용 내역을 더 이상 확인할 수
              없습니다. 탈퇴 전에 진행 중인 예약이 없는지 확인해주세요.
            </p>
          </div>

          <button
            type="button"
            className="withdraw-button"
            onClick={handleWithdraw}
          >
            회원 탈퇴
          </button>
        </div>
      </section>
    </>
  );
}

export default EditProfile;