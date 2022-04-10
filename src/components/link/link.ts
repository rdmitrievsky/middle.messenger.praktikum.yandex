import Block from '../../core/Block';

import './link.sass';

interface LinkProps {
  text: string;
  type: string;
  href: string;
  classes?: string;
  childrenClass?: string;
}

export class Link extends Block {
  constructor({text, type, href, classes, childrenClass}: LinkProps) {
    super({text, type, href, classes, childrenClass});
  }

  protected render(): string {
    // language=hbs
    return `
    <div class="{{classes}}">
      <a class="{{childrenClass}}" href="{{href}}">
        <span>{{text}}</span>
      </a>
    </div>
    `;
  }
}