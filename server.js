const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  { student_id: "20231234", password: "1234", role: "student"},
  { student_id: "20241234", password: "1234", role: "student"},
  { student_id: "20251234", password: "1234", role: "student"},
  { student_id: "prof", password: "5678", role: "prof" }
];

let attendance = [];

app.post('/login', (req, res) => {
  const { student_id, password } = req.body;

  const user = users.find(
    u => u.student_id === student_id && u.password === password
  );

  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.json({ success: false });
  }
});

app.post('/attendance', (req, res) => {
  const { student_id } = req.body;

   attendance.push({
    student_id,
    time: new Date().toLocaleString()
  });

  console.log(student_id + " 출석 완료");

  res.json({ success: true });
});

app.get('/attendance', (req, res) => {
  res.json(attendance);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버 실행중 ${PORT}`);
});