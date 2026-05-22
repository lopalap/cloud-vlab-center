const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// JSON 파싱
app.use(express.json());

// 모델 등록
require("./models/User");
require("./models/Resource");
require("./models/Reservation");

// 라우터 연결
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const reservationRouter = require("./routes/reservation");
app.use("/api/reservations", reservationRouter);

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
