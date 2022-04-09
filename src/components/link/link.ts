import Block from '../../core/Block';

import './link.sass';

interface LinkProps {
  text: string;
  type: string;
  href: string;
}

export class Link extends Block {
  constructor({text, type, href}: LinkProps) {
    super({text, type, href});
  }

  protected render(): string {
    // language=hbs
    return `
      <a href="{{href}}" class="button button_{{type}}">
        <span class="button__text">{{text}}</span>
      </a>
    `;
  }
}