// Hamburger
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');
ham.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Modals (Actualizado para dar soporte al formulario de dudas)
function openModal(type) {
  if (type === 'web') {
    document.getElementById('modalWeb').classList.add('active');
  } else if (type === 'invitacion') {
    document.getElementById('modalInvitacion').classList.add('active');
  } else if (type === 'contactoFlotante') {
    // Restauramos el formulario visible y ocultamos el mensaje de éxito por si vuelven a abrirlo
    document.getElementById('formContactoFlotante').style.display = 'flex';
    document.getElementById('mensajeExito').style.display = 'none';
    document.getElementById('modalContactoFlotante').classList.add('active');
  }
  document.body.style.overflow = 'hidden';
}

function closeModal(type) {
  if (type === 'web') {
    document.getElementById('modalWeb').classList.remove('active');
  } else if (type === 'invitacion') {
    document.getElementById('modalInvitacion').classList.remove('active');
  } else if (type === 'contactoFlotante') {
    document.getElementById('modalContactoFlotante').classList.remove('active');
  }
  document.body.style.overflow = '';
}

// Cierre de ventanas al hacer clic fuera del recuadro blanco
document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { 
    if (e.target === o) { 
      o.classList.remove('active'); 
      document.body.style.overflow = ''; 
    } 
  });
});

// WhatsApp (Tus cotizaciones de Páginas Web e Invitaciones)
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

// NUEVO: Manejo del envío del formulario flotante "Contáctame si tienes dudas"
function handleContactoSubmit(event) {
  event.preventDefault(); // Detiene la recarga automática de la página

  // Captura de datos (por si deseas guardarlos o procesarlos en el futuro)
  const nombre = document.getElementById('cnt-nombre').value.trim();
  const correo = document.getElementById('cnt-correo').value.trim();
  const mensaje = document.getElementById('cnt-mensaje').value.trim();

  // Escondemos el formulario y mostramos el mensaje de "Mensaje enviado"
  document.getElementById('formContactoFlotante').style.display = 'none';
  document.getElementById('mensajeExito').style.display = 'block';

  // Reseteamos los campos de texto para que estén limpios en un uso posterior
  document.getElementById('formContactoFlotante').reset();

  // Espera 3.5 segundos para que alcancen a leer el mensaje de éxito y cierra el modal
  setTimeout(() => {
    closeModal('contactoFlotante');
  }, 3500);
}