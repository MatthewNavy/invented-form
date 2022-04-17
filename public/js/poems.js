'use strict';

async function generate() {
  const output = document.getElementById("output");
  const select = document.querySelector("select");
  const input = document.querySelector("input");

  const text = input.value;
  const theme = select.value;

  output.innerText = writePoem(text, theme);

  animiate();
}

function writePoem(text, theme) {
  // TODO: nlp poetry
  return "output";
}

async function animiate() {
  output.className = "content slide-in-bottom";
  await new Promise(r => setTimeout(r, 550));
  output.className = "content";
}
