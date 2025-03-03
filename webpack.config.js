const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "cb",
    projectName: "ai-microfrontends",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    entry: {
      jke_theme_jke: path.resolve(
        __dirname,
        "mfe/jke_theme_jke/index.tsx"
      ),
    },
    externals: [
      "@clearblade/ia-mfe-core",
      "@clearblade/ia-mfe-react",
      "react-query",
      "@material-ui/core",
      "@material-ui/icons",
      "@material-ui/lab",
      "react-router-dom",
      "single-spa",
    ],
  });
};
