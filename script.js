// Hamburger
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');
ham.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// Modals
function openModal(type) {
  if (type === 'web') {
    document.getElementById('modalWeb').classList.add('active');
  } else if (type === 'invitacion') {
    document.getElementById('modalInvitacion').classList.add('active');
  } else if (type === 'contactoFlotante') {
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

document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { 
    if (e.target === o) { 
      o.classList.remove('active'); 
      document.body.style.overflow = ''; 
    } 
  });
});

// WhatsApp Cotizaciones
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

// Manejo del formulario flotante
function handleContactoSubmit(event) {
  event.preventDefault();
  document.getElementById('formContactoFlotante').style.display = 'none';
  document.getElementById('mensajeExito').style.display = 'block';
  document.getElementById('formContactoFlotante').reset();

  setTimeout(() => {
    closeModal('contactoFlotante');
  }, 3500);
}

// ===== SISTEMA DE NAVEGACIÓN DINÁMICA DE PRODUCTOS =====

const productosDB = {
  'web-pro': {
    nombre: 'Plantilla Web Pro',
    precio: '$1,899 MXN',
    categoria: 'Páginas WEB',
    foto: 'Imagenes/Cotizapaginaweb.png',
    descripcion: 'Una página web completa, elegante y totalmente responsiva. Ideal para negocios locales o marcas personales que buscan destacar de inmediato en el mundo digital. Incluye secciones optimizadas para conversión.'
  },
  'inv-glamour': {
    nombre: 'Invitación Glamour',
    precio: '$450 MXN',
    categoria: 'Invitaciones',
    foto: 'Imagenes/CotizaInvitacion.png',
    descripcion: 'Diseño exclusivo con animaciones delicadas, confirmación de asistencia directa, contador regresivo personalizado y enlace directo a Google Maps para que tus invitados no se pierdan ningún detalle.'
  }
};

function mostrarCatalogo() {
  document.getElementById('landing-sections').style.display = 'none';
  document.getElementById('detalle-producto').style.display = 'none';
  document.getElementById('catalogo-productos').style.display = 'block';
  window.scrollTo(0, 0);
}

function verDetalleProducto(idProducto) {
  const info = productosDB[idProducto];
  if (!info) return;

  document.getElementById('det-foto').src = info.foto;
  document.getElementById('det-foto').alt = info.nombre;
  document.getElementById('det-categoria').innerText = info.categoria;
  document.getElementById('det-nombre').innerText = info.nombre;
  document.getElementById('det-precio').innerText = info.precio;
  document.getElementById('det-descripcion').innerText = info.descripcion;

  document.getElementById('catalogo-productos').style.display = 'none';
  document.getElementById('detalle-producto').style.display = 'block';
  window.scrollTo(0, 0);
}

function regresarAlInicio() {
  document.getElementById('catalogo-productos').style.display = 'none';
  document.getElementById('detalle-producto').style.display = 'none';
  document.getElementById('landing-sections').style.display = 'block';
  window.scrollTo(0, 0);
}