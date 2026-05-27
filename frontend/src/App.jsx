import React, { useState } from 'react';
import styled from 'styled-components';
import Login from './pages/Login';
import EmailAuth from './pages/EmailAuth';
import RegisterInfo from './pages/RegisterInfo';
import Home from './pages/Home';
import StudentLayout from './pages/user/StudentLayout';
import AdminLayout from './pages/admin/AdminLayout';

export default function App() {
  const [step, setStep] = useState('login'); 
  const [role, setRole] = useState('student'); 
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // 로그인 제출 핸들러
  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'admin') {
      // 관리자는 고정된 계정 정보를 '직접 입력'해야만 통과
      if (loginEmail === 'admin' && loginPassword === 'q1w2e3r4') {
        alert('관리자 로그인 성공!');
        setStep('home');
      } else {
        alert('관리자 계정 정보가 일치하지 않습니다.');
      }
    } else {
      // 사용자(학생) 임시 로그인 (아무 값이나 입력하면 통과)
      if (loginEmail.trim() && loginPassword.trim()) {
        alert('학생 임시 로그인 성공!');
        setStep('home');
      } else {
        alert('이메일과 비밀번호를 입력해 주세요.');
      }
    }
  };

  const handleLogout = () => {
    alert('로그아웃되었습니다.');


    setStep('login');
    setLoginEmail('');
    setLoginPassword('');
    setRole('student');
  };

  if (step === 'home' && role === 'student') {
    return <StudentLayout onLogout={handleLogout} />;
  }

  if (step === 'home' && role === 'admin') {
    return <AdminLayout onLogout={handleLogout} />;
  }



  return (
    <Container>
      <Card>
        {/* 왼쪽 블루 배너 구역 (모든 하위 페이지에서 공통으로 유지됩니다) */}
        <LeftBanner>
          {/* 기존 SVG를 지우고 public/img.png를 띄우는 코드로 수정했습니다 */}
          <IconWrapper>
            <img 
              src="/img.png" 
              alt="학과 로고 아이콘" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </IconWrapper>
          <BannerTitle>학과 가상 실습실<br />예약 및 제어 센터</BannerTitle>
          <BannerSub>스마트 학과 통합 실습 시스템으로<br />언제 어디서든 실습 환경을 관리하세요.</BannerSub>
        </LeftBanner>

        {/* 오른쪽 폼 구역 */}
        <RightFormSection>
          {step === 'login' && (
            <Login 
              role={role} setRole={setRole}
              loginEmail={loginEmail} setLoginEmail={setLoginEmail}
              loginPassword={loginPassword} setLoginPassword={setLoginPassword}
              handleLogin={handleLogin} setStep={setStep}
            />
          )}
          {step === 'emailAuth' && <EmailAuth setStep={setStep} />}
          {step === 'registerInfo' && <RegisterInfo setStep={setStep} />}
          {step === 'home' && (
            <HomeContainer>
              <Home />
              <LogoutButton onClick={() => { setStep('login'); setLoginEmail(''); setLoginPassword(''); }}>로그아웃</LogoutButton>
            </HomeContainer>
          )}
        </RightFormSection>
      </Card>
    </Container>
  );
}

/* ================= 레이아웃 스타일 정의 ================= */
const Container = styled.div` width: 100vw; height: 100vh; background: #f8fafc; display: flex; justify-content: center; align-items: center; font-family: 'Noto Sans KR', sans-serif; `;
const Card = styled.div` display: flex; width: 1000px; height: 600px; background: #ffffff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.04); overflow: hidden; `;
const LeftBanner = styled.div` flex: 1.1; background: #1d4ed8; padding: 60px; display: flex; flex-direction: column; justify-content: center; color: white; `;

/* 이미지가 깔끔하고 선명하게 꽉 차도록 패딩과 크기를 소폭 조정했습니다 */
const IconWrapper = styled.div` 
  width: 52px; height: 52px; background: white; border-radius: 12px; display: flex; justify-content: center; align-items: center; margin-bottom: 30px; overflow: hidden; padding: 5px; box-sizing: border-box;
`;

const BannerTitle = styled.h1` font-size: 32px; font-weight: 700; line-height: 1.4; margin-bottom: 20px; `;
const BannerSub = styled.p` font-size: 14px; opacity: 0.8; line-height: 1.6; `;
const RightFormSection = styled.div` flex: 0.9; padding: 60px; display: flex; flex-direction: column; justify-content: center; background: #ffffff; `;
const HomeContainer = styled.div` display: flex; flex-direction: column; align-items: center; width: 100%; `;
const LogoutButton = styled.button` margin-top: 20px; padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; &:hover { background: #dc2626; } `;