// J.A.R.V.I.S. Core Logic
const JARVIS = (() => {
  const STORAGE_KEY = 'jarvis_memory';
  const MAX_HISTORY = 20;

  let memory = loadMemory();
  let conversationHistory = [];
  let isProcessing = false;

  function loadMemory() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        userName: 'Sir',
        voiceEnabled: true,
        theme: 'dark',
        conversations: [],
        createdAt: new Date().toISOString(),
        totalInteractions: 0,
      };
    } catch { return { userName: 'Sir', voiceEnabled: true, theme: 'dark', conversations: [], totalInteractions: 0 }; }
  }

  function saveMemory() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(memory)); } catch {}
  }

  const COMMANDS = {
    'clear memory': () => { clearMemory(); return 'Memory wiped clean, Sir. Starting fresh.'; },
    'clear chat': () => { clearChat(); return null; },
    'enable voice': () => { Voice.setVoiceEnabled(true); memory.voiceEnabled = true; saveMemory(); updateVoiceBtn(); return 'Voice output activated, Sir.'; },
    'disable voice': () => { Voice.setVoiceEnabled(false); memory.voiceEnabled = false; saveMemory(); updateVoiceBtn(); return 'Voice output silenced, Sir.'; },
    'silent mode': () => { Voice.setVoiceEnabled(false); memory.voiceEnabled = false; saveMemory(); updateVoiceBtn(); return 'Silent mode engaged, Sir.'; },
    'voice mode': () => { Voice.setVoiceEnabled(true); memory.voiceEnabled = true; saveMemory(); updateVoiceBtn(); return 'Voice mode engaged, Sir.'; },
    'who am i': () => `You are ${memory.userName}, Sir. ${memory.totalInteractions} interactions logged.`,
    'status': () => `All systems operational, Sir. ${memory.totalInteractions} interactions on record. Voice: ${Voice.isVoiceEnabled() ? 'Active' : 'Silent'}. Memory: ${conversationHistory.length} messages in context.`,
    'help': () => `Available commands, Sir:\n- "clear memory" — wipe all stored data\n- "clear chat" — clear the display\n- "enable/disable voice" — toggle voice output\n- "silent mode / voice mode" — quick toggles\n- "status" — system status report\n- "who am I" — identity check\nAll other queries are routed to my AI core.`,
  };

  function checkCommand(input) {
    const lower = input.toLowerCase().trim();
    for (const [cmd, fn] of Object.entries(COMMANDS)) {
      if (lower.includes(cmd)) return fn();
    }
    return null;
  }

  function clearMemory() {
    memory = { userName: 'Sir', voiceEnabled: true, theme: 'dark', conversations: [], totalInteractions: 0 };
    conversationHistory = [];
    saveMemory();
    clearChat();
  }

  function clearChat() {
    const feed = document.getElementById('chat-feed');
    if (feed) feed.innerHTML = '';
    conversationHistory = [];
    addSystemMessage('Memory cleared. Ready for new directives, Sir.');
  }

  async function sendMessage(input) {
    if (!input || isProcessing) return;
    input = input.trim();
    if (!input) return;

    isProcessing = true;
    memory.totalInteractions++;
    saveMemory();

    appendUserMessage(input);
    setInputState(false);
    showTyping();

    const cmdResult = checkCommand(input);
    if (cmdResult !== null) {
      await delay(400);
      hideTyping();
      appendJarvisMessage(cmdResult);
      if (Voice.isVoiceEnabled()) Voice.speak(cmdResult);
      setInputState(true);
      isProcessing = false;
      return;
    }

    conversationHistory.push({ role: 'user', content: input });
    const historyToSend = conversationHistory.slice(-MAX_HISTORY);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyToSend }),
      });

      const data = await res.json();
      hideTyping();

      if (data.error) {
        appendJarvisMessage(`System anomaly detected, Sir: ${data.error}`);
      } else {
        const reply = data.reply;
        conversationHistory.push({ role: 'assistant', content: reply });
        if (conversationHistory.length > MAX_HISTORY * 2) {
          conversationHistory = conversationHistory.slice(-MAX_HISTORY);
        }
        appendJarvisMessage(reply);
        if (Voice.isVoiceEnabled()) Voice.speak(reply);
        memory.conversations.push({ user: input, jarvis: reply.substring(0, 200), ts: Date.now() });
        if (memory.conversations.length > 50) memory.conversations = memory.conversations.slice(-50);
        saveMemory();
      }
    } catch (err) {
      hideTyping();
      appendJarvisMessage('Connection to AI core lost, Sir. Check network status.');
    }

    setInputState(true);
    isProcessing = false;
  }

  function appendUserMessage(text) {
    const feed = document.getElementById('chat-feed');
    const div = document.createElement('div');
    div.className = 'msg msg-user';
    div.innerHTML = `<span class="msg-label">YOU</span><span class="msg-text">${escHtml(text)}</span>`;
    feed.appendChild(div);
    scrollFeed();
  }

  function appendJarvisMessage(text) {
    const feed = document.getElementById('chat-feed');
    const div = document.createElement('div');
    div.className = 'msg msg-jarvis';
    div.innerHTML = `<span class="msg-label">J.A.R.V.I.S.</span><div class="msg-text">${formatText(text)}</div>`;
    feed.appendChild(div);
    scrollFeed();
    animateIn(div);
  }

  function addSystemMessage(text) {
    const feed = document.getElementById('chat-feed');
    if (!feed) return;
    const div = document.createElement('div');
    div.className = 'msg msg-system';
    div.innerHTML = `<span class="msg-text">${escHtml(text)}</span>`;
    feed.appendChild(div);
    scrollFeed();
  }

  function showTyping() {
    const feed = document.getElementById('chat-feed');
    const div = document.createElement('div');
    div.className = 'msg msg-jarvis typing-indicator';
    div.id = 'typing-indicator';
    div.innerHTML = `<span class="msg-label">J.A.R.V.I.S.</span><span class="typing-dots"><span></span><span></span><span></span></span>`;
    feed.appendChild(div);
    scrollFeed();
  }

  function hideTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function setInputState(enabled) {
    const inp = document.getElementById('user-input');
    const btn = document.getElementById('send-btn');
    if (inp) inp.disabled = !enabled;
    if (btn) btn.disabled = !enabled;
    if (enabled && inp) inp.focus();
  }

  function scrollFeed() {
    const feed = document.getElementById('chat-feed');
    if (feed) feed.scrollTop = feed.scrollHeight;
  }

  function animateIn(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function formatText(text) {
    return escHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  function updateVoiceBtn() {
    const btn = document.getElementById('voice-toggle');
    if (btn) btn.classList.toggle('active', Voice.isVoiceEnabled());
  }

  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
  function getMemory() { return memory; }

  return { sendMessage, clearMemory, clearChat, addSystemMessage, getMemory, updateVoiceBtn };
})();

window.JARVIS = JARVIS;

// Boot sequence
document.addEventListener('DOMContentLoaded', () => {
  const voiceOk = Voice.init();
  const mem = JARVIS.getMemory();
  Voice.setVoiceEnabled(mem.voiceEnabled);
  JARVIS.updateVoiceBtn();

  // Input handler
  const input = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  function submit() {
    const val = input.value.trim();
    if (val) { input.value = ''; JARVIS.sendMessage(val); }
  }

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } });
  sendBtn.addEventListener('click', submit);

  // Voice mic button
  const micBtn = document.getElementById('mic-btn');
  if (voiceOk && micBtn) {
    Voice.on('result', (transcript) => {
      input.value = transcript;
      micBtn.classList.remove('listening');
      JARVIS.sendMessage(transcript);
      input.value = '';
    });
    Voice.on('start', () => micBtn.classList.add('listening'));
    Voice.on('end', () => micBtn.classList.remove('listening'));
    Voice.on('error', () => micBtn.classList.remove('listening'));

    micBtn.addEventListener('click', () => {
      if (Voice.isCurrentlyListening()) { Voice.stop(); }
      else { Voice.listen(); }
    });
  } else if (micBtn) {
    micBtn.style.opacity = '0.3';
    micBtn.title = 'Voice input not supported in this browser';
  }

  // Voice output toggle
  const voiceToggle = document.getElementById('voice-toggle');
  if (voiceToggle) {
    voiceToggle.addEventListener('click', () => {
      const next = !Voice.isVoiceEnabled();
      Voice.setVoiceEnabled(next);
      const m = JARVIS.getMemory();
      m.voiceEnabled = next;
      JARVIS.updateVoiceBtn();
    });
  }

  // Clear btn
  const clearBtn = document.getElementById('clear-btn');
  if (clearBtn) clearBtn.addEventListener('click', () => JARVIS.clearChat());

  // HUD clock
  function updateClock() {
    const now = new Date();
    const timeEl = document.getElementById('hud-time');
    const dateEl = document.getElementById('hud-date');
    if (timeEl) timeEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Boot greeting
  setTimeout(() => {
    const greet = `All systems online. Good ${getTimeOfDay()}, Sir. J.A.R.V.I.S. is fully operational and standing by.`;
    JARVIS.addSystemMessage(greet);
    if (Voice.isVoiceEnabled()) Voice.speak(greet);
  }, 800);

  function getTimeOfDay() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }

  // Rotating HUD status messages
  const statusMsgs = [
    'MONITORING ACTIVE', 'AI CORE ONLINE', 'NEURAL NET READY',
    'SCANNING ENVIRONMENT', 'SYSTEMS NOMINAL', 'STANDING BY',
  ];
  let statusIdx = 0;
  const statusEl = document.getElementById('hud-status-text');
  if (statusEl) {
    setInterval(() => {
      statusIdx = (statusIdx + 1) % statusMsgs.length;
      statusEl.style.opacity = '0';
      setTimeout(() => { statusEl.textContent = statusMsgs[statusIdx]; statusEl.style.opacity = '1'; }, 300);
    }, 3000);
  }
});
