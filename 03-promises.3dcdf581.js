var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){o[e]=n},e.parcelRequired7c6=t);var i=t("7Y9D8");document.addEventListener("DOMContentLoaded",(function(){function e(e,n){return new Promise(((o,t)=>{const r=Math.random()>.3;setTimeout((()=>{r?(o({position:e,delay:n}),i.Notify.success(`✅ Fulfilled promise ${e} in ${n}ms`)):(t({position:e,delay:n}),i.Notify.failure(`❌ Rejected promise ${e} in ${n}ms`))}),n)}))}document.querySelector(".form").addEventListener("submit",(function(n){n.preventDefault();const o=n.target.elements;!function(n,o,t){for(let i=1;i<=t;i++){e(i,n+(i-1)*o).then((({position:e,delay:n})=>{console.log(`✅ Fulfilled promise ${e} in ${n}ms`)})).catch((({position:e,delay:n})=>{console.log(`❌ Rejected promise ${e} in ${n}ms`)}))}}(parseInt(o.delay.value,10),parseInt(o.step.value,10),parseInt(o.amount.value,10))}))}));
//# sourceMappingURL=03-promises.3dcdf581.js.map
