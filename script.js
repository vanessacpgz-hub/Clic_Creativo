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
// 3. WHATSAPP & COTIZACIONES GENERALES
// ==========================================
function sendWhatsApp(type, e) {
    e.preventDefault();
    const phone = '524494556465'; // Clic_Creativo Aguascalientes
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
// 4. BASE DE DATOS UNIFICADA DE PRODUCTOS
// ==========================================
const productosDB = {
    'inv-sencilla': {
        nombre: 'Invitación Esencial (Sencilla)',
        precio: 250, // Guardado numérico para operaciones aritméticas en el carrito
        precioTexto: '$250 MXN',
        categoria: 'Invitaciones',
        foto: 'Imagenes/CotizaInvitacion.png',
        descripcion: 'Diseño digital elegante y minimalista en formato estático de una sola página. Ideal para eventos íntimos o notificaciones rápidas. Incluye tipografía estilizada, paleta de colores personalizada y entrega en alta resolución listo para enviarse por WhatsApp.'
    },
    'inv-ubicacion': {
        nombre: 'Invitación Interactiva (Con Ubicación)',
        precio: 450,
        precioTexto: '$450 MXN',
        categoria: 'Invitaciones',
        foto: 'Imagenes/CotizaInvitacion.png',
        descripcion: 'Nuestra opción más popular. Una invitación interactiva que incluye botones dinámicos con enlace directo a Google Maps o Waze para la ubicación del evento, botón de confirmación de asistencia RSVP directo a tu WhatsApp y un contador de cuenta regresiva estilizado.'
    },
    'inv-premium': {
        nombre: 'Invitación Premium (Completa/Compleja)',
        precio: 650,
        precioTexto: '$650 MXN',
        categoria: 'Invitaciones',
        foto: 'Imagenes/CotizaInvitacion.png',
        descripcion: 'Experiencia digital de lujo para tus invitados. Incluye todas las funciones interactives (Ubicación, RSVP vía WhatsApp), además de pase digital con código de accesos, sección para sugerencia de música, mesa de regalos con enlaces directos y galería de fotos de los festejados con animaciones delicadas.'
    },
    'web-sencilla': {
        nombre: 'Landing Page Express (Sencilla)',
        precio: 1200,
        precioTexto: '$1,200 MXN',
        categoria: 'Páginas WEB',
        foto: 'Imagenes/Cotizapaginaweb.png',
        descripcion: 'Una página de aterrizaje (One Page) directa y optimizada. Cuenta con sección de bienvenida, descripción clara de tu producto o servicio principal, galería básica de imágenes y un formulario de contacto directo o enlace a tus redes. Ideal para arrancar tu presencia digital con estilo.'
    },
    'web-intermedia': {
        nombre: 'Web Comercial (Con Ubicación e Integraciones)',
        precio: 2400,
        precioTexto: '$2,400 MXN',
        categoria: 'Páginas WEB',
        foto: 'Imagenes/Cotizapaginaweb.png',
        descripcion: 'Sitio web multipágina o sección extendida perfecta para negocios establecidos, locales o profesionistas. Incluye mapa interactivo de Google Maps incrustado, catálogo o listado de servicios detallado, integración con botones de cotización por WhatsApp y optimización SEO local básica.'
    },
    'web-premium': {
        nombre: 'Web Premium Pro (Compleja / Administrable)',
        precio: 4500,
        precioTexto: '$4,500 MXN',
        categoria: 'Páginas WEB',
        foto: 'Imagenes/Cotizapaginaweb.png',
        descripcion: 'La solución definitiva para marcas exigentes. Estructura robusta y completamente personalizada basada en componentes dinámicos. Incluye secciones para blog o portafolio avanzado, integración de sistemas de reserva, animaciones interactivas premium y una arquitectura limpia lista para escalar a e-commerce.'
    }
};

// NAVEGACIÓN DEL CATÁLOGO
function mostrarCatalogo() {
    document.getElementById('landing-sections').style.display = 'none';
    document.getElementById('detalle-producto').style.display = 'none';
    document.getElementById('catalogo-productos').style.display = 'block';
    window.scrollTo(0, 0);
}

function verDetalleProducto(idProducto) {
    const info = productosDB[idProducto];
    if (!info) return;

    // 1. Llenar los datos principales del producto actual
    document.getElementById('det-foto').src = info.foto;
    document.getElementById('det-foto').alt = info.nombre;
    document.getElementById('det-categoria').innerText = info.categoria;
    document.getElementById('det-nombre').innerText = info.nombre;
    document.getElementById('det-precio').innerText = info.precioTexto;
    document.getElementById('det-descripcion').innerText = info.descripcion;

    // Conecta dinámicamente la ID del producto actual al botón del carrito
    prepararBotonCarrito(idProducto);

    // ==========================================================
    // NUEVO: LÓGICA DE PRODUCTOS RELACIONADOS
    // ==========================================================
    const contenedorRelacionados = document.getElementById('relacionados-lista');
    if (contenedorRelacionados) {
        contenedorRelacionados.innerHTML = ''; // Limpiar recomendaciones anteriores

        // Filtrar productos de la misma categoría, excluyendo el producto actual
        const relacionados = Object.keys(productosDB).filter(key => {
            return productosDB[key].categoria === info.categoria && key !== idProducto;
        });

        // Dibujar las tarjetas de los productos relacionados
        relacionados.forEach(key => {
            const prod = productosDB[key];
            contenedorRelacionados.innerHTML += `
                <div class="card" style="flex: 1; min-width: 250px; max-width: 320px; border: 1px solid #eee; padding: 15px; border-radius: 8px; text-align: center;">
                    <img src="${prod.foto}" alt="${prod.nombre}" style="width: 100%; height: auto; border-radius: 6px; margin-bottom: 10px;">
                    <span style="font-size: 0.8rem; color: gray; text-transform: uppercase;">${prod.categoria}</span>
                    <h4 style="font-size: 1.1rem; margin: 5px 0;">${prod.nombre}</h4>
                    <p style="font-weight: bold; color: #333; margin-bottom: 10px;">${prod.precioTexto}</p>
                    <button onclick="verDetalleProducto('${key}')" style="background-color: #000; color: #fff; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; width: 100%;">
                        Ver detalle
                    </button>
                </div>
            `;
        });

        // Si por alguna razón no hubiera otros productos en esa categoría, ocultamos el título
        const seccionRelacionados = document.getElementById('productos-relacionados');
        if (seccionRelacionados) {
            seccionRelacionados.style.display = relacionados.length > 0 ? 'block' : 'none';
        }
    }
    // ==========================================================

    // Cambiar de vistas
    document.getElementById('catalogo-productos').style.display = 'none';
    document.getElementById('detalle-producto').style.display = 'block';
    window.scrollTo(0, 0);
}

// BARRA DE REDES SOCIALES FLOTANTE
document.addEventListener("DOMContentLoaded", () => {
    const floatingSocials = document.getElementById('floatingSocials');
    let lastScrollTop = 0;

    if (floatingSocials) {
        window.addEventListener("scroll", () => {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > 200) {
                floatingSocials.style.opacity = "0.4";
            } else {
                floatingSocials.style.opacity = "1";
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, { passive: true });
    }
});

// MOTOR DE BÚSQUEDA EN TIEMPO REAL
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-catalog');
    
    if (searchInput) {
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

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                searchInput.blur(); 
            }
        });
    }
});

// ==========================================
// 5. LÓGICA DEL CARRITO DE COMPRAS
// ==========================================

// Cargar el carrito desde LocalStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('carrito_clic')) || [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfazCarrito();
});

// Abrir/cerrar la interfaz del carrito
function toggleModalCarrito() {
    const modal = document.getElementById('modal-carrito');
    if (modal) {
        modal.style.display = (modal.style.display === 'none' || modal.style.display === '') ? 'block' : 'none';
    }
}

// Configurar el botón de agregar cuando se visualiza un producto en el detalle
function prepararBotonCarrito(idProducto) {
    const btnAgregar = document.getElementById('btn-agregar-al-carrito');
    if (!btnAgregar) return;

    // Clonar para limpiar event listeners previos
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

    localStorage.setItem('carrito_clic', JSON.stringify(carrito));
    actualizarInterfazCarrito();
    toggleModalCarrito(); // Muestra el carrito de inmediato
}

// Eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito_clic', JSON.stringify(carrito));
    actualizarInterfazCarrito();
}

// Actualizar contadores y renderizar elementos en HTML
function actualizarInterfazCarrito() {
    const contador = document.getElementById('carrito-contador');
    const contenedorItems = document.getElementById('carrito-items');
    const contenedorTotal = document.getElementById('carrito-total-precio');

    // 1. Número flotante sobre el icono de carrito
    if (contador) {
        const totalProductos = carrito.reduce((suma, item) => suma + item.cantidad, 0);
        contador.textContent = totalProductos;
    }

    // 2. Render de elementos en el modal
    if (contenedorItems) {
        contenedorItems.innerHTML = '';
        let precioTotal = 0;

        carrito.forEach(item => {
            precioTotal += item.precio * item.cantidad;
            contenedorItems.innerHTML += `
                <div class="item-carrito" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <div>
                        <strong>${item.nombre}</strong> x${item.cantidad}
                        <br><span style="font-size:0.85rem; color:gray;">$${item.precio * item.cantidad} MXN</span>
                    </div>
                    <button onclick="eliminarDelCarrito('${item.id}')" style="background:none; border:none; color:red; cursor:pointer; font-size: 1.1rem;">❌</button>
                </div>
            `;
        });

        // 3. Imprimir el precio total formateado
        if (contenedorTotal) {
            contenedorTotal.textContent = `$${precioTotal.toLocaleString('es-MX')} MXN`;
        }
    }
}

// Enviar el pedido completo a WhatsApp
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const phone = '524494556465'; // Clic_Creativo Aguascalientes
    let mensaje = "¡Hola Clic_Creativo! 🌟 Me interesa contratar los siguientes servicios de mi carrito:\n\n";
    let precioTotal = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} (Cant: ${item.cantidad}) - $${item.precio * item.cantidad} MXN\n`;
        precioTotal += item.precio * item.cantidad;
    });

    mensaje += `\n*Total estimado:* $${precioTotal.toLocaleString('es-MX')} MXN\n\n¿Cuáles son los pasos para comenzar con el diseño? ✨`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`, '_blank');
}