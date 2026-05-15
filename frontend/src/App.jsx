import React, { useState } from 'react';
import './index.css';
import logoIcon from './assets/computer-engineering-icon.png';
import LoginForm from './components/LoginForm';
import EmailAuthForm from './components/EmailAuthForm';
import SignupForm from './components/SignupForm';

function App() {
  const [view, setView] = useState('login'); // 'login', 'auth', 'signup'
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="web-page-container">
      <div className="login-split-card">
        
        {/* 왼쪽 패널 (고정) */}
        <div className="left-panel">
          <div className="brand-info">
            <img src={logoIcon} alt="Logo" className="brand-logo" />
            <h1>학과 가상 실습실<br />예약 및 제어 센터</h1>
            <p>스마트 학과 통합 실습 시스템으로<br />언제 어디서든 실습 환경을 관리하세요.</p>
          </div>
        </div>

        {/* 오른쪽 패널 (컴포넌트 교체 영역) */}
        <div className="right-panel">
          <div className="login-form-content">
            {view === 'login' && (
              <LoginForm 
                isAdmin={isAdmin} 
                setIsAdmin={setIsAdmin} 
                onGoToAuth={() => setView('auth')} 
              />
            )}
            
            {view === 'auth' && (
              <EmailAuthForm 
                onVerify={() => setView('signup')} 
                onBack={() => setView('login')} 
              />
            )}

            {view === 'signup' && (
              <SignupForm 
                onComplete={() => {
                  alert('회원가입이 완료되었습니다!');
                  setView('login');
                }} 
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;