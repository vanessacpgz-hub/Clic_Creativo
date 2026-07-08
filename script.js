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

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    // NUEVO: Validación de Términos y Condiciones
    const checkboxTerminos = document.getElementById('acepta-terminos');
    if (!checkboxTerminos || !checkboxTerminos.checked) {
        alert("Por favor, acepta los términos, condiciones y políticas de producto antes de enviar tu pedido. 🌸");
        return; // Detiene por completo la ejecución y no abre WhatsApp
    }

    const phone = '524494556465'; // Clic_Creativo Aguascalientes
    let mensaje = "¡Hola Clic_Creativo! 🌟 Me interesa contratar los siguientes servicios de mi carrito:\n\n";
    let precioTotal = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} (Cant: ${item.cantidad}) - $${item.precio * item.cantidad} MXN\n`;
        precioTotal += item.precio * item.cantidad;
    });

    mensaje += `\n*Total estimado:* $${precioTotal.toLocaleString('es-MX')} MXN\n\n He leído y acepto las políticas de diseño. ¿Cuáles son los pasos para comenzar? ✨`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`, '_blank');
}
// Función para abrir y cerrar la barra lateral de administración
function toggleAdminMenu() {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Función para mostrar el panel de administración y ocultar el contenido público
function mostrarDashboardAdmin() {
    // 1. Cerramos el menú lateral para limpiar la pantalla
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) {
        sidebar.classList.remove('active');
    }
    
    // 2. Ocultamos las secciones de la tienda/landing
    const landingSections = document.getElementById('landing-sections');
    const catalogoSection = document.getElementById('catalogo-productos');
    const detalleSection = document.getElementById('detalle-producto');
    
    if (landingSections) landingSections.style.display = 'none';
    if (catalogoSection) catalogoSection.style.display = 'none';
    if (detalleSection) detalleSection.style.display = 'none';
    
    // 3. Mostramos el panel de control del administrador
    const adminPanel = document.getElementById('admin-dashboard-panel');
    if (adminPanel) {
        adminPanel.style.display = 'block';
    }
    
    // Movemos el scroll al inicio para que se vea desde arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para regresar a la vista pública de la tienda
function regresarAlInicio() {
    const adminPanel = document.getElementById('admin-dashboard-panel');
    const landingSections = document.getElementById('landing-sections');
    const catalogoSection = document.getElementById('catalogo-productos');
    
    if (adminPanel) adminPanel.style.display = 'none';
    if (catalogoSection) catalogoSection.style.display = 'none';
    
    // Volvemos a encender la estructura principal de la landing
    if (landingSections) landingSections.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Funciones para controlar el Formulario Modular de Productos
function abrirFormularioProducto(esEdicion = false) {
    const modal = document.getElementById('modal-form-producto');
    const titulo = document.getElementById('form-producto-titulo');
    
    if (modal) {
        modal.style.display = 'flex';
        // Cambia el título dependiendo de la acción
        if (titulo) {
            titulo.textContent = esEdicion ? "✏️ Editar Producto" : "📦 Agregar Nuevo Producto";
        }
    }
}

function cerrarFormularioProducto() {
    const modal = document.getElementById('modal-form-producto');
    const formulario = document.getElementById('form-registro-producto');
    
    if (modal) modal.style.display = 'none';
    if (formulario) formulario.reset(); // Limpia los campos al cerrar
    
    // Resetea la imagen de previsualización al icono base
    actualizarPrevisualizacionImagen("Imagenes/CotizaInvitacion.png");
}

function actualizarPrevisualizacionImagen(rutaImagen) {
    const preview = document.getElementById('prod-preview-img');
    if (preview) {
        preview.src = rutaImagen;
    }
}

function guardarProductoAdmin(event) {
    event.preventDefault(); // Evita que la página recargue
    
    // Captura de datos estructurada
    const nombre = document.getElementById('prod-nombre').value;
    const categoria = document.getElementById('prod-categoria').value;
    const precio = document.getElementById('prod-precio').value;
    const descripcion = document.getElementById('prod-descripcion').value;
    const imagen = document.getElementById('prod-imagen-select').value;
    const existencia = document.getElementById('prod-existencia').value;
    const estado = document.getElementById('prod-estado').value;

    // Aquí irá tu lógica de inserción o actualización (ej. LocalStorage o Base de Datos)
    alert(`✨ ¡Producto "${nombre}" guardado con éxito simulado!\nEstado: ${estado} | Stock: ${existencia}`);
    
    cerrarFormularioProducto();
}