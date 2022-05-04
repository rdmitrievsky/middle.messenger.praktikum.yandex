import Block from '../../core/Block';

import './chatcontrolmodal.scss';

export class ChatControlModal extends Block {
    static componentName = 'ChatControlModal'

    protected render(): string {
        const setClasses = this.props.classes ?? `button button_${this.props.type}`
        // language=hbs
        return `
            <modal class="chatcontrolmodal ${setClasses}">
                <div class="chatcontrolmodal__container">
                    123
                </div>
            </modal>
        `;
    }
}