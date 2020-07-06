import {Handler} from './handler';
import {regexes as re} from './regex';
import {P5Figure} from '@intergula/p5template';


const str2func = (str: string) => {
    return eval('(function (p){'+str+'})');
}

/* P5JS diagram handler */
export class DiagramHandler implements Handler {
    name_token: string = 'diagram';
    index_global: number = 0;

    handle = (parent: HTMLElement, body_raw: string) => {
        const id_div = 'diagram'+this.index_global.toString();
        this.index_global += 1;
        const div = document.createElement('div');
        div.setAttribute('id', id_div);
        div.setAttribute('class', 'rp-diagram');
        parent.appendChild(div);

        const m_preload = body_raw.match(re.tex_block('preload'));
        const m_setup = body_raw.match(re.tex_block('setup'));
        const m_draw = body_raw.match(re.tex_block('draw'));

        let preload = function(p: any) {};
        let setup = function(p: any) {};
        let draw = function(p: any) {};

        if(m_preload) {
            preload = str2func(m_preload[1]);
        }
        if(m_setup) {
            setup = str2func(m_setup[1]);
        }
        if(m_draw) {
            draw = str2func(m_draw[1]);
        }

        const m_caption = body_raw.match(re.tex_single('caption'));
        if(m_caption) {
            const caption = document.createElement('caption');
            caption.innerText = 'Figure '+this.index_global+': '+m_caption[1];
            parent.appendChild(caption);
        }

        new P5Figure(div, {preload, setup, draw});
    }
};