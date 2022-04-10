import Block from '../../core/Block';

import './button.sass';

interface ButtonProps {
  text: string;
  type: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({text, type, onClick}: ButtonProps) {
    // const onClick = (e: MouseEvent) => {
    //   console.log('TADA');
    //   e.preventDefault();
    // }
    super({text, type, events: {click: onClick}});
  }

  protected render(): string {
    // language=hbs
    return `
      <button href="#" class="button button_{{type}}">
        <span class="button__text">{{text}}</span>
      </button>
    `;
  }
}