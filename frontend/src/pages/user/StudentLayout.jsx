import React, { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  FileText,
  AlertCircle,
  User,
  MonitorPlay,
  Bell,
} from "lucide-react";

import StudentDashboard from "./StudentDashboard";
import WeeklyReservation from "./WeeklyReservation";
import ReservationApply from "./ReservationApply";
import MyReservations from "./MyReservations";
import IssuePage from "./IssuePage";
import MyPage from "./MyPage";
import UsageStatus from "./UsageStatus";
import NoticePage from "./NoticePage";
import "./studentLayout.css";

function StudentLayout({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");

  const menuItems = [
  { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
  { id: "weekly", label: "주간 예약", icon: CalendarDays },
  { id: "apply", label: "예약 신청", icon: FileText },
  { id: "reservations", label: "내 예약 현황", icon: ClipboardList },
  { id: "usage", label: "실시간 사용", icon: MonitorPlay },
  { id: "notices", label: "공지사항", icon: Bell },
  { id: "issues", label: "이슈 관리", icon: AlertCircle },
  { id: "mypage", label: "마이페이지", icon: User },
];

  const renderPage = () => {
    if (activePage === "dashboard") return <StudentDashboard onMovePage={setActivePage} />;
    if (activePage === "weekly") 
        return <WeeklyReservation onMovePage={setActivePage} />;
    if (activePage === "apply") 
        return (
            <ReservationApply
             onMovePage={setActivePage}
             />
            );
    if (activePage === "reservations") return <MyReservations />;
    if (activePage === "usage") return <UsageStatus />;
    if (activePage === "issues") return <IssuePage />;
    if (activePage === "mypage") return <MyPage onLogout={onLogout} />;
    if (activePage === "notices") return <NoticePage />;

    return <StudentDashboard />;
  };

  return (
    <div className="student-layout">
      <aside className="student-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">☁</div>
          <div>
            <h2>가상 실습실</h2>
            <p>예약 및 제어 센터</p>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
             return (
              <button
                key={item.id}
                className={`sidebar-menu-item ${
                    activePage === item.id ? "active" : ""
                    }`}
                onClick={() => setActivePage(item.id)}
                >
                    <Icon size={18} strokeWidth={2} />
                     <span>{item.label}</span>
                </button>
                );
                })}
              
        </nav>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
            >
          로그아웃
        </button>
      </aside>

      <main className="student-main">{renderPage()}</main>
    </div>
  );
}

export default StudentLayout;