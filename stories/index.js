import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Button", module)
  .add("with text", () => (
    <button onClick={() => console.log("text")}>Hello Button</button>
  ))
  .add("with some emoji", () => (
    <button onClick={() => console.log("emoji")}>😀 😎 👍 💯</button>
  ));
