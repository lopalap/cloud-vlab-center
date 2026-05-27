import { useState } from "react";

function UsageStatus() {
  const [usageStatus, setUsageStatus] = useState("waiting");
  const [startTime, setStartTime] = useState("-");
  const [endTime, setEndTime] = useState("-");

  const resource = {
    name: "Server-A-01",
    nodeName: "Server-A-01",
    category: "GPU Server",
    spec: "RTX 4090 / 64GB",
    reservedTime: "09:00 ~ 11:00",
    ip: "192.168.0.15",
    port: "30001",
    accessType: "SSH",
    sshCommand: "ssh student@192.168.0.15 -p 30001",
};

  const handleStart = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setUsageStatus("using");
    setStartTime(time);
    setEndTime("-");
    alert("사용을 시작했습니다.");
  };

  const handleComplete = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setUsageStatus("completed");
    setEndTime(time);
    alert("사용을 완료했습니다.");
  };

  const getStatusText = () => {
    if (usageStatus === "waiting") return "예약됨";
    if (usageStatus === "using") return "사용중";
    if (usageStatus === "completed") return "완료";
  return "예약됨";
};

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>실시간 사용 관리</h1>
        <p>예약한 실습 자원의 실제 사용 상태를 관리하세요.</p>
      </div>

      <div className="usage-grid">
        <section className="content-card usage-main-card">
          <div className="usage-card-header">
            <div>
              <h2>현재 예약 자원</h2>
              <p>사용 시작과 사용 완료 상태를 직접 변경할 수 있습니다.</p>
            </div>
            <span className={`usage-status-badge ${usageStatus}`}>
              {getStatusText()}
            </span>
          </div>

          <div className="resource-info-grid">
            <div className="resource-info-item">
              <span>이름</span>
              <strong>{resource.name}</strong>
            </div>
            <div className="resource-info-item">
              <span>노드 이름</span>
              <strong>{resource.nodeName}</strong>
            </div>
            <div className="resource-info-item">
              <span>자원 분류</span>
              <strong>{resource.category}</strong>
            </div>
            <div className="resource-info-item">
              <span>스펙</span>
              <strong>{resource.spec}</strong>
            </div>
            <div className="resource-info-item">
              <span>예약 시간</span>
              <strong>{resource.reservedTime}</strong>
            </div>
            <div className="resource-info-item">
              <span>현재 상태</span>
              <strong>{getStatusText()}</strong>
            </div>
            <div className="resource-info-item">
              <span>실제 사용 시작</span>
              <strong>{startTime}</strong>
            </div>
            <div className="resource-info-item">
              <span>실제 사용 완료</span>
              <strong>{endTime}</strong>
            </div>
          </div>

          <div className="usage-button-area">
            <button
              className="primary-button"
              onClick={handleStart}
              disabled={usageStatus === "using" || usageStatus === "completed"}
            >
              사용 시작
            </button>
            <button
              className="secondary-button"
              onClick={handleComplete}
              disabled={usageStatus !== "using"}
            >
              사용 완료
            </button>
          </div>
        </section>

        <section className="content-card">
          <h2>접속 정보</h2>
          <p className="card-description">
            예약한 자원에 접속하기 위한 기본 정보입니다.
          </p>

          <div className="access-info-list">
            <div>
              <span>IP 주소</span>
              <strong>{resource.ip}</strong>
            </div>
            <div>
              <span>포트 번호</span>
              <strong>{resource.port}</strong>
            </div>
            <div>
              <span>접속 방식</span>
              <strong>{resource.accessType}</strong>
            </div>
          </div>

          <div className="ssh-box">
            <span>SSH 접속 명령어</span>
            <code>{resource.sshCommand}</code>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UsageStatus;