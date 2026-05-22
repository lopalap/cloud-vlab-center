import React, { useState } from 'react';
import styled from 'styled-components';

export default function RegisterInfo({ setStep }) {
  const [dept, setDept] = useState('');
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  
  // 비밀번호 관련 상태 필드 추가
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // 1. 정보를 입력하지 않아도 임시 통과가 가능하도록 예외 허용 로직 처리
    // 단, 비밀번호 란에 무언가 입력했을 때만 일치 확인 벨리데이션 검사 수행
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        alert('회원가입 실패\n이유: 비밀번호가 서로 일치하지 않습니다.');
        return;
      }
    }

    // 2. 일치하거나 아예 비워둔 채 완료를 누른 경우 통과
    alert('회원가입 성공!');
    setStep('login'); // 성공 후 로그인 페이지로 리다이렉트
  };

  return (
    <Form onSubmit={handleRegisterSubmit}>
      <FormHeader>
        <h2>회원정보 입력</h2>
        <p>실습실 이용을 위한 기본 정보를 입력해주세요.</p>
      </FormHeader>

      <InputGroup>
        <label>학과</label>
        <input 
          type="text" 
          placeholder="예: 컴퓨터공학과" 
          value={dept}
          onChange={(e) => setDept(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <label>학번</label>
        <input 
          type="text" 
          placeholder="학번 10자리를 입력하세요" 
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <label>이름</label>
        <input 
          type="text" 
          placeholder="이름을 입력하세요" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputGroup>

      {/* 새롭게 추가된 비밀번호 입력 컴포넌트 구역 */}
      <InputGroup>
        <label>비밀번호 설정</label>
        <input 
          type="password" 
          placeholder="비밀번호 설정" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <label>비밀번호 확인</label>
        <input 
          type="password" 
          placeholder="비밀번호 다시 입력" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </InputGroup>

      <PrimaryButton type="submit">회원가입 완료</PrimaryButton>
    </Form>
  );
}

const Form = styled.form` width: 100%; display: flex; flex-direction: column; `;
const FormHeader = styled.div` margin-bottom: 20px; h2 { font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 6px; } p { font-size: 13px; color: #64748b; } `;
const InputGroup = styled.div`
  display: flex; flex-direction: column; margin-bottom: 14px;
  label { font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 6px; }
  input {
    height: 44px; padding: 0 16px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; background: #ffffff;
    &:focus { border-color: #2563eb; }
  }
`;
const PrimaryButton = styled.button` height: 48px; background: #1d4ed8; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 10px; &:hover { background: #1e40af; } `;