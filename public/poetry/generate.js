import { bukowski } from "./poets/bukowski.js";
import { shakespeare } from "./poets/shakespeare.js";
import { neruda } from "./poets/neruda.js";
import { williams } from "./poets/williams.js";
import { lorde } from "./poets/lorde.js";
import { browne } from "./poets/browne.js";
import { barton } from "./poets/barton.js";
import { sexton } from "./poets/sexton.js";
import { dickinson } from "./poets/dickinson.js";
import { ohara } from "./poets/ohara.js";

'use strict';

export async function getPoem() {
  const output = document.getElementById("output");
  const select = document.querySelector("select");
  const input = document.querySelector("input");

  const text = input.value;
  const poet = select.value;

  output.innerText = writePoem(text, poet);

  animiate();
}

function writePoem(text, poet) {
  // TODO: scale values with length of text
  const markov = new MarkovGenerator(4, 3000);

  const linesA = mapPoet(poet);
  const linesB = text.split(".").filter(sentence => sentence.length > 0);
  //console.log(linesA);

  // TODO: scale values with length of text
  const totalA = 1;
  const totalB = 8;

  for (let n = 0; n < totalA; n++) {
    for (let i = 0; i < linesA.length; i++) {
      markov.feed(linesA[i]);
    }
  }

  for (let n = 0; n < totalB; n++) {
    for (let i = 0; i < linesB.length; i++) {
      markov.feed(linesB[i]);
    }
  }

  let poem = "";
  for (let n = 0; n < 14; n++) {
    poem += markov.generate() + "\n";
  }
  return poem;
}

function mapPoet(poet) {
  switch(poet) {
    case "Charles Bukowski":
      return choice(bukowski);
    case "William Shakespeare":
      return choice(shakespeare);
    case "Pablo Neruda":
      return choice(neruda);
    case "William Carlos Williams":
      return choice(williams);
    case "Audre Lorde":
      return choice(lorde);
    case "Jenny Browne":
      return choice(browne);
    case "Matthew Barton":
      return choice(barton);
    case "Anne Sexton":
      return choice(sexton);
    case "Emily Dickinson":
      return choice(dickinson);
    case "Frank O'Hara":
      return choice(ohara);
    default:
      return [];
  }
}

async function animiate() {
  output.className = "content slide-in-bottom";
  await new Promise(r => setTimeout(r, 550));
  output.className = "content";
}

function choice(arr) {
  var i = Math.floor(Math.random() * arr.length);
  return arr[i];
}