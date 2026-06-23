// Hamburger
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');
ham.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Modals
function openModal(type) {
  document.getElementById(type === 'web' ? 'modalWeb' : 'modalInvitacion').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(type) {
  document.getElementById(type === 'web' ? 'modalWeb' : 'modalInvitacion').classList.remove('active');
  document.body.style.overflow = '';
}
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) { o.classList.remove('active'); document.body.style.overflow = ''; } });
});

// WhatsApp
function sendWhatsApp(type, e) {
  e.preventDefault();
  const phone = '524494556465';
  let msg = '';

  if (type === 'web') {
    const nombre   = document.getElementById('wb-nombre').value.trim() || 'Sin especificar';
    const objetivo = document.getElementById('wb-objetivo').value || 'Sin especificar';
    const presup   = document.getElementById('wb-presupuesto').value || 'Sin especificar';
    const logo     = document.querySelector('input[name="wb-logo"]:checked')?.value || 'Sin especificar';
    const secs     = [...document.querySelectorAll('input[name="wb-sec"]:checked')].map(c => c.value).join(', ') || 'Sin especificar';
    msg = `¡Hola Clic_Creativo! 🌟 Quiero cotizar una *Página WEB*.\n\n📋 *Detalles:*\n• Negocio: ${nombre}\n• Objetivo: ${objetivo}\n• Presupuesto: ${presup}\n• Logo y fotos: ${logo}\n• Secciones: ${secs}\n\n¿Me podrías ayudar con el presupuesto? 🌸`;
  } else {
    const tipo     = document.getElementById('inv-tipo').value || 'Sin especificar';
    const nombre   = document.getElementById('inv-nombre').value.trim() || 'Sin especificar';
    const fecha    = document.getElementById('inv-fecha').value || 'Sin especificar';
    const funcs    = [...document.querySelectorAll('input[name="inv-func"]:checked')].map(c => c.value).join(', ') || 'Sin especificar';
    const confirma = document.querySelector('input[name="inv-confirma"]:checked')?.value || 'Sin especificar';
    msg = `¡Hola Clic_Creativo! 🌟 Quiero cotizar una *Invitación Interactiva*.\n\n📋 *Detalles:*\n• Tipo: ${tipo}\n• Nombre: ${nombre}\n• Fecha: ${fecha}\n• Funciones: ${funcs}\n• Confirmar con anfitriona: ${confirma}\n\n¿Me podrías ayudar con el presupuesto? 🌸`;
  }
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}
