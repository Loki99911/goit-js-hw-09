const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),d=document.querySelector("button[data-stop]");e.addEventListener("click",(function(){n=setInterval((()=>{t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),e.disabled=!0,d.disabled=!1})),d.addEventListener("click",(function(){clearInterval(n),d.disabled=!0,e.disabled=!1}));let n=null;
//# sourceMappingURL=01-color-switcher.44391af9.js.map