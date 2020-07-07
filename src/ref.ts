import {InlineHandler} from './handler';
import {regexes as re} from './regex';

export class InlineRefHandler implements InlineHandler {
    pattern: RegExp = re.tex_single('ref', 'g');

    make_span = (body_raw: string) => {
        const inline = document.createElement('span');
        inline.setAttribute('class', 'rp-ref');
        const link = document.createElement('a');
        link.setAttribute('href', '#'+body_raw);
        const ref = document.getElementById(body_raw);
        if(ref) {
            link.innerText = ref.getAttribute('count');
        }
        else {
            link.innerText = "??";
        }
        inline.appendChild(link);
        return inline;
    }
};