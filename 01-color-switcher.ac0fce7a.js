const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body;let n;t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,n=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(n)})),document.addEventListener("DOMContentLoaded",(function(){e.disabled=!0}));
//# sourceMappingURL=01-color-switcher.ac0fce7a.js.map