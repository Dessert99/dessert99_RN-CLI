module.exports = {
  presets: ["@react-native/babel-preset"],
  plugins: [
    // [
    //   "module-resolver",
    //   {
    //     alias: { "@": "./src" },
    //     extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    //   },
    // ],

    // ↓ Reanimated v4: worklets 플러그인은 반드시 "마지막"
    "react-native-worklets/plugin",
  ],
};
