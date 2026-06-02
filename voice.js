// J.A.R.V.I.S. Voice Module
const Voice = (() => {
  let recognition = null;
  let synth = window.speechSynthesis;
  let isListening = false;
  let voiceEnabled = true;
  let preferredVoice = null;
  let onResultCb = null;
  let onStartCb = null;
  let onEndCb = null;
  let onErrorCb = null;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const supported = !!SpeechRecognition;

  function init() {
    if (!supported) return false;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim();
      if (onResultCb) onResultCb(transcript);
    };
    recognition.onstart = () => {
      isListening = true;
      if (onStartCb) onStartCb();
    };
    recognition.onend = () => {
      isListening = false;
      if (onEndCb) onEndCb();
    };
    recognition.onerror = (e) => {
      isListening = false;
      if (onErrorCb) onErrorCb(e.error);
    };

    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    return true;
  }

  function loadVoices() {
    const voices = synth.getVoices();
    const preferred = ['Google UK English Male', 'Microsoft David', 'Alex', 'Daniel'];
    for (const name of preferred) {
      const v = voices.find(v => v.name.includes(name));
      if (v) { preferredVoice = v; break; }
    }
    if (!preferredVoice) {
      preferredVoice = voices.find(v => v.lang.startsWith('en') && v.gender === 'male')
        || voices.find(v => v.lang.startsWith('en'))
        || voices[0];
    }
  }

  function listen() {
    if (!supported || isListening) return false;
    try {
      recognition.start();
      return true;
    } catch (e) {
      return false;
    }
  }

  function stop() {
    if (recognition && isListening) {
      recognition.stop();
    }
  }

  function speak(text, onDone) {
    if (!voiceEnabled || !text) { if (onDone) onDone(); return; }
    synth.cancel();
    const clean = text.replace(/[*#`_~]/g, '').replace(/\n+/g, '. ').substring(0, 500);
    const utt = new SpeechSynthesisUtterance(clean);
    utt.rate = 0.95;
    utt.pitch = 0.85;
    utt.volume = 1;
    if (preferredVoice) utt.voice = preferredVoice;
    utt.onend = onDone || null;
    utt.onerror = onDone || null;
    synth.speak(utt);
  }

  function cancelSpeech() { synth.cancel(); }

  function setVoiceEnabled(val) { voiceEnabled = val; if (!val) synth.cancel(); }
  function isVoiceEnabled() { return voiceEnabled; }
  function isSupported() { return supported; }
  function isCurrentlyListening() { return isListening; }

  function on(event, cb) {
    if (event === 'result') onResultCb = cb;
    if (event === 'start') onStartCb = cb;
    if (event === 'end') onEndCb = cb;
    if (event === 'error') onErrorCb = cb;
  }

  return { init, listen, stop, speak, cancelSpeech, setVoiceEnabled, isVoiceEnabled, isSupported, isCurrentlyListening, on };
})();

window.Voice = Voice;
