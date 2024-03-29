module.exports = {
  entry: './app/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      Main: 'app/components/Main.jsx',
      Nav: 'app/components/Nav.jsx',
      DeckList: 'app/components/DeckList.jsx',
      NoteList: 'app/components/NoteList.jsx',
      Note: 'app/components/Note.jsx',
      MarkdownEditor: 'app/components/MarkdownEditor.jsx',
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
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      }
    ]
  }
};
