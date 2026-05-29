import React, { useState } from "react";

function ChangePassword({ onMovePage }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      alert("모든 비밀번호 항목을 입력해주세요.");
      return;
    }

    if (formData.newPassword.length < 8) {
      alert("새 비밀번호는 8자 이상으로 입력해주세요.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    alert("비밀번호 변경 기능은 백엔드 API 연동 후 처리됩니다.");
    onMovePage("mypage");
  };

  return (
    <>
      <section className="page-header">
        <div>
          <h1>비밀번호 변경</h1>
          <p>계정 보안을 위해 새로운 비밀번호를 설정하세요.</p>
        </div>
      </section>

      <section className="password-layout">
        <form className="edit-profile-card" onSubmit={handleSubmit}>
          <div className="card-header">
            <h2>비밀번호 변경</h2>
            <p>현재 비밀번호를 확인한 뒤 새로운 비밀번호를 입력하세요.</p>
          </div>

          <div className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="현재 비밀번호를 입력하세요."
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="새 비밀번호를 입력하세요."
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">새 비밀번호 확인</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요."
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="password-guide">
            <strong>비밀번호 설정 안내</strong>
            <p>비밀번호는 8자 이상으로 입력하고, 기존 비밀번호와 다른 값을 사용해주세요.</p>
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
              비밀번호 변경
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default ChangePassword;