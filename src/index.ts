import * as mi from 'markdown-it';
import * as mi_container from 'markdown-it-container';
import {MathHandler} from './math';
import {DiagramHandler} from './diagram';

const extra_handlers = [
    new MathHandler(),
    new DiagramHandler(),
];

function render(parent: HTMLElement, str: string) {
    const md = mi(); 
    extra_handlers.forEach(element => md.use(mi_container, element.name_token, {
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

    extra_handlers
        .forEach(handler => {
            const doms = document.getElementsByTagName(handler.name_token);
            Array.from(doms).forEach((dom: HTMLElement) => {
                const str_raw = dom.innerText;
                dom.innerHTML = '';
                handler.handle(dom, str_raw);
            });
        });
}

export {render as render_rp};