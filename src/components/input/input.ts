import { Block } from "../../core";

import './input.sass'

interface InputProps {
    placeholder?: string;
    name?: string;
    type: 'text' | 'password';
    value?: string;
    error?: string;
    onChange: () => void;
}

export class Input extends Block {
    constructor({placeholder, name, type, onChange, value, error}: InputProps) {
      super({placeholder, name, type, value, error, events: {input: onChange}});
    }
  
    protected render(): string {
      // language=hbs
      return `
        <input value="{{value}}" class="login__label__input" type="{{type}}" name="{{name}}">
      `;
    }
}