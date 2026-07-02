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
// 2. MODALES (ABRIR / CERRAR)
// ==========================================
function openModal(type) {
    if (type === 'web') {
        document.getElementById('modalWeb')?.classList.add('active');
    } else if (type === 'invitacion') {
        document.getElementById('modalInvitacion')?.classList.add('active');
    } else if (type === 'contactoFlotante') {
        const form = document.getElementById('formContactoFlotante');
        const exito = document.getElementById('mensajeExito');
        if (form) form.style.display = 'flex';
        if (exito) exito.style.display = 'none';
        document.getElementById('modalContactoFlotante')?.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function closeModal(type) {
    if (type === 'web') {
        document.getElementById('modalWeb')?.classList.remove('active');
    } else if (type === 'invitacion') {
        document.getElementById('modalInvitacion')?.classList.remove('active');
    } else if (type === 'contactoFlotante') {
        document.getElementById('modalContactoFlotante')?.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// Cerrar modales haciendo clic en el fondo (overlay)
document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { 
        if (e.target === o) { 
            o.classList.remove('active'); 
            document.body.style.overflow = ''; 
        } 
    });
});

// ==========================================
// 3. WHATSAPP & COTIZACIONES
// ==========================================
function sendWhatsApp(type, e) {
    e.preventDefault();
    const phone = '524494556465'; // Aguascalientes, MX
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

// Formulario de contacto rápido
function handleContactoSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('formContactoFlotante');
    const exito = document.getElementById('mensajeExito');
    
    if (form) form.style.display = 'none';
    if (exito) exito.style.display = 'block';
    if (form) form.reset();

    setTimeout(() => {
        closeModal('contactoFlotante');
    }, 3500);
}

// ==========================================
// 4. BASE DE DATOS Y CATÁLOGO DE PRODUCTOS
// ==========================================
const productosDB = {
    'inv-sencilla': {
        nombre: 'Invitación Esencial (Sencilla)',
        precio: '$250 MXN',
        categoria: 'Invitaciones',
        foto: 'Imagenes/CotizaInvitacion.png',
        descripcion: 'Diseño digital elegante y minimalista en formato estático de una sola página. Ideal para eventos íntimos o notificaciones rápidas. Incluye tipografía estilizada, paleta de colores personalizada y entrega en alta resolución listo para enviarse por WhatsApp.'
    },
    'inv-ubicacion': {
        nombre: 'Invitación Interactiva (Con Ubicación)',
        precio: '$450 MXN',
        categoria: 'Invitaciones',
        foto: 'Imagenes/CotizaInvitacion.png',
        descripcion: 'Nuestra opción más popular. Una invitación interactiva que incluye botones dinámicos con enlace directo a Google Maps o Waze para la ubicación del evento, botón de confirmación de asistencia RSVP directo a tu WhatsApp y un contador de cuenta regresiva estilizado.'
    },
    'inv-premium': {
        nombre: 'Invitación Premium (Completa/Compleja)',
        precio: '$650 MXN',
        categoria: 'Invitaciones',
        foto: 'Imagenes/CotizaInvitacion.png',
        descripcion: 'Experiencia digital de lujo para tus invitados. Incluye todas las funciones interactivas (Ubicación, RSVP vía WhatsApp), además de pase digital con código de accesos, sección para sugerencia de música, mesa de regalos con enlaces directos y galería de fotos de los festejados con animaciones delicadas.'
    },
    'web-sencilla': {
        nombre: 'Landing Page Express (Sencilla)',
        precio: '$1,200 MXN',
        categoria: 'Páginas WEB',
        foto: 'Imagenes/Cotizapaginaweb.png',
        descripcion: 'Una página de aterrizaje (One Page) directa y optimizada. Cuenta con sección de bienvenida, descripción clara de tu producto o servicio principal, galería básica de imágenes y un formulario de contacto directo o enlace a tus redes. Ideal para arrancar tu presencia digital con estilo.'
    },
    'web-intermedia': {
        nombre: 'Web Comercial (Con Ubicación e Integraciones)',
        precio: '$2,400 MXN',
        categoria: 'Páginas WEB',
        foto: 'Imagenes/Cotizapaginaweb.png',
        descripcion: 'Sitio web multipágina o sección extendida perfecta para negocios establecidos, locales o profesionistas. Incluye mapa interactivo de Google Maps incrustado, catálogo o listado de servicios detallado, integración con botones de cotización por WhatsApp y optimización SEO local básica.'
    },
    'web-premium': {
        nombre: 'Web Premium Pro (Compleja / Administrable)',
        precio: '$4,500 MXN',
        categoria: 'Páginas WEB',
        foto: 'Imagenes/Cotizapaginaweb.png',
        descripcion: 'La solución definitiva para marcas exigentes. Estructura robusta y completamente personalizada basada en componentes dinámicos. Incluye secciones para blog o portafolio avanzado, integración de sistemas de reserva, animaciones interactivas premium y una arquitectura limpia lista para escalar a e-commerce.'
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
// COMPORTAMIENTO PARA LA BARRA DE REDES SOCIALES FLOTANTE
document.addEventListener("DOMContentLoaded", () => {
  const floatingSocials = document.getElementById('floatingSocials');
  let lastScrollTop = 0;

  if (floatingSocials) {
    window.addEventListener("scroll", () => {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop && currentScroll > 200) {
        // Al hacer scroll hacia abajo, se vuelve traslúcido para no molestar la lectura
        floatingSocials.style.opacity = "0.4";
      } else {
        // Al subir o detenerse, se muestra al 100% de inmediato
        floatingSocials.style.opacity = "1";
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-catalog');
    
    if (searchInput) {
        // 1. Filtro en tiempo real (el que ya tienes)
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u030f]/g, "").trim();
            const productCards = document.querySelectorAll('.cards .card');

            productCards.forEach(card => {
                const cardText = card.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u030f]/g, "");
                if (cardText.includes(searchTerm)) {
                    card.style.display = ""; 
                } else {
                    card.style.display = "none"; 
                }
            });
        });

        // 2. NUEVO: Evitar que el Enter recargue la página
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Evita que la página se refresque
                searchInput.blur(); // Opcional: quita el foco del input para cerrar el teclado en celular
            }
        });
    }
});
// ==========================================
// LÓGICA DEL CARRITO DE COMPRAS
// ==========================================

// Base de datos local de tus productos para saber qué agregar desde el detalle
const productosDB = {
    'inv-sencilla': { nombre: 'Invitación Esencial', precio: 250 },
    'inv-ubicacion': { nombre: 'Invitación Interactiva', precio: 450 },
    'inv-premium': { nombre: 'Invitación Premium', precio: 650 },
    'web-sencilla': { nombre: 'Landing Page Express', precio: 1200 },
    'web-intermedia': { nombre: 'Web Comercial', precio: 2400 },
    'web-premium': { nombre: 'Web Premium Pro', precio: 4500 }
};

// Cargar el carrito desde LocalStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito_clic')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfazCarrito();
});

// Función para abrir/cerrar la ventana del carrito
function toggleModalCarrito() {
    const modal = document.getElementById('modal-carrito');
    modal.style.display = modal.style.display === 'none' ? 'block' : 'none';
}

// Configurar el botón de agregar cuando se visualiza un producto en el detalle
// Esta función la debes llamar dentro de tu función existente "verDetalleProducto(id)"
function prepararBotonCarrito(idProducto) {
    const btnAgregar = document.getElementById('btn-agregar-al-carrito');
    if (!btnAgregar) return;

    // Removemos oyentes viejos clonando el botón para evitar duplicados
    const nuevoBtn = btnAgregar.cloneNode(true);
    btnAgregar.parentNode.replaceChild(nuevoBtn, btnAgregar);

    nuevoBtn.addEventListener('click', () => {
        agregarAlCarrito(idProducto);
    });
}

// Agregar producto al array
function agregarAlCarrito(id) {
    const producto = productosDB[id];
    if (!producto) return;

    // Verificar si ya existe en el carrito para sumar la cantidad
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    // Guardar en LocalStorage y actualizar la vista
    localStorage.setItem('carrito_clic', JSON.stringify(carrito));
    actualizarInterfazCarrito();
    
    // Opcional: abrir el carrito automáticamente al agregar
    toggleModalCarrito();
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito_clic', JSON.stringify(carrito));
    actualizarInterfazCarrito();
}

// Dibujar el carrito en pantalla y actualizar el número flotante
function actualizarInterfazCarrito() {
    const contador = document.getElementById('carrito-contador');
    const contenedorItems = document.getElementById('carrito-items');
    const contenedorTotal = document.getElementById('carrito-total-precio');

    // 1. Actualizar el número flotante
    const totalProductos = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    contador.textContent = totalProductos;

    // 2. Renderizar los items dentro del carrito
    contenedorItems.innerHTML = '';
    let precioTotal = 0;

    carrito.forEach(item => {
        precioTotal += item.precio * item.cantidad;
        contenedorItems.innerHTML += `
            <div class="item-carrito">
                <div>
                    <strong>${item.nombre}</strong> x${item.cantidad}
                    <br><span style="font-size:0.85rem; color:gray;">$${item.precio * item.cantidad} MXN</span>
                </div>
                <button onclick="eliminarDelCarrito('${item.id}')" style="background:none; border:none; color:red; cursor:pointer;">❌</button>
            </div>
        `;
    });

    // 3. Actualizar precio total
    contenedorTotal.textContent = `$${precioTotal.toLocaleString('es-MX')} MXN`;
}

// Integración con WhatsApp para procesar el pedido directamente
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    let mensaje = "¡Hola Clic Creativo! Me gustaría cotizar/adquirir los siguientes servicios:\n\n";
    let precioTotal = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} (Cant: ${item.cantidad}) - $${item.precio * item.cantidad} MXN\n`;
        precioTotal += item.precio * item.cantidad;
    });

    mensaje += `\n*Total estimado:* $${precioTotal.toLocaleString('es-MX')} MXN`;
    
    // Codificar mensaje para URL
    const url = `https://wa.me/TU_NUMERO_DE_TELEFONO?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

