module.exports = {
  entry: "./src/main.tsx",
  output: {
    filename: "./build/main.js"
  },
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
        { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
