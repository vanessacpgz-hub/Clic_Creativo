// ===== MODALS =====
function openModal(type) {
  const id = type === 'web' ? 'modalWeb' : 'modalInvitacion';
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(type) {
  const id = type === 'web' ? 'modalWeb' : 'modalInvitacion';
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

// ===== WHATSAPP =====
function sendWhatsApp(type, event) {
  event.preventDefault();
  const phone = '524494556465';
  let message = '';

  if (type === 'web') {
    const nombre    = document.getElementById('wb-nombre').value.trim() || 'Sin especificar';
    const objetivo  = document.getElementById('wb-objetivo').value || 'Sin especificar';
    const presup    = document.getElementById('wb-presupuesto').value || 'Sin especificar';
    const logo      = document.querySelector('input[name="wb-logo"]:checked')?.value || 'Sin especificar';
    const fecha     = document.getElementById('wb-fecha').value || 'Sin especificar';
    const secciones = [...document.querySelectorAll('input[name="wb-sec"]:checked')].map(c => c.value).join(', ') || 'Sin especificar';

    message =
      `¡Hola Clic_Creativo! 🌟 Quiero cotizar una *Página WEB*.\n\n` +
      `📋 *Detalles:*\n` +
      `• Tipo de negocio: ${nombre}\n` +
      `• Objetivo: ${objetivo}\n` +
      `• Presupuesto estimado: ${presup}\n` +
      `• ¿Tiene logo?: ${logo}\n` +
      `• Fecha de entrega deseada: ${fecha}\n` +
      `• Secciones deseadas: ${secciones}\n\n` +
      `¿Me podrías ayudar con el presupuesto? 🌸`;

  } else {
    const tipo      = document.getElementById('inv-tipo').value || 'Sin especificar';
    const nombre    = document.getElementById('inv-nombre').value.trim() || 'Sin especificar';
    const padrinos  = document.getElementById('inv-padrinos').value.trim() || 'Sin especificar';
    const frase     = document.getElementById('inv-frase').value.trim() || 'Sin especificar';
    const ubicacion = document.getElementById('inv-ubicacion').value.trim() || 'Sin especificar';
    const fecha     = document.getElementById('inv-fecha').value || 'Sin especificar';
    const confirma  = document.querySelector('input[name="inv-confirma"]:checked')?.value || 'Sin especificar';

    message =
      `¡Hola Clic_Creativo! 🌟 Quiero cotizar una *Invitación Interactiva*.\n\n` +
      `📋 *Detalles:*\n` +
      `• Tipo de invitación: ${tipo}\n` +
      `• Nombre completo: ${nombre}\n` +
      `• Padrinos: ${padrinos}\n` +
      `• Frase: ${frase}\n` +
      `• Ubicación: ${ubicacion}\n` +
      `• Fecha de entrega deseada: ${fecha}\n` +
      `• Confirmar con anfitriona y ubicación: ${confirma}\n\n` +
      `¿Me podrías ayudar con el presupuesto? 🌸`;
  }

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}
