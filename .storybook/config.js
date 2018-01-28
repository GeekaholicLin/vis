import { configure, setAddon } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";
import addWithDoc from "storybook-addon-props";

setAddon(addWithDoc);

setOptions({
  name: "view in github",
  url: "https://github.com/GeekaholicLin/vis",
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true
});
const req = require.context("../stories", true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename)); //Loading stories dynamically
}

configure(loadStories, module);
