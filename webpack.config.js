
const path = require("path");
const { env } = require("process");
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets","js","main.js");
const OUTPUT_DIR = path.join(__dirname,"static");

const autopreFixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
entry : ["@babel/polyfill",ENTRY_FILE],
devtool: 'cheap-module-source-map',
module : {
rules : [ 
    {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
    {
        test : /\.s[ac]ss$/i,
        use:[
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
         'sass-loader',        
        ]
    },
    {
        test : /\.pug$/,
        use: {
            loader: 'pug-loader',
            options: {
              root: path.resolve(__dirname, './static')
            }
          }
    }
]
},
mode : MODE,
plugins : [
new MiniCssExtractPlugin({
    filename:"styles.css"
})],
output : {
    path : OUTPUT_DIR,
    filename : "[name].js"
}
};

module.exports = config;

