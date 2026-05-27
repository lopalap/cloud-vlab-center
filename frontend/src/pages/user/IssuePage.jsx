import React, { useState } from "react";

function IssuePage() {
  const [priority, setPriority] = useState("보통");

  const [formData, setFormData] = useState({
    title: "",
    resource: "GPU PC 1",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.description.trim()) {
      alert("설명을 입력해주세요.");
      return;
    }

    alert("이슈가 등록되었습니다.");

    setFormData({
      title: "",
      resource: "GPU PC 1",
      description: "",
    });

    setPriority("보통");
  };

  return (
    <>
      <section className="page-header">
        <div>
          <h1>이슈 관리</h1>
          <p>자원 사용 중 발생한 문제를 등록하고 처리 상태를 확인하세요.</p>
        </div>
      </section>

      <section className="issue-layout">
        <div className="issue-list-card">
          <div className="card-header">
            <h2>이슈 목록</h2>
            <p>최근 등록된 이슈입니다.</p>
          </div>

          <div className="issue-list">
            <div className="issue-item">
              <div>
                <strong>GPU PC 1 접속 오류</strong>
                <p>2025-05-19 10:30</p>
              </div>
              <span className="issue-badge received">접수</span>
            </div>

            <div className="issue-item">
              <div>
                <strong>Docker Lab 1 예약 충돌</strong>
                <p>2025-05-19 09:15</p>
              </div>
              <span className="issue-badge processing">처리중</span>
            </div>

            <div className="issue-item">
              <div>
                <strong>AI Server 느림</strong>
                <p>2025-05-18 16:20</p>
              </div>
              <span className="issue-badge solved">해결됨</span>
            </div>

            <div className="issue-item">
              <div>
                <strong>Server 2 접속 끊김</strong>
                <p>2025-05-18 14:10</p>
              </div>
              <span className="issue-badge received">접수</span>
            </div>
          </div>
        </div>

        <div className="issue-form-card">
          <div className="card-header">
            <h2>이슈 등록</h2>
            <p>자원 사용 중 문제를 등록해 주세요.</p>
          </div>

          <div className="form-grid issue-form-grid">
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                name="title"
                placeholder="제목을 입력하세요"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>자원 선택</label>
              <select
                name="resource"
                value={formData.resource}
                onChange={handleChange}
              >
                <option>GPU PC 1</option>
                <option>GPU PC 2</option>
                <option>Server 1</option>
                <option>Server 2</option>
                <option>AI Server</option>
                <option>Docker Lab</option>
              </select>
            </div>

            <div className="form-group full">
              <label>설명</label>
              <textarea
                name="description"
                placeholder="문제 상황을 자세히 입력해주세요."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full">
              <label>우선순위</label>
              <div className="priority-group">
                {["낮음", "보통", "높음"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`priority-button ${
                      priority === item ? "active" : ""
                    }`}
                    onClick={() => setPriority(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button className="primary-button issue-submit-button" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </section>
    </>
  );
}

export default IssuePage;