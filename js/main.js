const header=document.querySelector('[data-header]');const progress=document.querySelector('[data-progress]');const navLinks=[...document.querySelectorAll('.desktop-nav a,.mobile-nav a')];const sections=[...document.querySelectorAll('main section[id]')];const menuBtn=document.querySelector('.menu-toggle');const mobileNav=document.querySelector('#mobile-menu');const video=document.querySelector('.hero-video');const videoBtn=document.querySelector('[data-video-control]');
function onScroll(){header.classList.toggle('is-scrolled',scrollY>20);const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max?scrollY/max*100:0}%`;let current='inicio';for(const section of sections){if(scrollY>=section.offsetTop-innerHeight*.35)current=section.id}navLinks.forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')===`#${current}`))}addEventListener('scroll',onScroll,{passive:true});onScroll();
menuBtn.addEventListener('click',()=>{const open=menuBtn.getAttribute('aria-expanded')==='true';menuBtn.setAttribute('aria-expanded',String(!open));menuBtn.setAttribute('aria-label',open?'Abrir menu':'Fechar menu');mobileNav.hidden=open});mobileNav.addEventListener('click',e=>{if(e.target.matches('a')){mobileNav.hidden=true;menuBtn.setAttribute('aria-expanded','false')}});
if(video&&videoBtn){videoBtn.addEventListener('click',()=>{if(video.paused){video.play();videoBtn.textContent='Pausar';videoBtn.setAttribute('aria-label','Pausar vídeo')}else{video.pause();videoBtn.textContent='Reproduzir';videoBtn.setAttribute('aria-label','Reproduzir vídeo')}})}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-project]').forEach(link=>link.addEventListener('click',()=>{const select=document.querySelector('#tipo');if(select){const value=link.dataset.project;const option=[...select.options].find(o=>o.text===value);if(option)select.value=value}}));
const form=document.querySelector('[data-form]');form?.addEventListener('submit',e=>{e.preventDefault();let valid=true;form.querySelectorAll('[required]').forEach(field=>{const small=field.parentElement.querySelector('small');if(!field.value.trim()){valid=false;field.setAttribute('aria-invalid','true');if(small)small.textContent='Preencha este campo.'}else if(field.type==='email'&&!field.validity.valid){valid=false;field.setAttribute('aria-invalid','true');if(small)small.textContent='Introduza um email válido.'}else{field.removeAttribute('aria-invalid');if(small)small.textContent=''}});const status=form.querySelector('.form-status');if(valid){status.textContent='Formulário validado. Ligue este formulário ao serviço de envio antes da publicação.'}});document.querySelector('[data-year]').textContent=new Date().getFullYear();
const backToTopButton =
  document.querySelector('[data-back-to-top]');

function toggleBackToTop() {
  if (!backToTopButton) return;

  if (window.scrollY > 800) {
    backToTopButton.classList.add('is-visible');
  } else {
    backToTopButton.classList.remove('is-visible');
  }
}

window.addEventListener(
  'scroll',
  toggleBackToTop,
  { passive: true }
);

backToTopButton?.addEventListener(
  'click',
  () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
);

const contactForm =
document.getElementById('contactForm');

if (contactForm) {

    contactForm.addEventListener(
        'submit',
        function (event) {

            event.preventDefault();

            const submitButton =
            contactForm.querySelector(
                'button[type="submit"]'
            );

            const status =
            document.querySelector(
                '.form-status'
            );

            submitButton.disabled = true;

            submitButton.innerText =
            'A enviar...';

            emailjs.send(
                'service_m41nkf5',
                'template_6nuxr8f',
                {
                    nome:
                    document.getElementById('nome').value,

                    empresa:
                    document.getElementById('empresa').value,

                    email:
                    document.getElementById('email').value,

                    telefone:
                    document.getElementById('telefone').value,

                    tipo:
                    document.getElementById('tipo').value,

                    mensagem:
                    document.getElementById('mensagem').value,

                    prazo:
                    document.getElementById('prazo').value,

                    orcamento:
                    document.getElementById('orcamento').value
                }
            )

            .then(function () {

                status.innerHTML =
                '✅ Pedido enviado com sucesso. Entraremos em contacto brevemente.';
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerText =
                'Enviar Pedido';
            })

            .catch(function (error) {
                console.error(error);
                status.innerHTML =
                '❌ Ocorreu um erro ao enviar o pedido.';
                submitButton.disabled = false;
                submitButton.innerText =
                'Enviar Pedido';
            });

        }
    );

}