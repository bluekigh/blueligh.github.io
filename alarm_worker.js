// web/alarm_worker.js
let alarms = [];
let timerId = null;

function parseTime(str) {
  // "HH:mm" -> Date 객체 (오늘 기준)
  const now = new Date();
  const [h, m] = str.split(":").map(Number);
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
}

function checkAlarms() {
  const now = new Date();
  for (let i = 0; i < alarms.length; i++) {
    const alarmTime = parseTime(alarms[i]);
    // 1초 오차 허용
    if (Math.abs(alarmTime - now) <= 1000) {
      self.postMessage({ type: "alarm", time: alarms[i] });
    }
  }
}

self.onmessage = function(e) {
  const data = e.data;
  if (data && data.type === "setAlarms") {
    alarms = data.alarms || [];
    if (timerId) clearInterval(timerId);
    // 1초마다 체크
    timerId = setInterval(checkAlarms, 1000);
  }
  if (data && data.type === "stop") {
    if (timerId) clearInterval(timerId);
    timerId = null;
  }
};
