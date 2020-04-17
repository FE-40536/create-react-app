const {override, fixBabelImports, addWebpackAlias, addLessLoader, addPostcssPlugins, addBabelPlugins, addBundleVisualizer, addDecoratorsLegacy, addWebpackExternals} = require('customize-cra')
const path = require('path')

module.exports = override(
    addBabelPlugins(['react-hot-loader/babel']),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    }),
    addDecoratorsLegacy(),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@brand-primary': '#EB624F'},
    }),
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
    }),
    addBundleVisualizer(
        {
            analyzerMode: 'server',
        },
        true
    ),
    addWebpackExternals({
        // 'qiniu-js': 'qiniu',
        // 'react': 'React',
        // 'react-dom': 'ReactDOM',
    }),
    addPostcssPlugins([require('postcss-px2rem')({remUnit: 37.5, exclude: /node_modules/i})])
)
