import * as mi from 'markdown-it';
import * as mi_container from 'markdown-it-container';
import {MathHandler, InlineMathHandler} from './math';
import {InlineRefHandler} from './ref';
import {ImageDiagramHandler, P5DiagramHandler} from './diagram';
import * as hljs from 'highlight.js';
import { P5Figure } from '@intergula/p5template';

const p5handler = new P5DiagramHandler();

const block_handlers = [
    new MathHandler(),
    new ImageDiagramHandler(),
    p5handler,
];

const inline_handlers= [
    new InlineMathHandler(),
    new InlineRefHandler(),
];

function render(parent: HTMLElement, str: string) {
    const md = mi({
        highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return hljs.highlight(lang, str).value;
              } catch (__) {}
            }
        
            return ''; // use external default escaping
          }
    }); 
    block_handlers.forEach(element => md.use(mi_container, element.name_token, {
        render: function(tokens, idx) {
            if (tokens[idx].nesting === 1) {
                return '<'+element.name_token+'>\n';
            }
            else {
                return '</'+element.name_token+'>\n';
            }
        }
    }));

    parent.innerHTML = md.render(str);

    block_handlers
        .forEach(handler => {
            const doms = parent.getElementsByTagName(handler.name_token);
            Array.from(doms).forEach((dom: HTMLElement) => {
                const str_raw = dom.innerText;
                dom.innerHTML = '';
                handler.handle(dom, str_raw);
            });
        });

    inline_handlers
        .forEach(handler => {
            const txt = parent.innerHTML;
            parent.innerHTML = txt.replace(handler.pattern, (m, p1, offset, str) => {
                return handler.make_span(p1).outerHTML;
            });
        });

    p5handler.posts.forEach(o => new P5Figure(document.getElementById(o.id_div), o.code));
}

export {render as render_rp};