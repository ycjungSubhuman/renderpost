import Token = require('markdown-it/lib/token');

/* A special tag handler that injects a child HTML element under 'elem' */
export interface Handler {
    name_token: string;
    handle: (parent: HTMLElement, body_raw: string) => void;
}