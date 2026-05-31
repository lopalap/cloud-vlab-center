const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 내 정보 조회
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -refresh_token"
    );
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 내 정보 수정 (이름, 이메일, 비밀번호)
exports.updateMe = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) {
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select("-password -refresh_token");

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json({ message: "정보가 수정되었습니다.", user });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 회원 탈퇴 (소프트 딜리트)
exports.deleteMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { is_active: false, refresh_token: null } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json({ message: "회원 탈퇴가 완료되었습니다." });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 전체 사용자 목록 조회 (관리자)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password -refresh_token")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 사용자 상태 변경 (관리자) - 이용정지/복구
exports.updateUserStatus = async (req, res) => {
  try {
    const { is_active } = req.body;

    if (typeof is_active !== "boolean") {
      return res.status(400).json({ message: "is_active는 true/false여야 합니다." });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { is_active } },
      { new: true }
    ).select("-password -refresh_token");

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    const statusText = is_active ? "정상 복구" : "이용정지";
    res.json({ message: `${user.name} 계정이 ${statusText} 처리되었습니다.`, user });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};