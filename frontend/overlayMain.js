// 最小化測試版 overlayMain.js
const WS_URL = 'wss://bluegumbot-production.up.railway.app';
const chatDiv = document.getElementById('chat');

const ws = new WebSocket(WS_URL);

// 連線成功
ws.onopen = () => {
  console.log('[Overlay] Connected to WS');
  chatDiv.innerHTML += '<p>[open] connected</p>';
};

// 收到訊息
ws.onmessage = (event) => {
  console.log('[Overlay] Message:', event.data);
  chatDiv.innerHTML += `<p>[msg] ${event.data}</p>`;
};

// 連線關閉
ws.onclose = () => {
  console.log('[Overlay] Disconnected');
  chatDiv.innerHTML += '<p>[close] disconnected</p>';
};

// 錯誤處理
ws.onerror = (err) => {
  console.error('[Overlay] WebSocket error:', err);
  chatDiv.innerHTML += '<p>[error] connection issue</p>';
};
