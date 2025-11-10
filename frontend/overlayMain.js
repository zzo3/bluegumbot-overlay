// overlayMain.js
const WS_URL = 'wss://bluegumbot-production.up.railway.app';
const chatDiv = document.getElementById('chat');

// 建立 WebSocket 連線
const ws = new WebSocket(WS_URL);

// 連線成功
ws.onopen = () => {
  chatDiv.innerHTML += '<p>[open] connected</p>';
};

// 收到訊息
ws.onmessage = (event) => {
  try {
    const data = event.data;
    chatDiv.innerHTML += `<p>[msg] ${data}</p>`;
  } catch (err) {
    console.error('[Overlay] Failed to parse message:', err);
  }
};

// 連線關閉
ws.onclose = () => {
  chatDiv.innerHTML += '<p>[close] disconnected</p>';
};

// 錯誤處理
ws.onerror = (err) => {
  console.error('[Overlay] WebSocket error:', err);
  chatDiv.innerHTML += '<p>[error] connection issue</p>';
};
