import {Handler} from './handler';
import {regexes as re} from './regex';
import {P5Figure} from '@intergula/p5template';
import {common_pass_block} from './common';

const str2func = (str: string) => {
    return eval('(function (p){'+str+'})');
}

let index_global = 0;

const add_caption = (parent: HTMLElement, body_raw: string) => {
    const m_caption = body_raw.match(re.tex_single('caption'));
    if(m_caption) {
        const caption = document.createElement('span');
        caption.innerHTML = '<span class="rp-head-caption">Figure '+index_global+': </span>'+m_caption[1];
        caption.setAttribute('class', 'rp-caption');
        parent.appendChild(caption);
    }
};

export class ImageDiagramHandler implements Handler {
    name_token: string = 'diagram';

    handle = (parent: HTMLElement, body_raw: string) => {
        index_global += 1;
        common_pass_block(parent, body_raw, index_global);

        const img = document.createElement('img');
        const m_image = body_raw.match(re.tex_single('image'));
        if(m_image) {
            img.setAttribute('src', m_image[1]);
        }

        const m_width = body_raw.match(re.tex_single('width'));
        if(m_width) {
            img.setAttribute('width', m_width[1]);
        }

        const m_height = body_raw.match(re.tex_single('height'));
        if(m_height) {
            img.setAttribute('height', m_height[1]);
        }

        parent.appendChild(img);

        add_caption(parent, body_raw);
    }
};

/* P5JS diagram handler */
export class P5DiagramHandler implements Handler {
    name_token: string = 'p5diagram';
    posts = [];

    handle = (parent: HTMLElement, body_raw: string) => {
        index_global += 1;
        common_pass_block(parent, body_raw, index_global);

        const id_div = 'p5diagram'+index_global.toString();
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

        add_caption(parent, body_raw);

        this.posts.push({id_div, code: {preload, setup, draw}});
    }
};

/* Shader-doodle diagram handler */
export class ShaderDiagramHandler implements Handler {
    name_token: string = 'shaderdiagram';
    posts = [];

    handle = (parent: HTMLElement, body_raw: string) => {
        index_global += 1;
        common_pass_block(parent, body_raw, index_global);

        const doodle = document.createElement('doodle');
        doodle.innerHTML = body_raw
            .replace(re.tex_single('caption'), '')
            .replace(re.tex_single('label'), '');
        doodle.setAttribute('class', 'rp-shader');
        parent.appendChild(doodle);
        add_caption(parent, body_raw);
    }
};