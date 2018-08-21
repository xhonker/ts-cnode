import Vue from "vue";
//@ts-ignore
import hljs from "highlight.js/lib/highlight";
//@ts-ignore
import javascript from "highlight.js/lib/languages/javascript";
hljs.registerLanguage("javascript", javascript);

import "highlight.js/styles/atom-one-dark.css";

Vue.directive("highlight", el => {
  let blocks = el.querySelectorAll("pre code");
  blocks.length &&
    blocks.forEach(block => {
      hljs.highlightBlock(block);
    });
});
