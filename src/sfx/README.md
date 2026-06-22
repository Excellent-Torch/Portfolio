# UI Sound Effects (SFX)

This module provides global UI sound effects using the Web Audio API.
All sounds are synthesized programmatically — no external audio files required.

## Folder Structure & Naming Scheme

```
src/sfx/
├── sounds.ts        # Core sound engine (Web Audio API synthesis)
├── SfxContext.tsx    # React context + provider + global event delegation
├── index.ts         # Barrel exports
└── README.md        # This file
```

## Sound Naming

| Name        | Triggered When                    | Duration | Character |
|-------------|-----------------------------------|----------|-----------|
| `hover`     | Mouse enters an interactive element | ~120ms   | Soft blip |
| `unhover`   | Mouse leaves an interactive element | ~100ms   | Descending pip |
| `select`    | Clicking on an interactive element  | ~80ms    | Crisp click |
| `close`     | Closing a panel/modal/menu          | ~200ms   | Double descending tone |
| `typeTick`  | Each character of a bot reply       | ~35ms    | Mechanical keyboard clack (square + noise) |
| `typeReturn`| Bot finishes typing a reply         | ~120ms   | Low square blip (carriage return) |

## How It Works

1. **`sounds.ts`** — Four pure functions (`playHover`, `playUnhover`, `playSelect`, `playClose`) create short audio buffers via the Web Audio API and play them immediately.

2. **`SfxContext.tsx`** — `<SfxProvider>` wraps the app and adds global event delegation on `document` for `mouseover`, `mouseout`, and `click` events. Any interactive element (`a`, `button`, `[role="button"]`, etc.) automatically gets hover/unhover/select sounds.

3. **`useSfx()` hook** — Exposes `play(name)` and `setEnabled(bool)` for manual use in components (e.g., closing the mobile menu or chat widget).

## Usage

### Automated (global delegation — no code needed)
All `<a>`, `<button>`, and `[role="button"]` elements get hover/unhover/click sounds automatically after adding `<SfxProvider>` to the app root.

### Manual (for close actions or custom triggers)
```tsx
import { useSfx } from '../sfx';

const MyComponent = () => {
  const { play } = useSfx();

  const handleClose = () => {
    play('close');
    // ... close logic
  };

  return <button onClick={handleClose}>✕</button>;
};
```

### Toggle sounds on/off
```tsx
const { setEnabled } = useSfx();
setEnabled(false); // mute
```

## Performance

- Single shared `AudioContext` instance (auto-resumed on user interaction).
- Sounds are under 200ms each — negligible CPU cost.
- Global listener uses event delegation (one listener per event type, not per element).
- Hover throttled to 60ms minimum interval to prevent rapid-fire sounds.
