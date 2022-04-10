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
    constructor({placeholder, name, classes, type, onChange, value, error}: InputProps) {
      super({placeholder, name, classes, type, value, error, events: {blur: onChange}});
    }
  
    protected render(): string {
      // language=hbs
      return `
        <input value="{{value}}" placeholder="{{placeholder}}" class="{{classes}}" type="{{type}}" name="{{name}}">
      `;
    }
}