module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Card: 'app/components/Card.jsx',
      CardViewer: 'app/components/CardViewer.jsx',
      Main: 'app/components/Main.jsx',
      Nav: 'app/components/Nav.jsx',
      Home: 'app/components/Home.jsx',
      configureStore: 'store/configureStore.jsx',
      actions: 'actions/actions.jsx',
      reducers: 'reducers/reducers.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};
