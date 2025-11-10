// overlayMain.js
// 自動偵測 Railway domain，若不存在則使用 localhost
const domain = (typeof process !== 'undefined' && process.env?.RAILWAY_PUBLIC_DOMAIN)
  ? process.env.RAILWAY_PUBLIC_DOMAIN
  : 'localhost:8080';

const WS_URL = domain.includes('localhost')
  ? `ws://${domain}`
  : `wss://${domain}`;

const chatDiv = document.getElementById('chat');
const ws = new WebSocket(WS_URL);

// 連線成功
ws.onopen = () => {
  console.log('[Overlay] Connected to WS');
  chatDiv.innerHTML += '<p class="open">[open] connected</p>';
};

// 收到訊息
ws.onmessage = (event) => {
  try {
    let parsed;
    try {
      parsed = JSON.parse(event.data);
    } catch {
      parsed = event.data;
    }

    if (typeof parsed === 'object' && parsed.message) {
      chatDiv.innerHTML += `<p class="msg">[msg] ${parsed.message}</p>`;
    } else {
      chatDiv.innerHTML += `<p class="msg">[msg] ${parsed}</p>`;
    }

    console.log('[Overlay] Message:', parsed);
  } catch (err) {
    console.error('[Overlay] Failed to parse message:', err);
    chatDiv.innerHTML += '<p class="error">[error] parse failed</p>';
  }
};

// 連線關閉
ws.onclose = () => {
  console.log('[Overlay] Disconnected');
  chatDiv.innerHTML += '<p class="close">[close] disconnected</p>';
};

// 錯誤處理
ws.onerror = (err) => {
  console.error('[Overlay] WebSocket error:', err);
  chatDiv.innerHTML += '<p class="error">[error] connection issue</p>';
};
