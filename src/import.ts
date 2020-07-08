import {InlineHandler} from './handler';
import {regexes as re} from './regex';

const promises = []
export const promise_all = () => {
    return Promise.all(promises);
};

export class ImportHandler implements InlineHandler {
    pattern: RegExp = re.tex_single('import', 'g');

    make_span = (body_raw: string) => {
        const script = document.createElement('script');
        script.setAttribute('src', body_raw);

        const promise = new Promise((res, rej) => {
            script.onload = res;
        });
        promises.push(promise);

        document.head.appendChild(script);
        return null;
    }
};