const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 회원가입
exports.register = async (req, res) => {
  try {
    const { name, student_id, email, password } = req.body;

    // 중복 학번 확인
    const existing = await User.findOne({ student_id });
    if (existing) {
      return res.status(400).json({ message: "이미 존재하는 학번입니다." });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      student_id,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "회원가입 완료" });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { student_id, password } = req.body;

    // 사용자 찾기
    const user = await User.findOne({ student_id });
    if (!user) return res.status(404).json({ message: "존재하지 않는 사용자" });

    // 탈퇴 여부 확인
    if (!user.is_active)
      return res.status(403).json({ message: "비활성화된 계정" });

    // 비밀번호 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "비밀번호 불일치" });

    // Access Token 발급
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    );

    // Refresh Token 발급
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES },
    );

    // Refresh Token DB 저장
    user.refresh_token = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 토큰 재발급
exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: "토큰 없음" });

    const user = await User.findOne({ refresh_token: refreshToken });
    if (!user) return res.status(403).json({ message: "유효하지 않은 토큰" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res
      .status(403)
      .json({ message: "토큰 만료 또는 오류", error: err.message });
  }
};

// 로그아웃
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await User.findOneAndUpdate(
      { refresh_token: refreshToken },
      { refresh_token: null },
    );
    res.json({ message: "로그아웃 완료" });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};
