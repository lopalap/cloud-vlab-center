import React from 'react';

function SignupForm({ onComplete }) {
  return (
    <>
      <div className="form-header">
        <h2>회원정보 입력</h2>
        <p>실습실 이용을 위한 기본 정보를 입력해주세요.</p>
      </div>
      <div className="form-group">
        <div className="input-box">
          <label>학과</label>
          <input type="text" placeholder="예: 컴퓨터공학과" />
        </div>
        <div className="input-box">
          <label>학번</label>
          <input type="text" placeholder="학번 10자리를 입력하세요" />
        </div>
        <div className="input-box">
          <label>이름</label>
          <input type="text" placeholder="이름을 입력하세요" />
        </div>
      </div>
      <button className="submit-btn" onClick={onComplete}>회원가입 완료</button>
    </>
  );
}

export default SignupForm;