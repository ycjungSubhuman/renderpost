import {regexes as re} from './regex';

export const common_pass_block = (div: HTMLElement, str: string, count: number) => {
    const m_name_div = str.match(re.tex_single('label'));
    if(m_name_div) {
        div.setAttribute('id', m_name_div[1]);
        div.setAttribute('count', count.toString());
    }
};