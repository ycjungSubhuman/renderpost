import * as mi from 'markdown-it';
import * as mi_container from 'markdown-it-container';
import {MathHandler, InlineMathHandler} from './math';
import {InlineRefHandler} from './ref';
import {ImportHandler, promise_all} from './import';
import {ImageDiagramHandler, P5DiagramHandler, ShaderDiagramHandler, reset} from './diagram';
import * as hljs from 'highlight.js';
import { P5Figure } from '@intergula/p5template';
import 'shader-doodle';

const p5handler = new P5DiagramHandler();
const mathhandler = new MathHandler();

const block_handlers = [
    mathhandler,
    new ImageDiagramHandler(),
    new ShaderDiagramHandler(),
    p5handler,
];

const inline_handlers= [
    new InlineMathHandler(),
    new InlineRefHandler(),
    new ImportHandler(),
];

function render(parent: HTMLElement, str: string) {
    reset();
    mathhandler.index_global = 0;
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

    const tokens = block_handlers.map(handler => handler.name_token);
    const doms = parent.querySelectorAll(tokens.join(','));
    Array.from(doms).forEach((elem: Element) => {
        let dom = elem as HTMLElement;
        const handler = block_handlers[tokens.indexOf(dom.tagName.toLowerCase())];
        const str_raw = dom.innerText;
        dom.innerHTML = '';
        handler.handle(dom, str_raw);
    });

    const post_load = () => {
        // Hacks for removing duplicated load
        p5handler.posts.forEach(o => new P5Figure(document.getElementById(o.id_div), o.code));
        const doodles = parent.getElementsByTagName("doodle");
        Array.from(doodles).forEach(dom => {
            const d = document.createElement('shader-doodle');
            d.innerHTML = dom.innerHTML;
            d.setAttribute('class', dom.getAttribute('class'));
            dom.parentElement.replaceChild(d, dom);
        });
    };

    inline_handlers
        .forEach(handler => {
            Array.from(parent.children).forEach(dom => {
                if(dom.getElementsByTagName('code').length !== 0) {
                    return;
                }
                const txt = dom.innerHTML;
                dom.innerHTML = txt.replace(handler.pattern, (m, p1, offset, str) => {
                    const elem = handler.make_span(p1)
                    if(elem) {
                        return elem.outerHTML;
                    }
                    else {
                        return '';
                    }
                });
            });
        });
    promise_all().then(post_load);
}

export {render as render_rp};