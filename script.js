/**
 * The Wrong Input Keypad - Core Engine
 * Handcrafted with mischief and high-fidelity interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const terminalScreen = document.getElementById('terminalScreen');
  const screenStatus = document.getElementById('screenStatus');
  const currentModeBadge = document.getElementById('currentModeBadge');
  const displayOutput = document.getElementById('displayOutput');
  const charCount = document.getElementById('charCount');
  const pressedKeyEl = document.getElementById('pressedKey');
  const producedKeyEl = document.getElementById('producedKey');
  const lastKeyInfo = document.getElementById('lastKeyInfo');
  
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const resetAppBtn = document.getElementById('resetAppBtn');
  const copyBtn = document.getElementById('copyBtn');
  const clearBtn = document.getElementById('clearBtn');
  
  const layoutTabs = document.querySelectorAll('.tab-btn');
  const keypadLayouts = document.querySelectorAll('.keypad-layout');
  const keypadFrame = document.getElementById('keypadFrame');
  const qwertyLayout = document.getElementById('qwertyLayout');

  // Challenge elements
  const challengeTarget = document.getElementById('challengeTarget');
  const challengeAttempts = document.getElementById('challengeAttempts');
  const newChallengeBtn = document.getElementById('newChallengeBtn');
  const victoryModal = document.getElementById('victoryModal');
  const victoryStats = document.getElementById('victoryStats');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Frustration meter elements
  const frustrationPercent = document.getElementById('frustrationPercent');
  const meterFill = document.getElementById('meterFill');
  const meterQuote = document.getElementById('meterQuote');
  const statKeystrokes = document.getElementById('statKeystrokes');
  const statWrongs = document.getElementById('statWrongs');
  const statAccuracy = document.getElementById('statAccuracy');

  // Mode radio inputs
  const modeRadios = document.querySelectorAll('input[name="mischiefMode"]');

  // Modifier checkboxes
  const toggleBackspaceTrap = document.getElementById('toggleBackspaceTrap');
  const toggleScreenShake = document.getElementById('toggleScreenShake');
  const toggleGhostKeys = document.getElementById('toggleGhostKeys');
  const toggleAngelMode = document.getElementById('toggleAngelMode');

  // Hacker Hint & Cheat Sheet
  const showCheatSheetBtn = document.getElementById('showCheatSheetBtn');
  const cheatMatrix = document.getElementById('cheatMatrix');
  const matrixList = document.getElementById('matrixList');
  const hackerHint = document.getElementById('hackerHint');

  // Special Keyboard buttons
  const capsBtn = document.getElementById('capsBtn');
  const shiftBtn = document.getElementById('shiftBtn');
  const manualShuffleBtn = document.getElementById('manualShuffleBtn');
  const quickToggleMode = document.getElementById('quickToggleMode');
  const toastContainer = document.getElementById('toastContainer');

  // --- State Variables ---
  let buffer = '';
  let currentLayout = 'pin';
  let currentMode = 'fatfinger';
  let capsLock = false;
  let shiftActive = false;
  let totalKeystrokes = 0;
  let wrongCount = 0;
  let missionAttempts = 0;
  let calcAcc = 0;
  let calcOp = null;
  let resetCalcOnNext = false;

  const challenges = ['1337', '7777', '2026', 'HELP', 'OPEN', '404', 'CODE', 'CATS', '9999'];
  let currentMission = '1337';

  const quotes = [
    { max: 15, text: '"I have a good feeling about this key..."' },
    { max: 35, text: '"Wait... did I click that or did it click me?"' },
    { max: 55, text: '"Okay, this keypad is definitely gaslighting me."' },
    { max: 75, text: '"I SWEAR ON MY LIFE I PRESSED THE RIGHT NUMBER!"' },
    { max: 90, text: '"Self-control failing. Keypad gaining absolute consciousness."' },
    { max: 100, text: '"MAXIMUM FRUSTRATION REACHED. The keypad has won."' }
  ];

  // Adjacent / Fat Finger Neighbor Maps
  const pinNeighbors = {
    '1': ['2', '4'],
    '2': ['1', '3', '5'],
    '3': ['2', '6'],
    '4': ['1', '5', '7'],
    '5': ['2', '4', '6', '8'],
    '6': ['3', '5', '9'],
    '7': ['4', '8'],
    '8': ['7', '5', '9', '0'],
    '9': ['6', '8'],
    '0': ['8', '7', '9']
  };

  const qwertyNeighbors = {
    'q': ['w', 'a', '1'], 'w': ['q', 'e', 's', '2'], 'e': ['w', 'r', 'd', '3'],
    'r': ['e', 't', 'f', '4'], 't': ['r', 'y', 'g', '5'], 'y': ['t', 'u', 'h', '6'],
    'u': ['y', 'i', 'j', '7'], 'i': ['u', 'o', 'k', '8'], 'o': ['i', 'p', 'l', '9'],
    'p': ['o', '[', '0'], 'a': ['q', 's', 'z'], 's': ['a', 'd', 'w', 'x'],
    'd': ['s', 'f', 'e', 'c'], 'f': ['d', 'g', 'r', 'v'], 'g': ['f', 'h', 't', 'b'],
    'h': ['g', 'j', 'y', 'n'], 'j': ['h', 'k', 'u', 'm'], 'k': ['j', 'l', 'i', ','],
    'l': ['k', ';', 'o', '.'], 'z': ['a', 'x'], 'x': ['z', 'c', 's'],
    'c': ['x', 'v', 'd'], 'v': ['c', 'b', 'f'], 'b': ['v', 'n', 'g'],
    'n': ['b', 'm', 'h'], 'm': ['n', 'j', 'k'], '1': ['2', 'q', '`'],
    '2': ['1', '3', 'w'], '3': ['2', '4', 'e'], '4': ['3', '5', 'r'],
    '5': ['4', '6', 't'], '6': ['5', '7', 'y'], '7': ['6', '8', 'u'],
    '8': ['7', '9', 'i'], '9': ['8', '0', 'o'], '0': ['9', '-', 'p'],
    '-': ['0', '='], '=': ['-', 'BACKSPACE'], ' ': ['v', 'b', 'n', 'c', 'm']
  };

  // Atbash / Opposite Map
  const oppositeMap = {
    '1': '9', '2': '8', '3': '7', '4': '6', '5': '0',
    '6': '4', '7': '3', '8': '2', '9': '1', '0': '5',
    'a': 'z', 'b': 'y', 'c': 'x', 'd': 'w', 'e': 'v',
    'f': 'u', 'g': 't', 'h': 's', 'i': 'r', 'j': 'q',
    'k': 'p', 'l': 'o', 'm': 'n', 'n': 'm', 'o': 'l',
    'p': 'k', 'q': 'j', 'r': 'i', 's': 'h', 't': 'g',
    'u': 'f', 'v': 'e', 'w': 'd', 'x': 'c', 'y': 'b',
    'z': 'a', ' ': '_'
  };

  // Autocorrect trap phrases
  const corruptions = [
    { target: 'pass', replacement: 'pasta' },
    { target: '12', replacement: '99' },
    { target: 'admin', replacement: 'noob' },
    { target: 'cat', replacement: 'doge' },
    { target: 'help', replacement: 'no_escape' },
    { target: 'open', replacement: 'locked' },
    { target: 'safe', replacement: 'compromised' },
    { target: 'love', replacement: 'chaos' }
  ];

  // --- Initialize App ---
  initApp();

  function initApp() {
    pickNewChallenge();
    setupEventListeners();
    updateDisplay();
    updateCheatMatrix();
  }

  function setupEventListeners() {
    // Layout tab switching
    layoutTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetLayout = tab.getAttribute('data-layout');
        switchLayout(targetLayout);
      });
    });

    // Sound toggle button
    soundToggleBtn.addEventListener('click', () => {
      const isSoundOn = window.soundEngine.toggleSound();
      const soundIcon = soundToggleBtn.querySelector('.sound-icon');
      const soundLabel = soundToggleBtn.querySelector('.sound-label');
      if (isSoundOn) {
        soundIcon.textContent = '🔊';
        soundLabel.textContent = 'Sound ON';
        showToast('Sound enabled', 'info');
      } else {
        soundIcon.textContent = '🔇';
        soundLabel.textContent = 'Sound OFF';
        showToast('Sound muted', 'info');
      }
    });

    // Reset button
    resetAppBtn.addEventListener('click', () => {
      buffer = '';
      totalKeystrokes = 0;
      wrongCount = 0;
      updateDisplay();
      updateStats();
      showToast('Keypad memory reset!', 'info');
    });

    // Clear and Copy buttons
    clearBtn.addEventListener('click', () => {
      buffer = '';
      window.soundEngine.playClick();
      updateDisplay();
    });

    copyBtn.addEventListener('click', () => {
      if (!buffer) {
        showToast('Nothing to copy!', 'error');
        return;
      }
      navigator.clipboard.writeText(buffer).then(() => {
        showToast('Copied to clipboard... probably!', 'success');
      }).catch(() => {
        showToast('Clipboard refused your bad input!', 'error');
      });
    });

    // Mischief Mode radios
    modeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        currentMode = e.target.value;
        currentModeBadge.textContent = currentMode.toUpperCase();
        window.soundEngine.playShuffle();
        showToast(`Mode switched to ${currentMode.toUpperCase()}`, 'troll');
        updateCheatMatrix();
        resetSlipperyKeys();
      });
    });

    // Modifiers
    toggleGhostKeys.addEventListener('change', (e) => {
      if (e.target.checked) {
        keypadFrame.classList.add('ghost-mode');
        showToast('Key labels obscured!', 'troll');
      } else {
        keypadFrame.classList.remove('ghost-mode');
      }
    });

    toggleAngelMode.addEventListener('change', (e) => {
      if (e.target.checked) {
        screenStatus.textContent = 'STATUS: ANGEL MODE (SAFE)';
        screenStatus.style.color = 'var(--accent-green)';
        showToast('Angel mode enabled: Keys will behave honestly.', 'success');
      } else {
        screenStatus.textContent = 'STATUS: ACTIVE MISCHIEF';
        screenStatus.style.color = 'var(--accent-orange)';
        showToast('Mischief restored!', 'troll');
      }
    });

    // Hacker Hint toggle
    showCheatSheetBtn.addEventListener('click', () => {
      cheatMatrix.classList.toggle('hidden');
      updateCheatMatrix();
    });

    // Challenge New button
    newChallengeBtn.addEventListener('click', () => {
      pickNewChallenge();
      showToast('New mission assigned!', 'info');
    });

    // Modal Close
    modalCloseBtn.addEventListener('click', () => {
      victoryModal.classList.add('hidden');
      pickNewChallenge();
    });

    // Quick toggle mode button on bottom row
    quickToggleMode.addEventListener('click', () => {
      const modes = ['fatfinger', 'opposite', 'shuffler', 'slippery', 'autocorrupt', 'mayhem'];
      const nextIdx = (modes.indexOf(currentMode) + 1) % modes.length;
      currentMode = modes[nextIdx];
      const matchRadio = document.querySelector(`input[name="mischiefMode"][value="${currentMode}"]`);
      if (matchRadio) matchRadio.checked = true;
      currentModeBadge.textContent = currentMode.toUpperCase();
      window.soundEngine.playGlitch();
      showToast(`Quick Shifted to: ${currentMode.toUpperCase()}`, 'troll');
      updateCheatMatrix();
    });

    // Manual Shuffle Button
    manualShuffleBtn.addEventListener('click', () => {
      shuffleKeypadDOM();
      window.soundEngine.playShuffle();
      showToast('Keys violently scrambled!', 'troll');
    });

    // Caps & Shift Buttons
    capsBtn.addEventListener('click', () => {
      capsLock = !capsLock;
      capsBtn.classList.toggle('active', capsLock);
      window.soundEngine.playClick();
      updateKeyDisplayLabels();
    });

    shiftBtn.addEventListener('click', () => {
      shiftActive = !shiftActive;
      shiftBtn.classList.toggle('active', shiftActive);
      window.soundEngine.playClick();
      updateKeyDisplayLabels();
    });

    // Attach click and hover listeners to all keypad buttons
    setupKeypadButtons();

    // Attach physical keyboard listener
    window.addEventListener('keydown', handlePhysicalKeyPress);
  }

  // Set up listeners on all interactive keys
  function setupKeypadButtons() {
    const allKeys = keypadFrame.querySelectorAll('.key-btn');
    allKeys.forEach(btn => {
      // Click event
      btn.addEventListener('click', (e) => {
        const rawKey = btn.getAttribute('data-key');
        if (rawKey) {
          triggerKeyPress(rawKey, btn);
        }
      });

      // Slippery / Runaway dodge on mouseover
      btn.addEventListener('mouseenter', (e) => {
        if (currentMode === 'slippery' || (currentMode === 'mayhem' && Math.random() < 0.35)) {
          dodgeButton(btn);
        }
      });
    });
  }

  // Dodge animation for slippery keys
  function dodgeButton(btn) {
    if (btn.classList.contains('action-key') || btn.classList.contains('special-key')) {
      return; // Leave special actions clickable or dodge less
    }
    const deltaX = (Math.random() - 0.5) * 70;
    const deltaY = (Math.random() - 0.5) * 50;
    btn.classList.add('slippery-dodge');
    btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    window.soundEngine.playSlippery();

    setTimeout(() => {
      btn.style.transform = '';
    }, 700);
  }

  function resetSlipperyKeys() {
    const allKeys = keypadFrame.querySelectorAll('.key-btn');
    allKeys.forEach(btn => {
      btn.style.transform = '';
    });
  }

  // Switch between PIN, QWERTY, and Calculator layouts
  function switchLayout(layoutName) {
    currentLayout = layoutName;
    layoutTabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-layout') === layoutName);
    });

    keypadLayouts.forEach(layout => {
      layout.classList.toggle('active', layout.id === `${layoutName}Layout`);
    });

    window.soundEngine.playClick();
    updateCheatMatrix();
  }

  // Handle physical keyboard inputs
  function handlePhysicalKeyPress(e) {
    // Ignore browser shortcuts
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    let key = e.key;

    // Map common keys
    if (key === 'Backspace') key = 'BACKSPACE';
    else if (key === 'Enter') key = 'ENTER';
    else if (key === 'Escape') key = 'CLEAR';
    else if (key === 'Tab') {
      e.preventDefault();
      key = 'TAB';
    }

    // Find corresponding button in the active layout for visual tactile effect
    const activeLayoutEl = document.querySelector('.keypad-layout.active');
    if (!activeLayoutEl) return;

    let targetBtn = activeLayoutEl.querySelector(`[data-key="${key.toLowerCase()}"]`) ||
                    activeLayoutEl.querySelector(`[data-key="${key.toUpperCase()}"]`) ||
                    activeLayoutEl.querySelector(`[data-key="${key}"]`);

    if (targetBtn) {
      targetBtn.classList.add('pressed');
      setTimeout(() => targetBtn.classList.remove('pressed'), 120);
    }

    // Process key
    triggerKeyPress(key, targetBtn);
  }

  // CORE KEY PROCESSING
  function triggerKeyPress(inputKey, sourceBtnEl) {
    totalKeystrokes++;
    let intentKept = false;
    let produced = '';

    // Check if Angel Mode is active
    if (toggleAngelMode.checked) {
      produced = executeNormalKey(inputKey);
      intentKept = true;
    } else {
      // Run through Mischief Engine
      const result = processMischiefKey(inputKey);
      produced = result.produced;
      intentKept = result.intended;
    }

    if (!intentKept) {
      wrongCount++;
      handleTrollReaction();
    } else {
      window.soundEngine.playClick();
    }

    // Update screen info
    pressedKeyEl.textContent = formatKeyName(inputKey);
    producedKeyEl.textContent = formatKeyName(produced);

    // Apply Autocorrect if enabled
    if (currentMode === 'autocorrupt' || currentMode === 'mayhem') {
      checkAutocorrupt();
    }

    // Check Shuffler mode triggers
    if ((currentMode === 'shuffler' || (currentMode === 'mayhem' && Math.random() < 0.3)) && !toggleAngelMode.checked) {
      shuffleKeypadDOM();
    }

    // Check Challenge Goal
    checkChallengeSuccess();

    // Update stats and display
    updateDisplay();
    updateStats();
  }

  // Standard keystroke behavior without trolls
  function executeNormalKey(key) {
    if (key === 'BACKSPACE') {
      buffer = buffer.slice(0, -1);
      return '[DEL]';
    } else if (key === 'CLEAR') {
      buffer = '';
      return '[CLR]';
    } else if (key === 'ENTER') {
      submitBuffer();
      return '[ENTER]';
    } else if (key === 'TAB') {
      buffer += '  ';
      return '[TAB]';
    } else if (key === 'CAPS' || key === 'SHIFT') {
      return `[${key}]`;
    } else if (currentLayout === 'calculator' && isCalcOperator(key)) {
      handleCalcKey(key);
      return key;
    } else {
      let charToAdd = key;
      if (charToAdd.length === 1) {
        const isUpper = (capsLock && !shiftActive) || (!capsLock && shiftActive);
        charToAdd = isUpper ? charToAdd.toUpperCase() : charToAdd.toLowerCase();
      }
      buffer += charToAdd;
      if (shiftActive) {
        shiftActive = false;
        shiftBtn.classList.remove('active');
        updateKeyDisplayLabels();
      }
      return charToAdd;
    }
  }

  // MISCHIEF ALGORITHM
  function processMischiefKey(key) {
    // 1. Backspace Trap
    if (key === 'BACKSPACE') {
      if (toggleBackspaceTrap.checked) {
        window.soundEngine.playBuzzer();
        const trollAdditions = ['NO', '!', '42', 'X', '?', 'ERR', '9'];
        const addition = trollAdditions[Math.floor(Math.random() * trollAdditions.length)];
        buffer += addition;
        showToast('Backspace is in reverse today!', 'error');
        return { produced: `+${addition}`, intended: false };
      } else {
        buffer = buffer.slice(0, -1);
        return { produced: '[DEL]', intended: true };
      }
    }

    // 2. Clear key
    if (key === 'CLEAR') {
      if (Math.random() < 0.25) {
        // Troll clear: duplicates buffer
        buffer += buffer;
        showToast('Clear button cloned your input instead!', 'troll');
        return { produced: '[DUP]', intended: false };
      } else {
        buffer = '';
        return { produced: '[CLR]', intended: true };
      }
    }

    // 3. Enter key
    if (key === 'ENTER') {
      submitBuffer();
      return { produced: '[ENTER]', intended: true };
    }

    // Calculator Keys
    if (currentLayout === 'calculator' && isCalcOperator(key)) {
      const calcResult = handleTrollCalc(key);
      return { produced: calcResult, intended: false };
    }

    if (key === 'CAPS' || key === 'SHIFT') {
      return { produced: `[${key}]`, intended: true };
    }

    // Character keys transformation
    let targetChar = key.toLowerCase();
    let producedChar = targetChar;
    let intended = false;

    switch (currentMode) {
      case 'fatfinger':
        producedChar = getNeighborKey(targetChar);
        break;

      case 'opposite':
        producedChar = oppositeMap[targetChar] || getOppositeFallback(targetChar);
        break;

      case 'shuffler':
        // Types adjacent or random because keys are shuffled
        producedChar = getNeighborKey(targetChar);
        break;

      case 'slippery':
        // Fat fingers slightly as mouse slipped
        if (Math.random() < 0.7) {
          producedChar = getNeighborKey(targetChar);
        } else {
          producedChar = targetChar;
          intended = true;
        }
        break;

      case 'autocorrupt':
        // Slightly lower typo chance initially, relies on autocorrect logic
        if (Math.random() < 0.4) {
          producedChar = getNeighborKey(targetChar);
        } else {
          producedChar = targetChar;
          intended = true;
        }
        break;

      case 'mayhem':
      default:
        // Everything combined: 50% fat finger, 30% opposite, 20% random emoji/symbol
        const roll = Math.random();
        if (roll < 0.45) {
          producedChar = getNeighborKey(targetChar);
        } else if (roll < 0.8) {
          producedChar = oppositeMap[targetChar] || getOppositeFallback(targetChar);
        } else {
          const dingbats = ['💀', '🤡', '👾', '🔥', '💩', '⚠️', '🎲'];
          producedChar = dingbats[Math.floor(Math.random() * dingbats.length)];
        }
        break;
    }

    // Case handling
    const isUpper = (capsLock && !shiftActive) || (!capsLock && shiftActive);
    if (producedChar.length === 1 && /[a-zA-Z]/.test(producedChar)) {
      producedChar = isUpper ? producedChar.toUpperCase() : producedChar.toLowerCase();
    }

    buffer += producedChar;

    if (shiftActive) {
      shiftActive = false;
      shiftBtn.classList.remove('active');
      updateKeyDisplayLabels();
    }

    return { produced: producedChar, intended: producedChar.toLowerCase() === key.toLowerCase() };
  }

  // Neighbor key logic
  function getNeighborKey(char) {
    if (currentLayout === 'pin' && pinNeighbors[char]) {
      const pool = pinNeighbors[char];
      return pool[Math.floor(Math.random() * pool.length)];
    }

    if (qwertyNeighbors[char]) {
      const pool = qwertyNeighbors[char];
      return pool[Math.floor(Math.random() * pool.length)];
    }

    // Fallback: off-by-one charcode
    const code = char.charCodeAt(0);
    return String.fromCharCode(code + (Math.random() > 0.5 ? 1 : -1));
  }

  function getOppositeFallback(char) {
    if (/[0-9]/.test(char)) {
      return (9 - parseInt(char)).toString();
    }
    return '?';
  }

  // Autocorrect trap replacement
  function checkAutocorrupt() {
    corruptions.forEach(item => {
      const regex = new RegExp(item.target, 'gi');
      if (regex.test(buffer)) {
        buffer = buffer.replace(regex, item.replacement);
        window.soundEngine.playGlitch();
        showToast(`Autocorrect: "${item.target}" &rarr; "${item.replacement}" 🪄`, 'troll');
      }
    });
  }

  // Visual & Audio Troll reaction
  function handleTrollReaction() {
    window.soundEngine.playWrong();

    if (toggleScreenShake.checked) {
      terminalScreen.classList.remove('shake-screen', 'glitch-flash');
      void terminalScreen.offsetWidth; // Force CSS reflow
      terminalScreen.classList.add('shake-screen', 'glitch-flash');

      setTimeout(() => {
        terminalScreen.classList.remove('glitch-flash');
      }, 300);
    }
  }

  // Shuffle Keypad DOM elements
  function shuffleKeypadDOM() {
    const activeLayout = document.querySelector('.keypad-layout.active');
    if (!activeLayout) return;

    let grid;
    if (currentLayout === 'pin') {
      grid = activeLayout.querySelector('.pin-grid');
    } else if (currentLayout === 'calculator') {
      grid = activeLayout.querySelector('.calc-grid');
    } else {
      // QWERTY rows
      const rows = activeLayout.querySelectorAll('.keyboard-row');
      rows.forEach(row => {
        const keys = Array.from(row.querySelectorAll('.key-btn:not(.special-key)'));
        shuffleArray(keys);
        keys.forEach(k => row.appendChild(k));
      });
      return;
    }

    if (grid) {
      const keys = Array.from(grid.querySelectorAll('.key-btn:not(.action-key):not(.calc-op)'));
      shuffleArray(keys);
      keys.forEach(k => grid.appendChild(k));
    }
  }

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // Troll Calculator math
  function isCalcOperator(key) {
    return ['+', '-', '*', '/', '=', '±', '%'].includes(key);
  }

  function handleTrollCalc(op) {
    if (op === '=') {
      try {
        let evilResult;
        const roll = Math.random();
        if (roll < 0.3) {
          evilResult = '42';
        } else if (roll < 0.6) {
          evilResult = (eval(buffer || '0') + (Math.random() > 0.5 ? 1 : -1)).toString();
        } else if (roll < 0.8) {
          evilResult = 'NaN-NaN-Batman';
        } else {
          evilResult = 'undefined (emotional)';
        }
        buffer = evilResult;
        showToast('Calculator solved it with alternative math!', 'troll');
        return evilResult;
      } catch (e) {
        buffer = 'MATH_BURNT';
        return 'ERR';
      }
    } else if (op === '±') {
      buffer = buffer.startsWith('-') ? buffer.slice(1) : '-' + buffer;
      return '±';
    } else if (op === '%') {
      buffer += '🍔';
      return '%';
    } else {
      buffer += ` ${op} `;
      return op;
    }
  }

  function handleCalcKey(op) {
    if (op === '=') {
      try {
        buffer = eval(buffer.replace(/÷/g, '/').replace(/×/g, '*')).toString();
      } catch (e) {
        buffer = 'Error';
      }
    } else {
      buffer += op;
    }
  }

  // Submit Buffer verification
  function submitBuffer() {
    missionAttempts++;
    challengeAttempts.textContent = `Attempts: ${missionAttempts}`;

    if (buffer.trim() === currentMission) {
      triggerVictory();
    } else {
      window.soundEngine.playBuzzer();
      showToast(`Rejected: "${buffer}" does NOT match "${currentMission}"!`, 'error');
    }
  }

  // Check challenge success in real-time
  function checkChallengeSuccess() {
    if (buffer.trim() === currentMission) {
      triggerVictory();
    }
  }

  function triggerVictory() {
    window.soundEngine.playVictory();
    victoryStats.innerHTML = `
      Target Mission: <strong>${currentMission}</strong><br>
      Total Keystrokes: <strong>${totalKeystrokes}</strong><br>
      Trolls Endured: <strong>${wrongCount}</strong><br>
      Active Mischief Mode: <strong>${currentMode.toUpperCase()}</strong>
    `;
    victoryModal.classList.remove('hidden');
    showToast('MISSION ACCOMPLISHED! YOU DEFEATED THE KEYPAD!', 'success');
  }

  function pickNewChallenge() {
    let newOne = challenges[Math.floor(Math.random() * challenges.length)];
    while (newOne === currentMission) {
      newOne = challenges[Math.floor(Math.random() * challenges.length)];
    }
    currentMission = newOne;
    challengeTarget.textContent = currentMission;
    missionAttempts = 0;
    challengeAttempts.textContent = `Attempts: 0`;
  }

  // Update Display buffer on screen
  function updateDisplay() {
    if (!buffer) {
      displayOutput.innerHTML = '<span class="placeholder-text">Press keys below to experience pure frustration...</span>';
      charCount.textContent = '0 chars';
    } else {
      displayOutput.textContent = buffer;
      charCount.textContent = `${buffer.length} chars`;
    }
  }

  // Update Frustration statistics and quote
  function updateStats() {
    statKeystrokes.textContent = totalKeystrokes;
    statWrongs.textContent = wrongCount;

    const intentAccuracy = totalKeystrokes > 0
      ? Math.max(0, Math.round(((totalKeystrokes - wrongCount) / totalKeystrokes) * 100))
      : 100;
    statAccuracy.textContent = `${intentAccuracy}%`;

    // Frustration score calculation
    let frustration = Math.min(100, Math.round((wrongCount / Math.max(1, totalKeystrokes * 0.8)) * 100));
    if (wrongCount >= 10 && frustration < 70) frustration = 70;
    if (wrongCount >= 20) frustration = 100;
    if (totalKeystrokes === 0) frustration = 0;

    frustrationPercent.textContent = `${frustration}%`;
    meterFill.style.width = `${frustration}%`;

    // Update Quote
    const quoteObj = quotes.find(q => frustration <= q.max) || quotes[quotes.length - 1];
    meterQuote.textContent = quoteObj.text;
  }

  // Key labels update (caps/shift)
  function updateKeyDisplayLabels() {
    const isUpper = (capsLock && !shiftActive) || (!capsLock && shiftActive);
    const letterKeys = qwertyLayout.querySelectorAll('.key-btn[data-key]');
    letterKeys.forEach(k => {
      const keyVal = k.getAttribute('data-key');
      if (keyVal && keyVal.length === 1 && /[a-zA-Z]/.test(keyVal)) {
        k.textContent = isUpper ? keyVal.toUpperCase() : keyVal.toLowerCase();
      }
    });
  }

  // Cheat Sheet / Key matrix update
  function updateCheatMatrix() {
    matrixList.innerHTML = '';
    const sampleKeys = currentLayout === 'pin'
      ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      : ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'z', '1', '2', '5', '0', ' '];

    sampleKeys.forEach(k => {
      let outputSample = '?';
      if (toggleAngelMode.checked) {
        outputSample = k;
      } else if (currentMode === 'opposite') {
        outputSample = oppositeMap[k] || '?';
      } else if (currentMode === 'fatfinger') {
        const neighbors = (currentLayout === 'pin' ? pinNeighbors[k] : qwertyNeighbors[k]) || ['?'];
        outputSample = neighbors.join('/');
      } else if (currentMode === 'slippery') {
        outputSample = `${k} (or slips!)`;
      } else if (currentMode === 'autocorrupt') {
        outputSample = `${k} (corrupts words)`;
      } else {
        outputSample = '🎲 Chaos';
      }

      const item = document.createElement('div');
      item.className = 'matrix-item';
      item.innerHTML = `<strong>${k === ' ' ? 'SPC' : k}</strong> &rarr; <span>${outputSample}</span>`;
      matrixList.appendChild(item);
    });
  }

  function formatKeyName(key) {
    if (!key) return '-';
    if (key === ' ') return 'SPACE';
    return key;
  }

  // Toast Notification helper
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
});
