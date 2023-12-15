const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PostCss =  require('postcss-preset-env');

// NODE_ENV - переменная хранит режим сборки,
// для корректности ее работы используется npm пакет cross-env
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

// в зависимости от режима сборки, добавляет/удаляет хэш к имени файла
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

console.log('IS PROD', isProd);
console.log('IS DEV', isDev);

const devServer = (isDev) => !isDev ? {} : {
	devServer: {
		open: true,
		hot: true,
		liveReload: true,
		port: 3000,
		static: ['./src', './public'],
	},
};

module.exports = {
  context: path.resolve(__dirname, 'src'), // контекст работы webpack
	mode: isProd === 'production' ? 'production' : 'development',  // режим сборки
  target: isDev ? 'web' : 'browserslist',
  // target: ['web', 'es6'],
  devtool: isDev ? 'inline-source-map' : false, // добавляет ".map" файлы, в режиме разработки
  entry: './script/index.js', // точка входа
  output: {
    filename: filename('js'), // файл, куда будут собираться все скрипты
    path: path.resolve(__dirname, 'build'), // путь по которому будут складываться собранные скрипты
    assetModuleFilename: '[file]',
		// assetModuleFilename: 'assets/[name]-[hash][ext]',
  },

	resolve: {
    extensions: ['.ts', '.js'], // разрешение по умолчанию
	},

	// Loaders:
	module: {
    rules: [
			{
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|cur|gif|png|jpe?g|webp|svg)$/i,
        type: 'asset/resource',
        // generator: {
        //   filename: 'assets/images/[name]-[hash][ext][query]',
        // },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        // generator: {
        //   filename: 'assets/fonts/[name]-[hash][ext][query]',
        // },
      },
      {
        test: /\.(?:mp3|wav|ogg|mp4)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader'],
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [PostCss],
              },
            },
          },
          'sass-loader'
        ],
      },
			{
        test: /\.html$/i,
        loader: "html-loader",
      },
    ]
  },

	plugins: [
    new CleanWebpackPlugin(),  // чистит папку build, перед новой сборкой
    // new HTMLWebpackPlugin({
    //   template: "./index.html" // шаблон для генерации html файла
    // }),
		new HTMLWebpackPlugin({
      template: "./pages/landing/index.html", // шаблон для генерации html файла
			filename: "./pages/landing/index.html"
    }),
		new HTMLWebpackPlugin({
      template: "./pages/donate/index.html", // шаблон для генерации html файла
			filename: "./pages/donate/index.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          // context: path.resolve(dirname, './src'),
          globOptions: {
            ignore: [
              '**/*.js',
              '**/*.ts',
              '**/*.scss',
              '**/*.sass',
              '**/*.html',
            ],
          },
          noErrorOnMissing: true,
          force: true,
        },
				{from: path.resolve(__dirname, 'src/index.html'), to: path.resolve(__dirname, 'build/index.html') }
      ],
    }),
    // new CopyPlugin({ // копирует необходимые файлы в build
    //   patterns: [
    //     {from: path.resolve(__dirname, 'src/favicon.ico'), to: path.resolve(__dirname, 'build') }
    //   ]}),
    new MiniCssExtractPlugin({ // выносит css из js в отдельный файл
      filename: filename('css')
    })
  ],

	...devServer(isDev)
};
