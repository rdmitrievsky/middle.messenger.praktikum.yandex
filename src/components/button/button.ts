import Block from '../../core/Block';

import './button.sass';

interface ButtonProps {
  text?: string;
  type: string;
  classes?: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({ onClick, ...props}: ButtonProps) {
    super({ ...props, events: {click: onClick}});
  }
  
  protected render(): string {
    const setClasses = this.props.classes ?? `button button_${this.props.type}`
    // language=hbs
    return `
      <button href="#" class="${setClasses}">
        <span class="button__text">{{text}}</span>
      </button>
    `;
  }
}