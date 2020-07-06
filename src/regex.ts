export const regexes = {
    tex_block: (name: string) => {
        return new RegExp('\\\\begin\{\s*'+name+'\s*\}\s*((.|\n)*)\s*\\\\end\{\s*'+name+'\s*\}');
    },

    tex_single: (name: string) => {
        return new RegExp('\\\\'+name+'\{\s*((.|\n)*)\s*\}');
    }
}