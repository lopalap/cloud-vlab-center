# 학과 가상 실습실 예약 및 제어 센터 - API 명세서

## 목차
1. [인증 API](#1-인증-api)
2. [사용자 API](#2-사용자-api)
3. [실습 자원 API](#3-실습-자원-api)
4. [예약 API](#4-예약-api)
5. [공통 정보](#5-공통-정보)

---

## 1. 인증 API

Base URL: `/api/auth`

| 기능 | 메서드 | 엔드포인트 | 인증 | 설명 |
|------|--------|-----------|------|------|
| 회원가입 | POST | `/api/auth/register` | 불필요 | 이름, 학번, 이메일, 비밀번호로 가입 |
| 로그인 | POST | `/api/auth/login` | 불필요 | 학번과 비밀번호로 로그인 (access + refresh 토큰 발급) |
| 토큰 재발급 | POST | `/api/auth/refresh` | 불필요 | refresh_token으로 access_token 재발급 |
| 로그아웃 | POST | `/api/auth/logout` | 불필요 | refresh_token을 null로 초기화 |

### 회원가입 `POST /api/auth/register`

**Request Body**
```json
{
  "name": "김학생",
  "student_id": "20240001",
  "email": "student@university.ac.kr",
  "password": "password123"
}
```

**Response** `201 Created`
```json
{
  "message": "회원가입 완료"
}
```

---

### 로그인 `POST /api/auth/login`

**Request Body**
```json
{
  "student_id": "20240001",
  "password": "password123"
}
```

**Response** `200 OK`
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

---

## 2. 사용자 API

Base URL: `/api/users`  
🔑 모든 요청에 Bearer Token 필요

| 기능 | 메서드 | 엔드포인트 | 권한 | 설명 |
|------|--------|-----------|------|------|
| 내 정보 조회 | GET | `/api/users/me` | 학생/관리자 | 예약 제한 및 현재 예약 횟수 확인 |
| 내 정보 수정 | PATCH | `/api/users/me` | 학생/관리자 | 이름, 이메일, 비밀번호 수정 |
| 회원 탈퇴 | DELETE | `/api/users/me` | 학생/관리자 | is_active: false 처리 (소프트 딜리트) |

---

## 3. 실습 자원 API

Base URL: `/api/resources`  
🔑 관리자 전용 API는 Bearer Token + admin 권한 필요

| 기능 | 메서드 | 엔드포인트 | 권한 | 설명 |
|------|--------|-----------|------|------|
| 자원 목록 조회 | GET | `/api/resources` | 학생/관리자 | 모든 실습실/서버 리스트 조회 (retired 제외) |
| 특정 자원 상세 | GET | `/api/resources/:id` | 학생/관리자 | 특정 장비 상세 정보 및 운영 시간 확인 |
| 자원 등록 | POST | `/api/resources` | 관리자 | created_by 자동 기록 |
| 자원 수정 | PATCH | `/api/resources/:id` | 관리자 | spec/status/운영 시간 수정 |
| 자원 상태 변경 | PATCH | `/api/resources/:id/status` | 관리자 | active ↔ maintenance 전환 / retired 처리 |

---

## 4. 예약 API

Base URL: `/api/reservations`  
🔑 모든 요청에 Bearer Token 필요

| 기능 | 메서드 | 엔드포인트 | 권한 | 설명 |
|------|--------|-----------|------|------|
| 예약 신청 | POST | `/api/reservations` | 학생/관리자 | resource_id, start_time, end_time, purpose 전송 |
| 내 예약 목록 | GET | `/api/reservations/me` | 학생/관리자 | 내가 신청한 예약 현황 확인 |
| 특정 예약 상세 | GET | `/api/reservations/:id` | 학생/관리자 | 예약 상세 정보 조회 |
| 예약 취소 | PATCH | `/api/reservations/:id/cancel` | 학생/관리자 | status: `cancelled`로 변경 |
| 실제 사용 시작 | PATCH | `/api/reservations/:id/start` | 학생/관리자 | actual_start_time 기록, status: `using`으로 변경 |
| 실제 사용 종료 | PATCH | `/api/reservations/:id/end` | 학생/관리자 | actual_end_time 기록, status: `completed`로 변경 |
| 전체 예약 현황 | GET | `/api/reservations` | 관리자 | 모든 사용자의 예약 리스트 조회 |
| 예약 승인 | PATCH | `/api/reservations/:id/approve` | 관리자 | status: `reserved` + approved_by 자동 기록 |
| 예약 거절 | PATCH | `/api/reservations/:id/reject` | 관리자 | status: `cancelled` + cancel_reason 저장 |

### 예약 신청 `POST /api/reservations`

**Request Body**
```json
{
  "resource_id": "663f...",
  "start_time": "2026-05-15T14:00:00Z",
  "end_time": "2026-05-15T16:00:00Z",
  "purpose": "딥러닝 모델 학습 실습"
}
```

**Response** `201 Created`
```json
{
  "message": "예약 신청 완료",
  "reservation": {
    "_id": "774g...",
    "user_id": "663f...",
    "resource_id": "663f...",
    "start_time": "2026-05-15T14:00:00Z",
    "end_time": "2026-05-15T16:00:00Z",
    "purpose": "딥러닝 모델 학습 실습",
    "status": "waiting",
    "approved_by": null,
    "cancel_reason": null,
    "actual_start_time": null,
    "actual_end_time": null,
    "createdAt": "2026-05-15T09:00:00Z",
    "updatedAt": "2026-05-15T09:00:00Z"
  }
}
```

---

## 5. 공통 정보

### 예약 Status 값

| status 값 | 의미 | 전환 조건 |
|-----------|------|----------|
| `waiting` | 승인 대기 중 | 예약 신청 직후 기본값 |
| `reserved` | 예약됨 | 관리자가 승인했을 때 |
| `using` | 사용 중 | 실제 사용 시작했을 때 |
| `cancelled` | 취소됨 | 사용자가 직접 취소하거나 관리자가 거절했을 때 |
| `completed` | 완료 | 사용 종료 후 반납됐을 때 |

> ⚠️ `cancelled` 상태일 때 `cancel_reason` 필드에 취소/거절 사유가 저장됩니다.

### 인증 방식

모든 인증이 필요한 API는 요청 헤더에 아래와 같이 포함해야 합니다:

```
Authorization: Bearer {accessToken}
```

### 운영 시간 제한

- 예약 가능 시작 시간: `09:00`
- 예약 가능 종료 시간: `22:00`
- 운영 요일: 월~금 (Mon, Tue, Wed, Thu, Fri)
- 운영 시간 외 예약 시도 시 `400 Bad Request` 반환

### 충돌 방지 알고리즘 동작 흐름

```
예약 요청
↓
리소스 존재? active 상태? → 400/404 차단
↓
운영 요일/시간 내? → 400 차단
↓
완전 중복 있음? → 409 차단
↓
충돌 수 >= max_concurrent? → 409 차단
↓
✅ 예약 생성
```
