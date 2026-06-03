import React, { useState } from 'react';
import styled from 'styled-components';

export default function EmailAuth({ setStep, setVerifiedEmail }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSendCode = () => {
    if (!email.trim() || !email.includes('@')) {
      alert('올바른 이메일 주소를 입력해 주세요.');
      return;
    }
    setIsSent(true);
    alert('임시 인증번호가 발송되었습니다. (테스트 인증번호: 1234)');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === '1234') {
      setVerifiedEmail(email);
      alert('이메일 인증 성공!');
      setStep('registerInfo'); // 회원가입 정보 입력 창으로 이동
    } else {
      alert('인증번호가 일치하지 않습니다. (1234를 입력하세요)');
    }
  };

  return (
    <Form onSubmit={handleVerifyCode}>
      <FormHeader>
        <h2>이메일 인증</h2>
        <p>동국대학교 메일(@dgu.ac.kr)로 인증해주세요.</p>
      </FormHeader>

      <RowInputGroup>
        <div className="input-box">
          <input 
            type="email" 
            placeholder="이메일 입력 (ex: abc@dgu.ac.kr)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSent}
            required
          />
        </div>
        <SendButton type="button" onClick={handleSendCode} disabled={isSent}>
          {isSent ? '재발송' : '발송'}
        </SendButton>
      </RowInputGroup>

      <InputGroup>
        <input 
          type="text" 
          placeholder="인증번호 입력" 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </InputGroup>

      <PrimaryButton type="submit">인증번호 확인</PrimaryButton>
      <BackButton type="button" onClick={() => setStep('login')}>이전으로 돌아가기</BackButton>
    </Form>
  );
}

const Form = styled.form` width: 100%; display: flex; flex-direction: column; `;
const FormHeader = styled.div` margin-bottom: 30px; h2 { font-size: 26px; font-weight: 700; color: #1e293b; margin-bottom: 8px; } p { font-size: 14px; color: #64748b; } `;
const RowInputGroup = styled.div`
  display: flex; gap: 10px; margin-bottom: 16px;
  .input-box { flex: 1; }
  input { width: 100%; height: 48px; padding: 0 16px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; box-sizing: border-box; }
`;
const SendButton = styled.button` width: 80px; height: 48px; background: #334155; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; &:hover { background: #1e293b; } `;
const InputGroup = styled.div` margin-bottom: 24px; input { width: 100%; height: 48px; padding: 0 16px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; outline: none; box-sizing: border-box; } `;
const PrimaryButton = styled.button` height: 48px; background: #2563eb; color: white; border: none; border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; &:hover { background: #1d4ed8; } `;
const BackButton = styled.button` background: none; border: none; margin-top: 16px; color: #64748b; font-size: 13px; cursor: pointer; text-decoration: underline; `;