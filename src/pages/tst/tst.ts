import { Block } from "../../core";

export class Tst extends Block {
    render() {
        // language=hbs
        return `
            <main>
                <div class="container">
                    <form id="qweq" class="login login__form">
                        <h3 class="login__form__label">BXOD<h3>
                        <div class="labels">
                            <label class="login__label">
                                <span class="login__label__span">qwe</span>
                                {{{Input name="asdasd" type="text"}}}
                            </label>
                            <label class="login__label">
                                <span class="login__label__span">qwe</span>
                                {{{Input name="qwe" type="text"}}}
                            </label>
                        </div>
                        <div>
                            {{{Button text="qweqwe" type="prime"}}}
                        </div>
                    </form>
                    {{{Link href="#" text="zxczxc"}}}
                </div>
            </main>
        `
    }
}