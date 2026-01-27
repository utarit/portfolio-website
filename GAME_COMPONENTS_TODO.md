# Zehra Game Components - Migration Guide

**Status:** Components 1-2 migrated, 10 remaining
**Context:** Due to complexity, this document provides the migration plan

---

## ✅ Completed (2/12)
- [x] CatGif.astro
- [x] SectionHeading.astro

## 🚧 Remaining Components (10/12)

### Priority 1: Simple Interactive Components
1. **Dialog.tsx** → `src/components/solid/Dialog.tsx`
   - Modal dialog component
   - Uses createSignal for open/close state
   - Props: isOpen, onClose, children

2. **ResultBar.tsx** → `src/components/solid/ResultBar.tsx`
   - Progress/result display
   - Props: result, message

### Priority 2: Phone Simulation
3. **PhoneShell.tsx** → `src/components/solid/PhoneShell.tsx`
   - Phone container with styling
   - Props: children

4. **PhoneLockScreen.tsx** → `src/components/solid/PhoneLockScreen.tsx`
   - Lock screen UI
   - Uses createSignal for unlock state
   - Props: onUnlock

### Priority 3: Chat System
5. **useMessages.ts** → `src/lib/useMessages.ts`
   - Message state management hook
   - Convert React hooks to SolidJS createSignal/createEffect
   - Returns: messages, addMessage, clearMessages

6. **Messenger.tsx** → `src/components/solid/Messenger.tsx`
   - Message display component
   - Uses For loop for messages
   - Props: messages

7. **ChatApp.tsx** → `src/components/solid/ChatApp.tsx`
   - Main chat interface
   - Integrates Messenger + input
   - Uses useMessages hook

8. **FinalChat.tsx** → `src/components/solid/FinalChat.tsx`
   - Final conversation component
   - Similar to ChatApp but with specific data

### Priority 4: Game Logic
9. **HintsModal.tsx** → `src/components/solid/HintsModal.tsx`
   - Hints system modal
   - Uses createSignal for modal state
   - Props: hints, isOpen, onClose

10. **GameContent.tsx** → `src/components/solid/GameContent.tsx`
    - Main game orchestration
    - Manages game state, progress
    - Integrates all other components

---

## 📝 Migration Pattern Reference

### React → SolidJS Conversion

```typescript
// React
import { useState, useEffect } from 'react';

function Component() {
  const [state, setState] = useState(initial);
  
  useEffect(() => {
    // effect
  }, [deps]);
  
  return <div className="...">{state}</div>;
}

// SolidJS
import { createSignal, createEffect } from 'solid-js';

function Component() {
  const [state, setState] = createSignal(initial);
  
  createEffect(() => {
    // effect
  });
  
  return <div class="...">{state()}</div>;
}
```

### Key Differences
- `className` → `class`
- `{state}` → `{state()}`
- `{array.map()}` → `<For each={array}>`
- `{condition && <Component />}` → `<Show when={condition}>`

---

## 🎯 Integration Plan

### Step 1: Update ZehraGameWrapper
Add GameContent component to the wrapper:

```typescript
// src/components/solid/ZehraGameWrapper.tsx
import { GameContent } from './GameContent';

export function ZehraGameWrapper(props) {
  return (
    <LanguageProvider initialLanguage={props.initialLanguage}>
      <main>
        <SocialBanner />
        <div class="flex flex-col justify-center items-center my-4 md:mb-0 gap-4 px-4">
          <LanguageToggle />
          <GameContent />  {/* Add this */}
        </div>
      </main>
    </LanguageProvider>
  );
}
```

### Step 2: GameContent Structure
```typescript
// src/components/solid/GameContent.tsx
export function GameContent() {
  const { t } = useLanguage();
  const [gameState, setGameState] = createSignal('intro');
  
  return (
    <div class="w-full max-w-4xl">
      <Show when={gameState() === 'intro'}>
        {/* Intro content */}
      </Show>
      
      <Show when={gameState() === 'playing'}>
        <PhoneShell>
          <ChatApp />
        </PhoneShell>
      </Show>
      
      <Show when={gameState() === 'complete'}>
        <ResultBar result="success" />
      </Show>
    </div>
  );
}
```

---

## 📂 File Locations

```
portfolio-astro/src/
├── components/solid/
│   ├── Dialog.tsx
│   ├── ResultBar.tsx
│   ├── PhoneShell.tsx
│   ├── PhoneLockScreen.tsx
│   ├── Messenger.tsx
│   ├── ChatApp.tsx
│   ├── FinalChat.tsx
│   ├── HintsModal.tsx
│   └── GameContent.tsx
└── lib/
    └── useMessages.ts
```

---

## ⚠️ Important Notes

1. **Context Access**: All components using translations must be inside LanguageProvider
2. **State Management**: Use createSignal for local state, createStore for complex state
3. **Effects**: Use createEffect for side effects, cleanup with return function
4. **Props**: SolidJS props are accessed directly, not destructured in function signature
5. **Children**: Use props.children, not destructured

---

## 🔄 Next Steps

Due to context window constraints (77% used), the recommended approach is:

1. **Option A**: Continue in new conversation
   - Copy this document
   - Migrate components one by one
   - Test each component

2. **Option B**: Batch migration
   - Create all component files with basic structure
   - Fill in logic incrementally
   - Test integrated system

3. **Option C**: Simplified version
   - Create minimal working game
   - Add features incrementally
   - Focus on core gameplay first

---

## 📊 Estimated Effort

- Simple components (Dialog, ResultBar): 30 min
- Phone components: 45 min
- Chat system: 1-2 hours
- Game logic: 2-3 hours
- Integration & testing: 1-2 hours

**Total: 5-8 hours of focused work**

---

**Current files to reference:**
- Original components: `/components/zehra-game/`
- Data files: `/data/zehra*.tsx`
- Translations: `/lib/translations/zehra*.ts`