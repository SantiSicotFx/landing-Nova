const $=q=>document.querySelector(q), $$=q=>Array.from(document.querySelectorAll(q))
$('#year').textContent=new Date().getFullYear()

// Contadores al entrar en vista
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return
    const n=e.target.querySelector('.num'); if(!n) return
    const to=+n.dataset.to, dur=1100; let t0=null
    function step(ts){ if(!t0) t0=ts; const t=Math.min((ts-t0)/dur,1); n.textContent=Math.floor(to*t); if(t<1) requestAnimationFrame(step) }
    requestAnimationFrame(step)
    io.unobserve(e.target)
  })
},{threshold:.25})
$$('.metric').forEach(el=>io.observe(el))

// Scroll suave para anclas
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href').slice(1), target=document.getElementById(id)
    if(!target) return
    e.preventDefault()
    const y=target.getBoundingClientRect().top+scrollY-8
    animateScrollTo(y,850)
  })
})
function animateScrollTo(targetY,duration=850){
  const startY=scrollY, dist=targetY-startY; let t0=null
  function step(ts){ if(!t0) t0=ts; const t=Math.min((ts-t0)/duration,1); const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2; scrollTo(0,startY+dist*eased); if(t<1) requestAnimationFrame(step) }
  requestAnimationFrame(step)
}

// Botón volver arriba
const toTopBtn=document.getElementById('toTop')
window.addEventListener('scroll',()=>{
  if(scrollY>400) toTopBtn.classList.add('show'); else toTopBtn.classList.remove('show')
})
toTopBtn.addEventListener('click',e=>{
  e.preventDefault()
  animateScrollTo(0,850)
})
