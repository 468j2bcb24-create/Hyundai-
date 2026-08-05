const app=document.getElementById('app');
const stats=JSON.parse(localStorage.getItem('htd-stats')||'{"correct":0,"total":0}');
const models=["Elantra","Sonata","Venue","Kona","Tucson","Santa Fe","Palisade"];
const screens={
home:()=>app.innerHTML=`<div class="card"><h2>Welcome</h2><p>Study Hyundai trims or test yourself.</p></div>`,
study:()=>app.innerHTML=`<div class="card"><h2>Models</h2><ul>${models.map(m=>`<li>${m}</li>`).join("")}</ul></div>`,
quiz:()=>{
 const answer=models[Math.floor(Math.random()*models.length)];
 app.innerHTML=`<div class="card"><h2>Which model matches this prompt?</h2>
 <p>Imagine you're presenting a <b>${answer}</b>.</p>
 ${models.map(m=>`<button class="q">${m}</button>`).join(" ")}</div>`;
 document.querySelectorAll(".q").forEach(b=>b.onclick=()=>{
 stats.total++;
 if(b.textContent===answer){stats.correct++;alert("Correct!")}else alert("Correct answer: "+answer);
 localStorage.setItem("htd-stats",JSON.stringify(stats));
 screens.stats();
 });
},
stats:()=>app.innerHTML=`<div class="card"><h2>Stats</h2><p>Correct: ${stats.correct}</p><p>Total: ${stats.total}</p><p>Accuracy: ${stats.total?Math.round(stats.correct/stats.total*100):0}%</p></div>`
};
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>screens[b.dataset.screen]());
screens.home();
