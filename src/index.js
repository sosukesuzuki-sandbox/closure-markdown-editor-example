goog.module("index");

const editor = document.querySelector(".editor");
const renderer = document.querySelector(".renderer");

editor.oninput = () => {
  const value = editor.value;
  renderer.innerHTML = value;
};
