/**
 * webpack 打包配置文件
 */

//导入nodejs 内置模块 path
const path = require('path');
//三方插件包 导入
const HtmlWebpackPlugin = require('html-webpack-plugin');
//导入插件
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//自动清除dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
  //入口===程序主模块
  entry: {
    //公共模块
    commonCSS: './src/js/common.js',
    dom: './src/js/common/dom.js',
    http: './src/js/common/http.js',
    utils: './src/js/common/utils.js',
    // 三方插件模块
    captcha: './src/lib/captcha/captcha-mini.js',
    swiper: './src/lib/swiper/swiper-bundle.js',
    weui: './src/lib/weui/weui.js',

    //私有模块
    home: './src/js/home.js',
    login: './src/js/login.js',
    register: './src/js/register.js',
    advertising: './src/js/advertising.js',
    sports: './src/js/sports.js',
    about: './src/js/about.js',
    edit: './src/js/edit.js',
    sportdata:'./src/js/sportdata.js',
    introduce:'./src/js/introduce.js',
    player:'./src/js/player.js',
  },  //相对路径引入main.js 
  //出口===最终生成的文件放的位置
  output: {
    path: path.resolve(__dirname, 'dist'),   //绝对路径
    filename: 'js/[name].js',
    publicPath: './'
  },
  //loader===解释器  css==css的解释  html==html的解释器
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, 'css-loader', 'postcss-loader']
        //MiniCssExtractPlugin.loader   link 标签的形式引入css
        //css-loader  让webpack 可以打包 css代码
        //style-loader  将打包之后的代码 通过style标签插入页面中
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        }, 'css-loader', 'postcss-loader', 'less-loader']
        //css-loader  让webpack 可以打包 css代码
        //style-loader  将打包之后的代码 通过style标签插入页面中
      },
      {
        test: /\.(png|jpg|gif|jpeg|jfif)$/, //配置css中的图片打包
        loader: 'url-loader',     //只有一个处理的loader的写法  
        //可以通过url-loader 将图片压缩为 base64编码格式的图片
        //大图就不压缩  小图可以压缩
        options: {
          name: '[hash].[ext]',  // 图片输出的名字hash长度16位 默认32位
          limit: 20 * 1024,  // 限制 小于30kb base64处理
          esModule: false,
          outputPath: 'img'
        }
      },
      {
        test: /\.html$/,    //配置html文件打包
        loader: 'html-loader'
      },
      {
        test: /\.(svg|woff|ttf|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',    // loader 编译es6为es5
        exclude: /node_modules/  // 排除
      }
    ]
  },
  //plugin 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/page/home.html',    //哪个页面需要打包 相对路径
      filename: 'home.html',
      chunks: ['home', 'commonCSS', 'dom', 'swiper', 'http', 'utils']   // 当前页面打包之后 绑定哪个js模块
    }),
    new HtmlWebpackPlugin({
      template: './src/page/login.html',    //哪个页面需要打包 相对路径
      filename: 'login.html',
      chunks: ['login', 'commonCSS', 'dom', 'http', 'utils']
    }),
    new HtmlWebpackPlugin({
      template: './src/page/register.html',    //哪个页面需要打包 相对路径
      filename: 'register.html',
      chunks: ['register', 'commonCSS', 'dom', 'captcha', 'http', 'utils']
    }),
    new HtmlWebpackPlugin({
      template: './src/page/advertising.html',    //哪个页面需要打包 相对路径
      filename: 'advertising.html',
      chunks: ['advertising', 'commonCSS', 'dom']
    }),
    new HtmlWebpackPlugin({
      template: './src/page/sports.html',    //哪个页面需要打包 相对路径
      filename: 'sports.html',
      chunks: ['sports', 'commonCSS', 'dom', 'utils', 'http']
    }),
    new HtmlWebpackPlugin({
      template: './src/page/about.html',    //哪个页面需要打包 相对路径
      filename: 'about.html',
      chunks: ['about', 'commonCSS', 'dom', 'utils', 'http']
    }),
    new HtmlWebpackPlugin({
      template: './src/page/edit.html',    //哪个页面需要打包 相对路径
      filename: 'edit.html',
      chunks: ['edit', 'commonCSS', 'dom', 'http', 'weui', 'utils']
    }),
    new HtmlWebpackPlugin({
      template: './src/page/sportdata.html',    //哪个页面需要打包 相对路径
      filename: 'sportdata.html',
      chunks: ['sportdata', 'commonCSS', 'dom', 'http',]
    }),
    new HtmlWebpackPlugin({
      template: './src/page/introduce.html',    //哪个页面需要打包 相对路径
      filename: 'introduce.html',
      chunks: ['introduce', 'commonCSS', 'dom', 'utils','http',]
    }),
    new HtmlWebpackPlugin({
      template: './src/page/player.html',    //哪个页面需要打包 相对路径
      filename: 'player.html',
      chunks: ['player', 'commonCSS', 'dom', 'utils', 'http']
    }),


    new MiniCssExtractPlugin({
      filename: 'css/[name].css' // 输出到css文件夹里
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    //清除dist
    new CleanWebpackPlugin()
  ],
  //mode 环境   development:本地开发环境  production：生产环境（线上环境）
  // mode: 'development',
  mode: process.env.NODE_ENV,
  //webpack.config.js   
  // 开发服务器 配置【】
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
    compress: true, // 启动gzip
    port: 8088,  // 端口  8080 80  8081 8082
    open: true, // 自动打开服务
    publicPath: '/', // 静态资源查找路径
    openPage: 'home.html', // 打开的页面
  },
  target: 'web', // 目标是浏览器

}