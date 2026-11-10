# 🔀 The Wrong Input Keypad (Chaos Keyboard)

An interactive, stylish, and humorous **"Wrong Input Keypad"** built with vanilla **HTML5**, **CSS3**, and **JavaScript** (featuring real-time sound synthesis via the Web Audio API).

Designed to simulate an intentionally mischievous, trolling, and cybersecurity-adversarial keyboard that refuses to do what you tell it to do!

---

## 🚀 How to Run

Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
No build steps, no dependencies, no Node.js required!

```bash
# You can double-click index.html or run:
start index.html
```

---

## 🎮 Key Features & Mischief Modes

### 1. Three Swappable Keypad Layouts
* **🔢 PIN Keypad**: High-stakes 3x4 ATM / safe dialer keypad with numeric grid, Clear, Backspace, and Submit.
* **⌨️ Full Keyboard**: Complete multi-row QWERTY keyboard with Tab, Caps Lock, Shift, Space, and Scramble buttons.
* **🧮 Troll Calculator**: A calculator from alternate dimension where math operates on emotional logic (`2 + 2 = 5`).

### 2. Six Mischief Modes
* **Fat Finger (Neighbor Keys)**: Clicking or typing a key activates an adjacent neighbor instead (e.g., pressing `5` outputs `2`, `4`, `6`, or `8`).
* **Opposite Day (Atbash Inversion)**: Mirrors characters (`1` becomes `9`, `A` becomes `Z`, `Space` becomes `_`).
* **The ATM Shuffler**: Physical key positions shuffle dynamically across the grid with every keystroke!
* **Slippery / Runaway Keys**: Buttons physically dodge and flee away from your mouse cursor when you attempt to click them.
* **Evil Autocorrect**: Inconspicuously replaces typed words with ridiculous substitutions mid-sentence.
* **Total Mayhem**: Combines all modes simultaneously with screen glitches, shakes, and emoji intrusions!

### 3. Tactile Feedback & Sound Synthesizer (`audio.js`)
* **Zero external audio downloads**: Synthesized directly in real-time with the browser's **Web Audio API**.
* Realistic mechanical key clicks, cartoon "bonk" errors, dissonance buzzers, dodge slide-whistles, shuffle whooshes, and victory fanfares.
* Toggleable Sound ON / OFF.

### 4. Interactive Challenge Mini-Game
* Gives you a **Target Mission** (e.g. `1337`, `HELP`, `2026`, `OPEN`).
* Can you outwit the keypad and successfully submit the target sequence?
* Beat the challenge to unlock the **Impossible Victory** celebration!

### 5. Diagnostics & Custom Modifiers
* **💢 Frustration Meter**: Tracks Keystrokes, Trolled count, and Intent Kept percentage with dynamic commentary.
* **Backspace Trap Toggle**: Reverses backspace to add more chaos instead of deleting.
* **Screen Shake & Glitch**: CRT monitor vibration effect upon wrong inputs.
* **Key Obfuscation (Ghost Keys)**: Blurs and flickers key labels.
* **😇 Angel Mode**: A mercy toggle that restores honest typing so you can test the difference.
* **Key Mapping Matrix**: A live hacker's cheat-sheet revealing current output mutations.
* **Physical Keyboard Support**: Typing on your physical keyboard also triggers the keypad with tactile visual presses!

---

## 📁 File Structure
```
WRONG INPUT KEYBOARD/
├── index.html       # Semantic HTML layout and terminal UI structure
├── styles.css       # Cyberpunk glassmorphism, 3D tactile keys, CRT effects
├── script.js        # Core wrong input logic, neighbor maps, and game engine
├── audio.js         # Web Audio API procedural sound synthesizer
└── README.md        # Documentation and feature guide
```

