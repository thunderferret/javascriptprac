
const path = require("path");
const { env } = require("process");
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets","js","main.js");
const OUTPUT_DIR = path.join(__dirname,"static");

const autopreFixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
entry : ["@babel/polyfill",ENTRY_FILE],
module : {
rules : [
    {
    test : /\.js$/,
    use:[
        'babel-loader'
    ]
}
    ,
    {
        test : /\.s[ac]ss$/i,
        use:[
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
         'sass-loader',
    
        
        ]
    }
]
},
mode : MODE,
plugins : [autopreFixer,
new MiniCssExtractPlugin({
    filename:"styles.css"
})],
output : {
    path : OUTPUT_DIR,
    filename : "[name].js"
}
};

module.exports = config;

