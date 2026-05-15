import React, { useState } from 'react';

function LoginForm({ isAdmin, setIsAdmin, onGoToAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (isAdmin) {
      // 관리자 임시 로그인 로직
      if (email === 'admin' && password === 'q1w2e3r4') {
        alert('관리자 로그인 성공!');
      } else {
        alert('관리자 계정 정보가 일치하지 않습니다.');
      }
    } else {
      // 학생 임시 로그인 로직 (도메인: dgu.ac.kr)
      if (email === '2021212836@dgu.ac.kr' && password === '1234') {
        alert('학생 로그인 성공! 환영합니다.');
      } else {
        alert('학생 계정 정보가 일치하지 않거나 등록되지 않은 사용자입니다.');
      }
    }
  };

  return (
    <>
      <div className="form-header">
        <h2>로그인</h2>
        <p>계정에 로그인하여 서비스를 이용하세요.</p>
      </div>
      <div className="tab-menu">
        <button 
          onClick={() => { setIsAdmin(false); setEmail(''); setPassword(''); }} 
          className={`tab-btn ${!isAdmin ? 'active' : ''}`}
        >
          학생
        </button>
        <button 
          onClick={() => { setIsAdmin(true); setEmail(''); setPassword(''); }} 
          className={`tab-btn ${isAdmin ? 'active' : ''}`}
        >
          관리자
        </button>
      </div>
      <div className="form-group">
        <div className="input-box">
          <label>{isAdmin ? '관리자 아이디' : '이메일'}</label>
          <input 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // placeholder를 '이메일 입력'으로 변경
            placeholder={isAdmin ? "admin" : "이메일 입력"} 
          />
        </div>
        <div className="input-box">
          <label>비밀번호</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력" 
          />
        </div>
      </div>
      <button className="submit-btn" onClick={handleLogin}>로그인</button>
      {!isAdmin && (
        <p className="signup-link">
          계정이 없으신가요? <span onClick={onGoToAuth}>회원가입</span>
        </p>
      )}
    </>
  );
}

export default LoginForm;