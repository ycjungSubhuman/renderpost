import Token = require('markdown-it/lib/token');

/* A special tag handler that injects a child div-like HTML element under 'name_token' */
export interface Handler {
    name_token: string;
    handle: (parent: HTMLElement, body_raw: string) => void;
}

/* A special tag handler that replaces the first capture group in the pattern to span */
export interface InlineHandler {
    pattern: RegExp;
    make_span: (body_raw: string) => HTMLElement;
}