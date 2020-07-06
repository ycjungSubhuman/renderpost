import {Handler} from './handler';
import * as katex from 'katex';
import {regexes as re} from './regex';

/* Math expression handler */
export class MathHandler implements Handler {
    name_token: string = 'eq';
    index_global: number = 0;

    handle = (parent: HTMLElement, body_raw: string) => {
        const tex_body = body_raw
            .replace(re.tex_single('label'), '')
            .replace(re.tex_single('caption'), '');
        console.log(tex_body);
        const id_div = 'diagram'+this.index_global.toString();
        this.index_global += 1;

        const div = document.createElement('div');
        div.setAttribute('id', id_div);
        div.setAttribute('class', 'rp-eq');

        parent.appendChild(div);
        katex.render(tex_body, div);
    }
};