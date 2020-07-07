export const regexes = {
    tex_block: (name: string, options?: string) => {
        return new RegExp('\\\\begin\{\s*'+name+'\s*\}\s*((.|\n)*)\s*\\\\end\{\s*'+name+'\s*\}', options);
    },

    tex_single: (name: string, options?: string) => {
        return new RegExp('\\\\'+name+'\{\s*(([^}]|\n)*)\s*\}', options);
    }
}