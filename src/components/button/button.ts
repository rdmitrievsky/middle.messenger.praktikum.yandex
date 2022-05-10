import Block from '../../core/Block';

import './button.scss';

interface ButtonProps {
  text?: string;
  type: string;
  classes?: string;
  btnUserId?: number;
  onClick: () => void;
}

export class Button extends Block {
  constructor({ onClick, ...props}: ButtonProps) {
    super({ ...props, events: {click: onClick}});
  }
  static componentName = 'Button'
  
  protected render(): string {
    const setClasses = this.props.classes ?? `button button_${this.props.type}`
    // language=hbs
    return `
      <button class="${setClasses}">
        <span class="button__text">{{text}}</span>
      </button>
    `;
  }
}