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

    // NUEVO: Reiniciar el input de cantidad a 1 cada vez que se abre un producto nuevo
    const inputCant = document.getElementById('det-cantidad');
    if (inputCant) inputCant.value = 1;

    // Conecta dinámicamente la ID del producto actual al botón del carrito
    prepararBotonCarrito(idProducto);

    // ==========================================================
    // LÓGICA DE PRODUCTOS RELACIONADOS
    // ==========================================================
    const contenedorRelacionados = document.getElementById('relacionados-lista');
    if (contenedorRelacionados) {
        contenedorRelacionados.innerHTML = ''; 

        const relacionados = Object.keys(productosDB).filter(key => {
            return productosDB[key].categoria === info.categoria && key !== idProducto;
        });

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

// Agregar producto al array considerando la cantidad seleccionada
function agregarAlCarrito(id) {
    const producto = productosDB[id];
    if (!producto) return;

    // NUEVO: Obtener la cantidad seleccionada en el input (asegurando un número entero válido mayor a 0)
    const inputCant = document.getElementById('det-cantidad');
    const cantidadSeleccionada = inputCant ? parseInt(inputCant.value, 10) : 1;
    const cantidadAAgregar = isNaN(cantidadSeleccionada) || cantidadSeleccionada < 1 ? 1 : cantidadSeleccionada;

    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        // En lugar de hacer += 1, ahora sumamos la cantidad elegida
        itemExistente.cantidad += cantidadAAgregar;
    } else {
        carrito.push({
            id: id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidadAAgregar // Guardamos la cantidad elegida
        });
    }

    localStorage.setItem('carrito_clic', JSON.stringify(carrito));
    actualizarInterfazCarrito();
    toggleModalCarrito(); 
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
    const item = carrito.find(i => i.id === id);
    const nombre = item ? item.nombre : 'este producto';
    mostrarConfirm(
        '🛒 ¿Eliminar del carrito?',
        '¿Deseas eliminar "' + nombre + '" de tu carrito?',
        function() {
            carrito = carrito.filter(i => i.id !== id);
            localStorage.setItem('carrito_clic', JSON.stringify(carrito));
            actualizarInterfazCarrito();
            showToast('✅ Producto eliminado del carrito');
        }
    );
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

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        showToast('⚠️ Tu carrito está vacío');
        return;
    }
    const checkboxTerminos = document.getElementById('acepta-terminos');
    if (!checkboxTerminos || !checkboxTerminos.checked) {
        showToast('⚠️ Acepta los términos y condiciones primero 🌸');
        return;
    }

    const phone = '524494556465';
    let mensaje = '¡Hola Clic_Creativo! 🌟 Me interesa contratar los siguientes servicios:\n\n';
    let precioTotal = 0;
    carrito.forEach(item => {
        mensaje += `• ${item.nombre} (Cant: ${item.cantidad}) - $${(item.precio * item.cantidad).toLocaleString('es-MX')} MXN\n`;
        precioTotal += item.precio * item.cantidad;
    });
    mensaje += `\n*Total estimado:* $${precioTotal.toLocaleString('es-MX')} MXN\n\nHe leído y acepto las políticas de diseño. ¿Cuáles son los pasos para comenzar? ✨`;

    mostrarConfirm(
        '💬 Enviar pedido',
        `Se abrirá WhatsApp con tu pedido por $${precioTotal.toLocaleString('es-MX')} MXN. ¿Confirmas?`,
        function() {
            window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(mensaje), '_blank');
        }
    );
}

// Función para abrir y cerrar la barra lateral de administración
function toggleAdminMenu() {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Funciones legacy — la navegación real está en home.html inline script
function mostrarDashboardAdmin() {
    if (typeof mostrarSeccionAdmin === 'function') mostrarSeccionAdmin('dashboard');
}

function regresarAlInicio() {
    ['admin-dashboard-panel','admin-productos-panel','admin-pedidos-panel',
     'admin-promociones-panel','catalogo-productos'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const ls = document.getElementById('landing-sections');
    if (ls) ls.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toast global (usado desde home.html y script.js)
function showToast(msg) {
    const t = document.getElementById('toast-ok');
    const m = document.getElementById('toast-msg');
    if (!t || !m) return;
    m.textContent = msg;
    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 3000);
}

// Confirm modal global
function mostrarConfirm(titulo, mensaje, callback) {
    const m = document.getElementById('modal-confirm');
    if (!m) { if (confirm(mensaje)) callback(); return; }
    document.getElementById('confirm-title').textContent = titulo;
    document.getElementById('confirm-msg').textContent = mensaje;
    window._confirmCallback = callback;
    m.style.display = 'flex';
}
function confirmCancel() {
    const m = document.getElementById('modal-confirm');
    if (m) m.style.display = 'none';
    window._confirmCallback = null;
}
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('confirm-ok-btn');
    if (btn) {
        btn.addEventListener('click', function() {
            document.getElementById('modal-confirm').style.display = 'none';
            if (window._confirmCallback) { window._confirmCallback(); window._confirmCallback = null; }
        });
    }
});

// Funciones antiguas del formulario (no usadas, mantenidas para compatibilidad)
function abrirFormularioProducto() {}
function cerrarFormularioProducto() {}
function actualizarPrevisualizacionImagen() {}
function guardarProductoAdmin(e) { if(e) e.preventDefault(); }

    function aplicarDescuento() {
        // 1. Obtenemos lo que el usuario escribió, quitamos espacios y lo pasamos a mayúsculas
        const input = document.getElementById('coupon-input').value.trim().toUpperCase();
        
        // 2. Traemos los elementos de la pantalla que vamos a modificar
        const mensajeExito = document.getElementById('success-message');
        const elementoTotal = document.getElementById('total-price');

        // 3. Validamos si el código es el correcto
        if (input === 'CREATIVO10') {
            
            // Muestra el mensaje de éxito quitando la clase que lo ocultaba
            mensajeExito.classList.remove('hidden');
            
            // Cambia el texto del precio simulando el 10% de descuento ($1,000 -> $900)
            elementoTotal.textContent = '$900.00';
            
            // Cambia el color del precio a verde para que se note el cambio visual
            elementoTotal.style.color = '#10b981'; 

        } else if (input === '') {
            // Alerta si el usuario da clic con el campo vacío
            alert('Por favor, ingresa un código de descuento.');
        } else {
            // Alerta si el código está mal escrito
            alert('Código no válido. Intenta con: CREATIVO10');
        }
    }
function agregarComentario() {
    const nombreInput = document.getElementById('comment-name');
    const textoInput = document.getElementById('comment-text');
    const listaComentarios = document.getElementById('comments-list');

    const nombre = nombreInput.value.trim();
    const texto = textoInput.value.trim();

    // Validación básica de campos vacíos
    if (nombre === '' || texto === '') {
        alert('Por favor, completa tu nombre y escribe un comentario antes de publicar.');
        return;
    }

    // Crear el contenedor del nuevo comentario
    const nuevoComentario = document.createElement('div');
    nuevoComentario.classList.add('comment-item', 'new-comment-animation');

    // Estructura interna del comentario
    nuevoComentario.innerHTML = `
        <div class="comment-header">
            <span class="comment-user">${nombre}</span>
            <span class="comment-date">Justo ahora</span>
        </div>
        <p class="comment-body">${texto}</p>
    `;

    // Insertar el nuevo comentario al inicio de la lista
    listaComentarios.insertBefore(nuevoComentario, listaComentarios.firstChild);

    // Limpiar los campos del formulario
    nombreInput.value = '';
    textoInput.value = '';
}