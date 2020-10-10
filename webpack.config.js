
const path = require("path");
const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets","js","main.js");
const OUTPUT_DIR = path.join(__dirname,"static");

const autopreFixer = require("autoprefixer");

const config = {
entry : ENTRY_FILE,
plugins : [autopreFixer],
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
            'css-loader',
            'sass-loader'
        ]
    }
]
},
mode : MODE,
output : {
    path : OUTPUT_DIR,
    filename : "[name].js"
}
};

module.exports = config;

