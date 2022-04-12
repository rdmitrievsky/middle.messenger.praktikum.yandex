import { Block } from "../../core";

import './input.sass'

interface InputProps {
    placeholder?: string;
    name?: string;
    classes: string;
    type: 'text' | 'password';
    value?: string;
    error?: string;
    onChange: () => void;
}

export class Input extends Block {
    constructor({ onChange, ...props }: InputProps) {
      super({ ...props, events: {focus: onChange, blur: onChange}});
    }
  
    protected render(): string {
      // language=hbs
      return `
        <input value="{{value}}" placeholder="{{placeholder}}" class="{{classes}}" type="{{type}}" name="{{name}}">
      `;
    }
}