// ==========================================
// 1. HAMBURGER MENU (MÓVIL)
// ==========================================
const ham = document.getElementById('ham');
const mobileNav = document.getElementById('mobileNav');
if (ham && mobileNav) {
    ham.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
}

// ==========================================
// 2. MODALES
// ==========================================
function openModal(type) {
    if (type === 'web') document.getElementById('modalWeb')?.classList.add('active');
    else if (type === 'invitacion') document.getElementById('modalInvitacion')?.classList.add('active');
    else if (type === 'contactoFlotante') {
        const form = document.getElementById('formContactoFlotante');
        const exito = document.getElementById('mensajeExito');
        if (form) form.style.display = 'flex';
        if (exito) exito.style.display = 'none';
        document.getElementById('modalContactoFlotante')?.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function closeModal(type) {
    if (type === 'web') document.getElementById('modalWeb')?.classList.remove('active');
    else if (type === 'invitacion') document.getElementById('modalInvitacion')?.classList.remove('active');
    else if (type === 'contactoFlotante') document.getElementById('modalContactoFlotante')?.classList.remove('active');
    document.body.style.overflow = '';
}

document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => {
        if (e.target === o) { o.classList.remove('active'); document.body.style.overflow = ''; }
    });
});

// ==========================================
// 3. WHATSAPP & COTIZACIONES
// ==========================================
function sendWhatsApp(type, e) {
    e.preventDefault();
    const phone = '524494556465';
    let msg = '';
    if (type === 'web') {
        const nombre   = document.getElementById('wb-nombre')?.value.trim() || 'Sin especificar';
        const objetivo = document.getElementById('wb-objetivo')?.value || 'Sin especificar';
        const presup   = document.getElementById('wb-presupuesto')?.value || 'Sin especificar';
        const logo     = document.querySelector('input[name="wb-logo"]:checked')?.value || 'Sin especificar';
        const secs     = [...document.querySelectorAll('input[name="wb-sec"]:checked')].map(c => c.value).join(', ') || 'Sin especificar';
        msg = `¡Hola Clic_Creativo! 🌟 Quiero cotizar una *Página WEB*.\n\n📋 *Detalles:*\n• Negocio: ${nombre}\n• Objetivo: ${objetivo}\n• Presupuesto: ${presup}\n• Logo y fotos: ${logo}\n• Secciones: ${secs}\n\n¿Me podrías ayudar con el presupuesto? 🌸`;
    } else {
        const tipo     = document.getElementById('inv-tipo')?.value || 'Sin especificar';
        const nombre   = document.getElementById('inv-nombre')?.value.trim() || 'Sin especificar';
        const fecha    = document.getElementById('inv-fecha')?.value || 'Sin especificar';
        const funcs    = [...document.querySelectorAll('input[name="inv-func"]:checked')].map(c => c.value).join(', ') || 'Sin especificar';
        const confirma = document.querySelector('input[name="inv-confirma"]:checked')?.value || 'Sin especificar';
        msg = `¡Hola Clic_Creativo! 🌟 Quiero cotizar una *Invitación Interactiva*.\n\n📋 *Detalles:*\n• Tipo: ${tipo}\n• Nombre: ${nombre}\n• Fecha: ${fecha}\n• Funciones: ${funcs}\n• Confirmar con anfitriona: ${confirma}\n\n¿Me podrías ayudar con el presupuesto? 🌸`;
    }
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

function handleContactoSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('formContactoFlotante');
    const exito = document.getElementById('mensajeExito');
    if (form) form.style.display = 'none';
    if (exito) exito.style.display = 'block';
    if (form) form.reset();
    setTimeout(() => closeModal('contactoFlotante'), 3500);
}

// ==========================================
// 4. PRODUCTOS DB
// ==========================================
const productosDB = {
    'inv-sencilla': { nombre: 'Invitación Esencial (Sencilla)', precio: 250, precioTexto: '$250 MXN', categoria: 'Invitaciones', foto: 'Imagenes/CotizaInvitacion.png', descripcion: 'Diseño digital elegante y minimalista. Ideal para eventos íntimos. Incluye tipografía estilizada y paleta personalizada.' },
    'inv-ubicacion': { nombre: 'Invitación Interactiva (Con Ubicación)', precio: 450, precioTexto: '$450 MXN', categoria: 'Invitaciones', foto: 'Imagenes/CotizaInvitacion.png', descripcion: 'Nuestra opción más popular. Incluye Google Maps, RSVP por WhatsApp y contador regresivo.' },
    'inv-premium': { nombre: 'Invitación Premium (Completa)', precio: 650, precioTexto: '$650 MXN', categoria: 'Invitaciones', foto: 'Imagenes/CotizaInvitacion.png', descripcion: 'Experiencia digital de lujo. Incluye pase digital, música, mesa de regalos y galería animada.' },
    'web-sencilla': { nombre: 'Landing Page Express', precio: 1200, precioTexto: '$1,200 MXN', categoria: 'Páginas WEB', foto: 'Imagenes/Cotizapaginaweb.png', descripcion: 'Una página de aterrizaje directa y optimizada con galería, servicios y contacto.' },
    'web-intermedia': { nombre: 'Web Comercial', precio: 2400, precioTexto: '$2,400 MXN', categoria: 'Páginas WEB', foto: 'Imagenes/Cotizapaginaweb.png', descripcion: 'Sitio multipágina con Google Maps, catálogo de servicios y botones de WhatsApp.' },
    'web-premium': { nombre: 'Web Premium Pro', precio: 4500, precioTexto: '$4,500 MXN', categoria: 'Páginas WEB', foto: 'Imagenes/Cotizapaginaweb.png', descripcion: 'Solución completa con blog, reservas, animaciones premium y arquitectura escalable.' }
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
    document.getElementById('det-precio').innerText = info.precioTexto;
    document.getElementById('det-descripcion').innerText = info.descripcion;
    const inputCant = document.getElementById('det-cantidad');
    if (inputCant) inputCant.value = 1;
    prepararBotonCarrito(idProducto);
    const contenedorRelacionados = document.getElementById('relacionados-lista');
    if (contenedorRelacionados) {
        contenedorRelacionados.innerHTML = '';
        const relacionados = Object.keys(productosDB).filter(k => productosDB[k].categoria === info.categoria && k !== idProducto);
        relacionados.forEach(key => {
            const prod = productosDB[key];
            contenedorRelacionados.innerHTML += `<div class="card" style="flex:1;min-width:250px;max-width:320px;border:1px solid #eee;padding:15px;border-radius:8px;text-align:center;"><img src="${prod.foto}" alt="${prod.nombre}" style="width:100%;height:auto;border-radius:6px;margin-bottom:10px;"><span style="font-size:0.8rem;color:gray;text-transform:uppercase;">${prod.categoria}</span><h4 style="font-size:1.1rem;margin:5px 0;">${prod.nombre}</h4><p style="font-weight:bold;color:#333;margin-bottom:10px;">${prod.precioTexto}</p><button onclick="verDetalleProducto('${key}')" style="background:#db2777;color:#fff;border:none;padding:8px 15px;border-radius:4px;cursor:pointer;width:100%;">Ver detalle</button></div>`;
        });
        const secRel = document.getElementById('productos-relacionados');
        if (secRel) secRel.style.display = relacionados.length > 0 ? 'block' : 'none';
    }
    document.getElementById('catalogo-productos').style.display = 'none';
    document.getElementById('detalle-producto').style.display = 'block';
    window.scrollTo(0, 0);
}

// ==========================================
// 5. CARRITO
// ==========================================
let carrito = JSON.parse(localStorage.getItem('carrito_clic')) || [];

document.addEventListener('DOMContentLoaded', () => actualizarInterfazCarrito());

function toggleModalCarrito() {
    const modal = document.getElementById('modal-carrito');
    if (modal) modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
}

function prepararBotonCarrito(idProducto) {
    const btnAgregar = document.getElementById('btn-agregar-al-carrito');
    if (!btnAgregar) return;
    const nuevoBtn = btnAgregar.cloneNode(true);
    btnAgregar.parentNode.replaceChild(nuevoBtn, btnAgregar);
    nuevoBtn.addEventListener('click', () => agregarAlCarrito(idProducto));
}

function agregarAlCarrito(id) {
    const producto = productosDB[id];
    if (!producto) return;
    const inputCant = document.getElementById('det-cantidad');
    const cantidad = inputCant ? Math.max(1, parseInt(inputCant.value, 10) || 1) : 1;
    const existente = carrito.find(item => item.id === id);
    if (existente) existente.cantidad += cantidad;
    else carrito.push({ id, nombre: producto.nombre, precio: producto.precio, cantidad });
    localStorage.setItem('carrito_clic', JSON.stringify(carrito));
    actualizarInterfazCarrito();
    toggleModalCarrito();
}

function eliminarDelCarrito(id) {
    const item = carrito.find(i => i.id === id);
    mostrarConfirm('🛒 ¿Eliminar del carrito?', '¿Deseas eliminar "' + (item ? item.nombre : 'este producto') + '" de tu carrito?', function() {
        carrito = carrito.filter(i => i.id !== id);
        localStorage.setItem('carrito_clic', JSON.stringify(carrito));
        actualizarInterfazCarrito();
        showToast('✅ Producto eliminado del carrito');
    });
}

function actualizarInterfazCarrito() {
    const contador = document.getElementById('carrito-contador');
    const contenedorItems = document.getElementById('carrito-items');
    const contenedorTotal = document.getElementById('carrito-total-precio');
    if (contador) contador.textContent = carrito.reduce((s, i) => s + i.cantidad, 0);
    if (contenedorItems) {
        let total = 0;
        contenedorItems.innerHTML = carrito.map(item => {
            total += item.precio * item.cantidad;
            return `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;border-bottom:1px solid #eee;padding-bottom:5px;"><div><strong>${item.nombre}</strong> x${item.cantidad}<br/><span style="font-size:0.85rem;color:gray;">$${(item.precio*item.cantidad).toLocaleString()} MXN</span></div><button onclick="eliminarDelCarrito('${item.id}')" style="background:none;border:none;color:red;cursor:pointer;font-size:1.1rem;">❌</button></div>`;
        }).join('');
        if (contenedorTotal) contenedorTotal.textContent = `$${total.toLocaleString('es-MX')} MXN`;
    }
}

function irAlCheckout() {
    if (carrito.length === 0) { showToast('⚠️ Tu carrito está vacío'); return; }
    const cb = document.getElementById('acepta-terminos');
    if (!cb || !cb.checked) { showToast('⚠️ Acepta los términos y condiciones primero 🌸'); return; }
    if (typeof ocultarTodosLosPaneles === 'function') ocultarTodosLosPaneles();
    const p = document.getElementById('panel-checkout');
    if (p) p.style.display = 'block';
    ['checkout-paso-2','checkout-paso-3'].forEach(id => { const el=document.getElementById(id); if(el) el.style.display='none'; });
    const p1 = document.getElementById('checkout-paso-1'); if(p1) p1.style.display='block';
    if (typeof setStep === 'function') setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 6. ADMINISTRACIÓN
// ==========================================
function toggleAdminMenu() {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

function mostrarDashboardAdmin() {
    if (typeof mostrarSeccionAdmin === 'function') mostrarSeccionAdmin('dashboard');
}

function regresarAlInicio() {
    if (typeof ocultarTodosLosPaneles === 'function') {
        ocultarTodosLosPaneles();
    } else {
        ['admin-dashboard-panel','admin-productos-panel','admin-pedidos-panel',
         'admin-promociones-panel','admin-clientes-panel','admin-reportes-panel',
         'panel-publicar','panel-mis-publicaciones','panel-subasta',
         'panel-checkout','panel-confirmacion','panel-ticket','panel-mis-compras',
         'catalogo-productos','detalle-producto'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }
    const ls = document.getElementById('landing-sections');
    if (ls) ls.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 7. TOAST & CONFIRM — defined in home.html inline script
// These are stubs so script.js doesn't error if loaded standalone
// ==========================================
if (typeof showToast === 'undefined') {
    window.showToast = function(msg) {
        const t = document.getElementById('toast-ok');
        const m = document.getElementById('toast-msg');
        if (!t || !m) return;
        m.textContent = msg; t.style.display = 'block';
        setTimeout(() => { t.style.display = 'none'; }, 3000);
    };
}
if (typeof mostrarConfirm === 'undefined') {
    window.mostrarConfirm = function(titulo, mensaje, callback) {
        const modal = document.getElementById('modal-confirm');
        if (!modal) { if (window.confirm(mensaje)) callback(); return; }
        document.getElementById('confirm-title').textContent = titulo;
        document.getElementById('confirm-msg').textContent = mensaje;
        window._confirmCallback = callback;
        modal.style.display = 'flex';
    };
}
function confirmCancel() {
    const m = document.getElementById('modal-confirm');
    if (m) m.style.display = 'none';
    window._confirmCallback = null;
}

// ==========================================
// 8. FORMULARIOS ADMIN (COMPATIBILIDAD)
// ==========================================
function abrirFormularioProducto() {}
function cerrarFormularioProducto() {}
function actualizarPrevisualizacionImagen() {}
function guardarProductoAdmin(e) { if (e) e.preventDefault(); }

// ==========================================
// 9. SCROLL REDES SOCIALES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const floatingSocials = document.getElementById('floatingSocials');
    if (!floatingSocials) return;
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const current = window.pageYOffset || document.documentElement.scrollTop;
        floatingSocials.style.opacity = current > lastScrollTop && current > 200 ? '0.4' : '1';
        lastScrollTop = current <= 0 ? 0 : current;
    }, { passive: true });
});

// ==========================================
// 10. BÚSQUEDA EN CATÁLOGO
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-catalog');
    if (!searchInput) return;
    searchInput.addEventListener('input', e => {
        const term = e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
        document.querySelectorAll('.cards .card').forEach(card => {
            const text = card.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            card.style.display = text.includes(term) ? '' : 'none';
        });
    });
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); searchInput.blur(); } });
});

// ==========================================
// 11. DESCUENTO
// ==========================================
function aplicarDescuento() {
    const input = document.getElementById('coupon-input');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    const mensajeExito = document.getElementById('success-message');
    const elementoTotal = document.getElementById('total-price');
    if (code === 'CREATIVO10') {
        if (mensajeExito) mensajeExito.classList.remove('hidden');
        if (elementoTotal) { elementoTotal.textContent = '$900.00'; elementoTotal.style.color = '#10b981'; }
    } else if (code === '') {
        showToast('⚠️ Ingresa un código de descuento');
    } else {
        showToast('⚠️ Código no válido. Intenta con: CREATIVO10');
    }
}

// ==========================================
// 12. COMUNIDAD
// ==========================================
function abrirModalComunidad() {
    const m = document.getElementById('modal-comunidad');
    if (m) m.style.display = 'flex';
}

function cerrarModalComunidad() {
    const m = document.getElementById('modal-comunidad');
    if (m) m.style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-comunidad');
    if (modal && event.target === modal) modal.style.display = 'none';
});

function agregarComentario() {
    const nombreInput = document.getElementById('comment-name');
    const textoInput = document.getElementById('comment-text');
    const lista = document.getElementById('comments-list');
    if (!nombreInput || !textoInput || !lista) return;
    const nombre = nombreInput.value.trim();
    const div = document.createElement('div');
    div.classList.add('comment-item', 'new-comment-animation');
    div.innerHTML = `<div class="comment-header"><span class="comment-user">${nombre}</span><span class="comment-date">Justo ahora</span></div><p class="comment-body">${texto}</p>`;
    lista.insertBefore(div, lista.firstChild);
    nombreInput.value = '';
    textoInput.value = '';
}

// ==========================================
// 13. POLÍTICAS MODAL
// ==========================================
function openModalPoliticas(e) {
    if (e) e.preventDefault();
    const m = document.getElementById('modal-politicas');
    if (m) m.style.display = 'flex';
}

function closeModalPoliticas() {
    const m = document.getElementById('modal-politicas');
    if (m) m.style.display = 'none';
}
