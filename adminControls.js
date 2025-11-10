// frontend/modules/adminControls.js

// 建立 WebSocket 連線（可根據實際部署調整 URL）
const socket = new WebSocket('wss://your-railway-backend-url');

socket.addEventListener('open', () => {
  console.log('[AdminControls] WebSocket connected');
});

socket.addEventListener('error', (err) => {
  console.error('[AdminControls] WebSocket error:', err);
});

// 📢 發送公告
export function sendAnnouncement() {
  const text = document.getElementById('announcementText').value.trim();
  const style = document.getElementById('announcementStyle').value;

  if (!text) return alert('請輸入公告文字');

  const payload = {
    type: 'announcement',
    content: text,
    style: style
  };

  socket.send(JSON.stringify(payload));
  console.log('[AdminControls] Announcement sent:', payload);
}

// 💬 新增聊天指令
export function addChatCommand() {
  const name = document.getElementById('commandName').value.trim();
  const response = document.getElementById('commandResponse').value.trim();

  if (!name || !response) return alert('請填寫指令與回應內容');

  const payload = {
    type: 'addCommand',
    command: name,
    response: response
  };

  socket.send(JSON.stringify(payload));
  console.log('[AdminControls] Chat command added:', payload);
}

// ⚙️ 套用 overlay 設定
export function applyOverlaySettings() {
  const fontSize = parseInt(document.getElementById('chatFontSize').value, 10);
  const opacity = parseFloat(document.getElementById('chatOpacity').value);

  const payload = {
    type: 'overlaySettings',
    fontSize,
    opacity
  };

  socket.send(JSON.stringify(payload));
  console.log('[AdminControls] Overlay settings applied:', payload);
}
