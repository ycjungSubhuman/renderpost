import {Handler, InlineHandler} from './handler';
import * as katex from 'katex';
import {regexes as re} from './regex';
import {common_pass_block} from './common';

/* Math expression handler */
export class MathHandler implements Handler {
    name_token: string = 'eq';
    index_global: number = 0;

    handle = (parent: HTMLElement, body_raw: string) => {
        this.index_global += 1;
        common_pass_block(parent, body_raw, this.index_global);

        const tex_body = body_raw
            .replace(re.tex_single('label'), '')
            .replace(re.tex_single('caption'), '');
        const id_div = 'diagram'+this.index_global.toString();

        const div = document.createElement('div');
        div.setAttribute('id', id_div);
        div.setAttribute('class', 'rp-eq');
        parent.appendChild(div);

        const number = document.createElement('span');
        number.setAttribute('class', 'rp-eq-number');
        number.innerHTML = "("+this.index_global+")";
        parent.appendChild(number);

        katex.render(tex_body, div);
    }
};

export class InlineMathHandler implements InlineHandler {
    pattern: RegExp = /\$([^$]*)\$/g;

    make_span = (body_raw: string) => {
        const eq_inline = document.createElement('span');
        eq_inline.setAttribute('class', 'rp-inlineeq');
        katex.render(body_raw, eq_inline);
        return eq_inline;
    }
};