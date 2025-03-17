interface TypewriterOptions {
    text: string;
    speed: number;
    element: HTMLElement;
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
    private textInterval?: ReturnType<typeof setTimeout>;
    private loop: boolean;
  
    constructor(options: TypewriterOptions) {
      this.text = options.text;
      this.speed = options.speed;
      this.element = options.element;
      this.caretElement = options.caretElement;
      this.index = 0;
      this.loop = options.loop || false;
    }
  
    private animateText = () => {
      if (this.index < this.text.length) {
        this.element.textContent = this.text.slice(0, this.index + 1);
        this.index++;
        this.textInterval = setTimeout(this.animateText, this.speed);
      } else if (this.loop) {
        this.index = 0;
        this.textInterval = setTimeout(this.animateText, this.speed);
      }
    };
  
    private animateCaret = () => {
      if (this.caretElement) {
        this.blinkCaret();
      }
    };
  
    private blinkCaret = () => {
      if (this.caretElement) {
        this.caretElement.style.opacity = this.caretElement.style.opacity === '1' ? '0' : '1';
      }
      this.blinkInterval = setTimeout(this.blinkCaret, 500);
    };
  
    public start() {
      this.animateText();
      this.animateCaret();
    }
  
    public stop() {
      clearTimeout(this.textInterval);
      clearTimeout(this.blinkInterval);
      if (this.caretElement) {
        this.caretElement.style.opacity = '1';
      }
    }
  }
  
  export default Typewriter;