module.exports = {
    basepath: '/svelte-leaflet/',

    // theme 
    theme: 'default',

    title: {
        // constant part of page title
        main: 'svelte-leaflet',

        // use first header's content as a part of page's title 
        // it looks for `# Header` and `## Header` on the current page
        header: true,
    },

    // URL to your favicon
    favicon: 'static/favicon.png',

    pathes: {
        // directory for files, generated in development mode 
        dev: 'build/dev',

        // directory for builted documentaton
        build: 'build/dist',
    },

    aliases: {
        'svelte-leaflet': './src/index.js'
    },

    preprocess: [
        // preprocessors for Svelte if needed in Examples
        // syntax same as for `preprocess` option in `rollup-plugin-svelte`
        // Ex:  Import preprocessor at top of the config file:
        //          import {markdown} from 'svelte-preprocess-markdown';
        //      Then add it here:
        //          markdown({filetype: 'svelte'}),
    ]
}