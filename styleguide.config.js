const path = require('path')
const reactDocgen = require('react-docgen')
const reactDocgenTS = require('react-docgen-typescript')
const tsDocgen = reactDocgenTS.withDefaultConfig({
    componentNameResolver: (exp, source) => exp.getName() === 'StyledComponentClass' && reactDocgenTS.getDefaultExportForFile(source)
})

module.exports = {
    propsParser(filePath, source, resolver, handlers) {
        const isTS = path.extname(filePath).startsWith('.ts')

        return isTS ? tsDocgen.parse(filePath, resolver, handlers) : reactDocgen.parse(source, resolver, handlers)
    },
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'src/ThemeWrapper'),
    },
    // Is the resolver really needed?
    resolver: reactDocgen.resolver.findAllComponentDefinitions,
    components: 'src/components/**/*.{js,jsx,ts,tsx}',
    webpackConfig: require('./config/webpack.config.dev.js')
};