import gradients from "../assets/gradients";
/**
 * @returns color ['#000','#fff']
 */
export let getRandomGradientColor = () =>
  gradients[Math.floor(Math.random() * gradients.length)];
