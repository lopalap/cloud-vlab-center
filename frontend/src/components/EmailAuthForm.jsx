import React from 'react';

function EmailAuthForm({ onVerify, onBack }) {
  return (
    <>
      <div className="form-header">
        <h2 className="blue-text">이메일 인증</h2>
        <p>동국대학교 메일(@dgu.ac.kr)로 인증해주세요.</p>
      </div>
      <div className="form-group">
        <div className="input-with-btn">
          <input type="email" placeholder="이메일 입력" />
          <button className="side-btn" type="button">발송</button>
        </div>
        <div className="input-box">
          <input type="text" placeholder="인증번호 입력" />
        </div>
      </div>
      <button className="submit-btn blue-btn" onClick={onVerify}>인증번호 확인</button>
      <p className="signup-link" onClick={onBack} style={{cursor: 'pointer', textAlign: 'center', marginTop: '15px'}}>이전으로 돌아가기</p>
    </>
  );
}

export default EmailAuthForm;