const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const EmailVerification = require("../models/EmailVerification");
const { sendVerificationEmail } = require("../utils/mailer");

// 회원가입
exports.register = async (req, res) => {
  try {
    const { name, student_id, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "이름을 입력해주세요." });
    }
    if (!student_id || !student_id.trim()) {
      return res.status(400).json({ message: "학번을 입력해주세요." });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ message: "이메일을 입력해주세요." });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "비밀번호는 6자 이상이어야 합니다." });
    }

    // ✅ 이메일 인증 완료 여부 확인 (추가된 부분)
    const verified = await EmailVerification.findOne({
      email: email.trim(),
      verified: true,
    });
    if (!verified) {
      return res.status(400).json({ message: "이메일 인증이 완료되지 않았습니다." });
    }

    const existing = await User.findOne({ student_id: student_id.trim() });
    if (existing) {
      return res.status(400).json({ message: "이미 존재하는 학번입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name.trim(),
      student_id: student_id.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    // ✅ 회원가입 완료 후 인증 기록 삭제 (추가된 부분)
    await EmailVerification.deleteMany({ email: email.trim() });

    res.status(201).json({ message: "회원가입 완료" });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { student_id, password } = req.body;

    if (!student_id || !password) {
      return res.status(400).json({ message: "학번과 비밀번호를 입력해주세요." });
    }

    const user = await User.findOne({ student_id: student_id.trim() }).lean();
    if (!user) return res.status(404).json({ message: "존재하지 않는 사용자" });

    if (!user.is_active)
      return res.status(403).json({ message: "비활성화된 계정" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "비밀번호 불일치" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES },
    );

    await User.findOneAndUpdate(
      { student_id },
      { refresh_token: refreshToken }
    );

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

    const user = await User.findOne({ refresh_token: refreshToken }).lean();
    if (!user) return res.status(403).json({ message: "유효하지 않은 토큰" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRES },
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "토큰 만료 또는 오류", error: err.message });
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

// 이메일 인증 코드 발송
exports.sendEmailCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ message: "이메일을 입력해주세요." });
    }

    // 기존 인증 코드 삭제
    await EmailVerification.deleteMany({ email });

    // 6자리 랜덤 코드 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 5분 후 만료
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await EmailVerification.create({ email, code, verified: false, expiresAt });

    await sendVerificationEmail(email, code);

    res.json({ message: "인증 코드가 발송되었습니다." });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};

// 이메일 인증 코드 검증
exports.verifyEmailCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const record = await EmailVerification.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "인증 코드를 먼저 요청해주세요." });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({ message: "인증 코드가 만료되었습니다." });
    }

    if (record.code !== code) {
      return res.status(400).json({ message: "인증 코드가 올바르지 않습니다." });
    }

    record.verified = true;
    await record.save();

    res.json({ message: "이메일 인증이 완료되었습니다." });
  } catch (err) {
    res.status(500).json({ message: "서버 오류", error: err.message });
  }
};