    caretElement?: HTMLElement | undefined | null;
    loop?: boolean;
  }
  
  class Typewriter {
    private text: string;
    private speed: number;
    private element: HTMLElement;
    private caretElement?: HTMLElement | undefined | null;
    private index: number;
    private blinkInterval?: ReturnType<typeof setTimeout>;
