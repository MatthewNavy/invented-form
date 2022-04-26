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
  const linesA = mapPoet(poet);
  const linesB = text.split(".").filter(sentence => sentence.length > 0);
  //console.log(linesA);

  const poetAvgLen = avgLen(linesA);
  const textAvgLen = avgLen(linesB);
  console.log("poem avg str len: " + poetAvgLen);
  console.log("text avg str len: " + textAvgLen);

  //const max = Math.floor(textAvgLen / poetAvgLen * 500000);
  //console.log("max:" + max);
  const max = 2000000;
  const markov = new MarkovGenerator(3, max);

  // TODO: scale values with length of text
  const totalA = 1;
  const totalB = 7;

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

function avgLen(arr) {
  if (arr.length == 0) {
    return 0;
  }
  let sum = 0;
  arr.forEach(str => {
    sum += str.length;
  });
  return sum / arr.length;
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