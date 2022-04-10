import Block from '../../core/Block';

import './button.sass';

interface ButtonProps {
  text: string;
  type: string;
  classes?: string;
  onClick: () => void;
}

export class Button extends Block {
  constructor({text, type, classes, onClick}: ButtonProps) {
    // const onClick = (e: MouseEvent) => {
    //   console.log('TADA');
    //   e.preventDefault();
    // }
    super({text, type, classes, events: {click: onClick}});
  }
  
  protected render(): string {
    let qwe = this.props.classes ? this.props.classes : `button button_${this.props.type}`
    // language=hbs
    return `
      <button href="#" class="${qwe}">
        <span class="button__text">{{text}}</span>
      </button>
    `;
  }
}