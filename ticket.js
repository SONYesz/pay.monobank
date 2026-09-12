const params = new URLSearchParams(window.location.search);

// Получение параметров из URL
const vehicleType = params.get('type') || 'Тролейбус';
const vehicleNum = params.get('num') || '046';
const count = params.get('count') || '1';
const ticketNum = params.get('ticketNum') || '140 331';

// Подстановка значений в документ
document.getElementById('vehicleTitle').textContent = vehicleType;
document.getElementById('vehicleLine').innerHTML = `${vehicleType} <b>№ ${vehicleNum}</b>`;

// Склонение слова "квиток"
let countText = `${count} квиток`;
if (count > 1 && count < 5) {
  countText = `${count} квитки`;
} else if (count >= 5) {
  countText = `${count} квитків`;
}
document.getElementById('ticketCount').textContent = countText;
document.getElementById('ticketNumberBlock').innerHTML = `Номер: <b>${ticketNum}</b>`;

// Дата покупки и таймер
const monthsUa = ['січня','лютого','березня','квітня','травня','червня','липня','серпня','вересня','жовтня','листопада','грудня'];
function pad(n){ return n.toString().padStart(2, '0'); }

const purchasedTs = params.get('ts') ? Number(params.get('ts')) : Date.now();

function renderPurchased() {
  const now = new Date(purchasedTs);
  const day = now.getDate();
  const month = monthsUa[now.getMonth()];
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  document.getElementById('purchasedText').textContent = `Придбано ${day} ${month} о ${hh}:${mm}`;
}
renderPurchased();

const expiresAt = purchasedTs + 60 * 60 * 1000;

function formatCountdown(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${pad(m)}:${pad(sec)}`;
}

function renderCountdown() {
  const secondsLeft = Math.max(0, Math.round((expiresAt - Date.now()) / 1000));
  document.getElementById('countdown').textContent = 'Квиток дійсний — ' + formatCountdown(secondsLeft);
}

renderCountdown();
setInterval(renderCountdown, 1000);