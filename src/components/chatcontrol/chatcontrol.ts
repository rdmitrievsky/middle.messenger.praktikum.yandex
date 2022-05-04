import Block from '../../core/Block';

import './chatcontrol.scss';

interface ChatControlProps {
    classes?: string;
    onClick: () => void;
}

export class ChatControl extends Block {
    constructor({ onClick, ...props}: ChatControlProps) {
        super({ ...props, events: {click: onClick}});
    }
    static componentName = 'ChatControl'

    protected render(): string {
        const setClasses = this.props.classes ?? `button button_${this.props.type}`
        // language=hbs
        return `
        <button class="chatcontrol ${setClasses}">
            123
        </button>
        `;
    }
}