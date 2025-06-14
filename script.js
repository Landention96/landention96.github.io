// ¡Bienvenido a mi código JavaScript! Aquí es donde la magia ocurre y todo cobra vida

document.addEventListener('DOMContentLoaded', function() {
    // Sidebar y anuncios
    const sidebarToggle = document.getElementById('sidebarToggle');
    const container = document.querySelector('.container');
    const ads = document.querySelectorAll('.ad-space');
    const adsContainer = document.querySelector('.ads');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    // Acerca de Nosotros
    const acercaLink = document.querySelector('a[href="#acerca"]');
    const acercaSection = document.getElementById('acerca-section');
    const acercaCloseBtn = document.querySelector('.acerca-close');

    // Filtros y tarjetas de juegos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const juegoCards = document.querySelectorAll('.juego-card');

    // Menús desplegables
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const menuItemDropdowns = document.querySelectorAll('.menu-item-dropdown');
    const plataformaLinks = document.querySelectorAll('.menu-item-dropdown:nth-child(3) .submenu-link');

    // --- Sidebar ---
    if (sidebarToggle && container) {
        sidebarToggle.addEventListener('click', () => {
            container.classList.toggle('sidebar-collapsed');
            // Móvil: mostrar overlay y bloquear scroll
            if (window.innerWidth <= 900) {
                const isOpen = container.classList.contains('sidebar-collapsed');
                if (sidebarOverlay) sidebarOverlay.classList.toggle('active', isOpen);
                document.body.style.overflow = isOpen ? 'hidden' : '';
            }
        });
    }
    // Cerrar sidebar tocando el overlay en móvil
    if (sidebarOverlay && container) {
        sidebarOverlay.addEventListener('click', () => {
            container.classList.remove('sidebar-collapsed');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    // Cerrar sidebar al seleccionar un enlace del menú en móvil
    document.querySelectorAll('.sidebar .menu-link, .sidebar .submenu-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                container.classList.remove('sidebar-collapsed');
                if (sidebarOverlay) sidebarOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Acerca de Nosotros ---
    if (acercaLink && acercaSection) {
        acercaLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.style.overflow = 'hidden';
            acercaSection.classList.add('active');
        });
    }
    if (acercaCloseBtn && acercaSection) {
        acercaCloseBtn.addEventListener('click', function() {
            acercaSection.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && acercaSection && acercaSection.classList.contains('active')) {
            acercaSection.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // --- Anuncios ---
    function checkAllAdsHidden() {
        const visibleAds = Array.from(ads).some(ad => !ad.classList.contains('hidden'));
        if (adsContainer) adsContainer.classList.toggle('hidden', !visibleAds);
    }
    function hideAllAds() {
        ads.forEach(ad => ad.classList.add('hidden'));
        checkAllAdsHidden();
    }
    function showAllAds() {
        ads.forEach(ad => ad.classList.remove('hidden'));
        if (adsContainer) adsContainer.classList.remove('hidden');
    }
    ads.forEach(ad => {
        const closeBtn = ad.querySelector('.ad-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                ad.classList.add('hidden');
                checkAllAdsHidden();
                setTimeout(() => {
                    ad.classList.remove('hidden');
                    if (adsContainer && adsContainer.classList.contains('hidden')) {
                        adsContainer.classList.remove('hidden');
                    }
                }, 30000);
            });
        }
    });
    if (adsContainer) {
        const closeAllAdsBtn = document.createElement('button');
        closeAllAdsBtn.className = 'ad-close close-all-ads';
        closeAllAdsBtn.innerHTML = '<i class="fas fa-times"></i>';
        adsContainer.insertBefore(closeAllAdsBtn, adsContainer.firstChild);
        closeAllAdsBtn.addEventListener('click', () => {
            hideAllAds();
            setTimeout(showAllAds, 3000000);
        });
    }
    checkAllAdsHidden();

    // --- Filtros de juegos ---
    function filtrarJuegos(categoria) {
        juegoCards.forEach(card => {
            const cardCategoria = card.dataset.categoria;
            if (categoria === 'todos' || cardCategoria === categoria) {
                card.classList.remove('hidden');
                card.style.display = '';
                card.style.opacity = '1';
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                setTimeout(() => { card.style.display = 'none'; }, 300);
            }
        });
    }
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtrarJuegos(this.dataset.categoria);
        });
    });

    // --- Menús desplegables ---
    dropdownToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            menuItemDropdowns.forEach((dropdown, i) => {
                if (i !== index) dropdown.classList.remove('active');
            });
            menuItemDropdowns[index].classList.toggle('active');
        });
    });
    document.addEventListener('click', function(e) {
        if (![...menuItemDropdowns].some(dropdown => dropdown.contains(e.target))) {
            menuItemDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // --- Filtrado por plataforma desde menú lateral ---
    function filtrarJuegosPorPlataforma(plataforma) {
        // ...aquí iría la lógica de plataformasJuegos si existiera...
        // Este bloque se mantiene para compatibilidad, pero no se implementa porque no hay plataformasJuegos en el código actual.
    }
    plataformaLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // ...aquí iría la llamada a filtrarJuegosPorPlataforma...
        });
    });

    // --- Mostrar detalles del juego ---
    document.querySelectorAll('.juego-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const juegoId = this.closest('.juego-card').dataset.juegoId;
            const juego = obtenerDatosJuego(juegoId);
            mostrarDetallesJuego(juego);
        });
    });

    // --- Reset filtros con ESC ---
    const btnTodos = document.querySelector('.filtro-btn[data-categoria="todos"]');
    if (btnTodos) {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') btnTodos.click();
        });
    }

    // --- Cerrar detalles del juego ---
    const detallesSection = document.getElementById('juego-detalles');
    if (detallesSection) {
        detallesSection.querySelector('.detalles-close').addEventListener('click', () => {
            detallesSection.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        detallesSection.addEventListener('click', (e) => {
            if (e.target === detallesSection) {
                detallesSection.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// --- Mostrar detalles del juego ---
function mostrarDetallesJuego(juego) {
    const detallesSection = document.getElementById('juego-detalles');
    const detallesContainer = detallesSection.querySelector('.detalles-container');
    // Imagen
    const imagen = detallesContainer.querySelector('#detalles-imagen');
    imagen.src = juego.imagen;
    imagen.alt = juego.titulo;
    // Título y categoría
    detallesContainer.querySelector('.detalles-info h2').textContent = juego.titulo;
    detallesContainer.querySelector('.detalles-categoria').textContent = juego.categoria;
    // Plataformas
    const plataformasContainer = detallesContainer.querySelector('.detalles-plataformas');
    plataformasContainer.innerHTML = '';
    juego.plataformas.forEach(plataforma => {
        const span = document.createElement('span');
        span.textContent = plataforma;
        span.className = 'plataforma';
        plataformasContainer.appendChild(span);
    });
    // Descripción
    detallesContainer.querySelector('.detalles-descripcion').textContent = juego.descripcion;
    // Características
    const caracteristicasList = detallesContainer.querySelector('.detalles-caracteristicas ul');
    caracteristicasList.innerHTML = '';
    juego.caracteristicas.forEach(caracteristica => {
        const li = document.createElement('li');
        li.textContent = caracteristica;
        caracteristicasList.appendChild(li);
    });
    // Enlaces
    const enlacesGrid = detallesContainer.querySelector('.enlaces-grid');
    enlacesGrid.innerHTML = '';
    if (juego.enlaces && juego.enlaces.length > 0) {
        detallesContainer.querySelector('.detalles-enlaces').style.display = 'block';
        juego.enlaces.forEach(enlace => {
            const link = document.createElement('a');
            link.href = enlace.url;
            link.target = '_blank';
            link.className = 'enlace-juego';
            const icono = document.createElement('i');
            icono.className = `fab fa-${enlace.icono}`;
            const texto = document.createElement('span');
            texto.textContent = enlace.texto;
            link.appendChild(icono);
            link.appendChild(texto);
            enlacesGrid.appendChild(link);
        });
    } else {
        detallesContainer.querySelector('.detalles-enlaces').style.display = 'none';
    }
    // Video
    const videoContainer = detallesContainer.querySelector('.detalles-video');
    videoContainer.innerHTML = '';
    const trailerEnlace = juego.enlaces.find(enlace =>
        enlace.texto.toLowerCase().includes('tráiler') ||
        enlace.texto.toLowerCase().includes('trailer') ||
        enlace.texto.toLowerCase().includes('video')
    );
    if (trailerEnlace || juego.videoUrl) {
        videoContainer.style.display = 'block';
        const iframe = document.createElement('iframe');
        let videoUrl = '';
        const url = trailerEnlace ? trailerEnlace.url : juego.videoUrl;
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (match) {
            videoUrl = `https://www.youtube.com/embed/${match[1]}`;
        }
        iframe.src = videoUrl;
        iframe.title = `Video de ${juego.titulo}`;
        iframe.frameborder = "0";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.referrerpolicy = "no-referrer-when-downgrade";
        iframe.allowFullscreen = true;
        videoContainer.appendChild(iframe);
    } else {
        videoContainer.style.display = 'none';
    }
    detallesSection.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// --- Obtener datos del juego ---
function obtenerDatosJuego(juegoId) {
    return datosJuegos[juegoId];
}

// ¡Aquí guardo todos los datos de los juegos! Es como mi biblioteca personal
const datosJuegos = {
    "baldurs-gate": {
        titulo: "Baldur's Gate 3",
        imagen: "images/baldurs-gate-3-review_z2q4.jpg",
        categoria: "RPG, Fantasía",
        plataformas: ["PC", "PlayStation 5", "Xbox Series X|S"],
        descripcion: "Sumérgete en un mundo de fantasía épica en Baldur's Gate 3, un RPG de la aclamada Larian Studios. Elige entre una amplia gama de razas y clases, forma un grupo de compañeros únicos y embárcate en una aventura moldeada por tus decisiones. Un parásito mental ha sido implantado en tu mente, otorgándote poderes misteriosos pero amenazando con transformarte. ¿Resistirás la oscuridad o la abrazarás?",
        caracteristicas: [
            "Un sistema de combate por turnos profundo y táctico basado en D&D 5e.",
            "Una historia épica con múltiples finales basados en tus decisiones.",
            "Gráficos impresionantes y un mundo detallado para explorar.",
            "Un elenco de personajes memorables con sus propias historias y motivaciones.",
            "Modo multijugador cooperativo para hasta 4 jugadores."
        ],
        enlaces: [
            { texto: "Steam", url: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/", icono: "steam" },
            { texto: "Sitio Web", url: "https://baldursgate3.game/", icono: "web" },
            { texto: "Tráiler", url: "https://youtu.be/1T22w0vWnYE", icono: "youtube" }
        ],
        videoUrl: "https://youtu.be/1T22w0vWnYE"
    },
    "zelda": {
        titulo: "The Legend of Zelda: Tears of the Kingdom",
        imagen: "images/zelda.png",
        categoria: "Aventura, Mundo Abierto",
        plataformas: ["Nintendo Switch"],
        descripcion: "La secuela de The Legend of Zelda: Breath of the Wild lleva a Link a una aventura épica a través de las vastas tierras de Hyrule y los cielos expansivos que se extienden sobre ellas. Una nueva amenaza se cierne sobre el reino, y Link deberá despertar nuevas habilidades y forjar su camino a través de un mundo lleno de misterios, desafíos y descubrimientos.",
        caracteristicas: [
            "Exploración sin límites de un mundo interconectado, tanto en tierra como en el cielo.",
            "Nuevas habilidades para Link que permiten la creación y manipulación de objetos.",
            "Una historia épica que continúa la leyenda de Zelda.",
            "Puzzles ingeniosos y desafiantes en santuarios y mazmorras.",
            "Un elenco de personajes memorables y un mundo lleno de vida."
        ],
        enlaces: [
            { texto: "Nintendo eShop", url: "https://www.nintendo.com/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/", icono: "nintendo" },
            { texto: "Sitio Web", url: "https://www.nintendo.com/store/products/the-legend-of-zelda-tears-of-the-kingdom-switch/", icono: "web" },
            { texto: "Tráiler", url: "https://youtu.be/sjxLF4IYnJc?si=t5YCxfmKmdcNoBBo", icono: "youtube" }
        ],
        videoUrl: "https://youtu.be/sjxLF4IYnJc?si=t5YCxfmKmdcNoBBo",
        infoDestacada: "Surca los Cielos y Desvela los Misterios de Hyrule:\nThe Legend of Zelda: Tears of the Kingdom te invita a una aventura sin precedentes, donde la exploración y la creatividad son tus mayores aliados. El destino de Hyrule pende de un hilo, y solo Link puede restaurar el equilibrio.\n¿Qué te espera?\n* Un Mundo sin Fronteras: Explora las tierras familiares de Hyrule y asciende a las islas flotantes en los cielos. Cada rincón está lleno de secretos, desafíos y maravillas por descubrir.\n* Poderes que Desafían la Imaginación: Utiliza las nuevas habilidades de Link para crear construcciones ingeniosas, manipular el entorno y resolver puzzles de formas nunca antes vistas. ¡Tu creatividad es el límite!\n* Una Leyenda en Evolución: Sumérgete en una historia épica que continúa el legado de la saga Zelda, con nuevos personajes, amenazas y revelaciones impactantes.\n* Desafíos que Ponen a Prueba tu Ingenio: Enfréntate a santuarios y mazmorras llenas de puzzles complejos que requerirán toda tu astucia y habilidades para superar.\n* Una Aventura Inolvidable: Con un mundo vasto para explorar, secretos ocultos y una jugabilidad innovadora, Tears of the Kingdom te ofrecerá horas de inmersión y descubrimiento."
    },
    "honkai-star-rail": {
        titulo: "Honkai: Star Rail",
        imagen: "images/honkai.jpg",
        categoria: "RPG, Gacha, Aventura",
        plataformas: ["PC", "PlayStation 5", "iOS", "Android"],
        descripcion: "Embárcate en una épica aventura espacial en Honkai: Star Rail, un RPG por turnos que combina una narrativa profunda con un sistema de combate estratégico. Únete a la tripulación del Astral Express mientras viajan por el universo, descubriendo misterios y enfrentándose a desafíos únicos en cada mundo que visitan.",
        caracteristicas: [
            "Sistema de combate por turnos estratégico y profundo",
            "Narrativa inmersiva con personajes memorables",
            "Gráficos de alta calidad con estilo anime",
            "Sistema de personajes coleccionables con mecánicas únicas",
            "Mundos diversos con diferentes mecánicas y desafíos"
        ],
        enlaces: [
            { texto: "Epic Games", url: "https://store.epicgames.com/es-MX/p/honkai-star-rail", icono: "epic" },
            { texto: "PlayStation 5", url: "https://store.playstation.com/es-mx/concept/10007579", icono: "playstation" },
            { texto: "App Store", url: "https://apps.apple.com/us/app/honkai-star-rail/id1630095511", icono: "apple" },
            { texto: "Google Play", url: "https://play.google.com/store/apps/details?id=com.HoYoverse.hkrpgoversea", icono: "android" },
            { texto: "Sitio Web", url: "https://hsr.hoyoverse.com/", icono: "web" },
            { texto: "Tráiler", url: "https://youtu.be/w8vPZrMFiZ4?si=VubOQnX9jzQL1b1x", icono: "youtube" }
        ],
        videoUrl: "https://youtu.be/w8vPZrMFiZ4?si=VubOQnX9jzQL1b1x"
    },
    "fc-24": {
        titulo: "EA SPORTS FC 25",
        imagen: "images/fc 25.jpg",
        categoria: "Deportes, Simulación de Fútbol",
        plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "Nintendo Switch"],
        descripcion: "Vive la emoción del fútbol mundial con EA SPORTS FC 25, la nueva era del juego de fútbol interactivo. Con ligas, equipos y jugadores auténticos, gráficos mejorados y una jugabilidad inmersiva, cada partido se siente como si estuvieras en el campo. Construye tu equipo de ensueño en Ultimate Team, lidera a tu club a la gloria en el Modo Carrera o salta al campo para partidos rápidos y emocionantes.",
        caracteristicas: [
            "Autenticidad incomparable con licencias de las ligas, clubes y jugadores más importantes del mundo.",
            "Gráficos de nueva generación que ofrecen un realismo visual sorprendente.",
            "Jugabilidad mejorada con nuevas mecánicas y animaciones fluidas.",
            "El popular modo Ultimate Team para construir y competir con tu equipo ideal.",
            "Modos de carrera inmersivos para jugador y entrenador."
        ],
        enlaces: [
            { texto: "EA App", url: "https://www.ea.com/es-mx/games/ea-sports-fc/fc-25/buy", icono: "ea" },
            { texto: "Steam", url: "https://store.steampowered.com/app/2767010/EA_SPORTS_FC_25/", icono: "steam" },
            { texto: "PlayStation 5", url: "https://store.playstation.com/es-mx/concept/10007579", icono: "playstation" },
            { texto: "PlayStation 4", url: "https://store.playstation.com/es-mx/product/UP0006-CUSA35485_00-EASPORTSFC25STD", icono: "playstation" },
            { texto: "Xbox Series X|S", url: "https://www.xbox.com/es-MX/games/store/ea-sports-fc-25-para-xbox-series-xs/9NNPSTWT06VM", icono: "xbox" },
            { texto: "Xbox One", url: "https://www.xbox.com/es-MX/games/store/ea-sports-fc-25-para-xbox-one/9N436FQM30HX", icono: "xbox" },
            { texto: "Nintendo Switch", url: "https://www.nintendo.com/es-mx/store/products/ea-sports-fc-25-nintendo-switch/", icono: "nintendo" },
            { texto: "Sitio Web", url: "https://www.ea.com/es-es/games/ea-sports-fc", icono: "web" },
            { texto: "Tráiler", url: "https://www.youtube.com/watch?v=hvoD7ehZPcM", icono: "youtube" }
        ],
        videoUrl: "https://www.youtube.com/embed/hvoD7ehZPcM"
    },
    "zenless": {
        titulo: "Zenless Zone Zero",
        imagen: "images/zenless.jfif",
        categoria: "Acción RPG, Urbano, Anime",
        plataformas: ["PC", "PlayStation 5", "iOS", "Android"],
        descripcion: "Adéntrate en el vibrante y peligroso mundo de Zenless Zone Zero, un nuevo Action RPG de HoYoverse ambientado en una metrópolis moderna post-apocalíptica. Conviértete en un 'Proxy' y guía a un grupo de singulares agentes a través de los 'Hollows', dimensiones peligrosas llenas de misterios y amenazas. Con un estilo visual anime distintivo y un sistema de combate dinámico, tu aventura en Nueva Eridu apenas comienza.",
        caracteristicas: [
            "Un estilo visual anime urbano moderno y atractivo.",
            "Un sistema de combate de acción en tiempo real fluido y estilizado.",
            "Un elenco de personajes carismáticos con habilidades únicas.",
            "Una historia intrigante ambientada en una ciudad al borde del colapso.",
            "Exploración de entornos urbanos y dimensiones paralelas ('Hollows')."
        ],
        enlaces: [
            { texto: "Epic Games", url: "https://store.epicgames.com/es-MX/p/zenless-zone-zero-c7c151", icono: "epic" },
            { texto: "PlayStation 5", url: "https://store.playstation.com/es-mx/concept/10009763", icono: "playstation" },
            { texto: "App Store", url: "https://apps.apple.com/mx/app/zenless-zone-zero/id1661568984", icono: "apple" },
            { texto: "Google Play", url: "https://play.google.com/store/apps/details?id=com.HoYoverse.Nap", icono: "android" },
            { texto: "Sitio Web", url: "https://zenless.hoyoverse.com/es-es/home", icono: "web" },
            { texto: "Tráiler", url: "https://youtu.be/pBM2xyco_Kg?si=SbqTADAW6GtmXaNf", icono: "youtube" }
        ],
        videoUrl: "https://youtu.be/pBM2xyco_Kg?si=SbqTADAW6GtmXaNf"
    },
    "marvel-rivals": {
        titulo: "Marvel Rivals",
        imagen: "images/marvel rivals.png",
        categoria: "Shooter Heroico, PvP, Multijugador",
        plataformas: ["PC", "PlayStation 5", "Xbox Series X|S"],
        descripcion: "Prepárate para la acción superpoderosa en Marvel Rivals, un shooter heroico PvP multijugador donde equipos de héroes y villanos de Marvel se enfrentan en batallas dinámicas y destructibles. Forma tu escuadrón, domina las habilidades únicas de cada personaje y desata combos devastadores en escenarios icónicos del Universo Marvel.",
        caracteristicas: [
            "Un roster diverso de héroes y villanos icónicos de Marvel.",
            "Combate en equipo dinámico y estratégico.",
            "Escenarios destructibles que cambian el curso de la batalla.",
            "Poderosas habilidades y combos únicos para cada personaje.",
            "Un universo Marvel reimaginado con giros inesperados."
        ],
        enlaces: [
            { texto: "Steam", url: "https://store.steampowered.com/app/2767030/Marvel_Rivals/", icono: "steam" },
            { texto: "PlayStation 5", url: "https://store.playstation.com/es-mx/concept/10010451", icono: "playstation" },
            { texto: "Xbox Series X|S", url: "https://www.xbox.com/es-MX/games/store/marvel-rivals/9N8PMW7QMD3D/0010/B3SPDXFMNW0C", icono: "xbox" },
            { texto: "Sitio Web", url: "https://www.marvelrivals.com/es", icono: "web" },
            { texto: "Tráiler", url: "https://youtu.be/-b0veB7q9P4?si=317YOdvylr_1pIUx", icono: "youtube" }
        ],
        videoUrl: "https://youtu.be/-b0veB7q9P4?si=317YOdvylr_1pIUx"
    },
    "gta-v": {
        titulo: "Grand Theft Auto V",
        imagen: "images/grand-theft-auto-v-gta-5-poster_1920x1080_xtrafondos.com.jpg",
        categoria: "Acción",
        plataformas: ["PC", "PS5", "PS4", "Xbox Series X", "Xbox One"],
        descripcion: "Adéntrate en el vasto y vibrante mundo de Los Santos y el condado de Blaine en Grand Theft Auto V. Experimenta las vidas entrelazadas de tres criminales muy diferentes: Michael, un ex ladrón de bancos buscando una vida tranquila; Franklin, un joven estafador callejero en busca de oportunidades; y Trevor, un maníaco impredecible impulsado por la adrenalina y la violencia. Sus ambiciones y circunstancias los llevarán a una serie de golpes audaces y peligrosos en una ciudad corrupta donde el dinero y el poder lo son todo.",
        caracteristicas: [
            "Un extenso y detallado mundo abierto para explorar libremente.",
            "Tres personajes jugables con historias interconectadas.",
            "Una trama principal cinematográfica llena de giros y humor negro.",
            "Innumerables misiones secundarias y actividades para realizar.",
            "Un modo multijugador online masivo y dinámico: Grand Theft Auto Online.",
            "Gran variedad de vehículos terrestres, aéreos y acuáticos.",
            "Un sistema de personalización de personajes y vehículos.",
            "Actualizaciones constantes de contenido para GTA Online."
        ],
        enlaces: [
            { texto: "Steam", url: "https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/", icono: "steam" },
            { texto: "Epic Games", url: "https://store.epicgames.com/es-MX/p/grand-theft-auto-v", icono: "epic" },
            { texto: "PlayStation 5", url: "https://store.playstation.com/es-mx/product/UP1004-PPSA01411_00-GTAVDIGITALPRE01", icono: "playstation" },
            { texto: "PlayStation 4", url: "https://store.playstation.com/es-mx/product/UP1004-CUSA00419_00-GTAVDIGITAL00001", icono: "playstation" },
            { texto: "Xbox Series X|S", url: "https://www.xbox.com/es-mx/games/store/grand-theft-auto-v/9N2469V4GV84", icono: "xbox" },
            { texto: "Xbox One", url: "https://www.xbox.com/es-mx/games/store/grand-theft-auto-v/BPJPR0S6G30W", icono: "xbox" },
            { texto: "Sitio Web", url: "https://www.rockstargames.com/V/", icono: "web" }
        ],
        videoUrl: "https://www.youtube.com/embed/QkkoHAzjnUs"
    },
    "fortnite": {
        titulo: "Fortnite",
        imagen: "images/fornite.jfif",
        categoria: "Battle Royale, Shooter, Construcción",
        plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "Nintendo Switch", "Android"],
        descripcion: "Salta del autobús de batalla y lucha por ser el último en pie en Fortnite, el fenómeno global que combina acción shooter con elementos de construcción. Explora una isla en constante evolución, recolecta recursos, construye estructuras defensivas y ofensivas, y enfréntate a otros jugadores en intensas batallas hasta que solo quede un ganador. Con eventos regulares, colaboraciones y modos de juego variados, la diversión nunca termina.",
        caracteristicas: [
            "Un modo Battle Royale masivo y gratuito para jugar.",
            "Un sistema de construcción único que añade profundidad estratégica.",
            "Eventos de temporada y colaboraciones con franquicias populares.",
            "Una gran variedad de armas, objetos y vehículos.",
            "Actualizaciones constantes con nuevo contenido y modos de juego."
        ],
        enlaces: [
            { texto: "Epic Games", url: "https://store.epicgames.com/es-MX/p/fortnite", icono: "epic" },
            { texto: "PlayStation", url: "https://store.playstation.com/en-us/concept/228748", icono: "playstation" },
            { texto: "Xbox", url: "https://www.xbox.com/es-MX/games/fortnite", icono: "xbox" },
            { texto: "Nintendo Switch", url: "https://www.epicgames.com/help/es-MX/c-Category_Fortnite/c-Fortnite_Gameplay/how-to-download-fortnite-on-nintendo-switch-a000086670", icono: "nintendo" },
            { texto: "Android", url: "https://www.fortnite.com/mobile/android?lang=es-MX", icono: "android" },
            { texto: "Sitio Web", url: "https://www.epicgames.com/fortnite/es-ES/home", icono: "web" },
            { texto: "Tráiler", url: "https://youtu.be/djREM-OCupc?si=HZhmT_urNud1Oh5Z", icono: "youtube" }
        ],
        videoUrl: "https://youtu.be/djREM-OCupc?si=HZhmT_urNud1Oh5Z"
    },
    "minecraft": {
        titulo: "Minecraft",
        imagen: "images/minecraft.jpg",
        categoria: "Sandbox, Aventura, Supervivencia, Creatividad",
        plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One", "Nintendo Switch", "iOS", "Android"],
        descripcion: "Desata tu creatividad y explora mundos infinitos en Minecraft, un juego sandbox que te permite construir cualquier cosa que puedas imaginar. Extrae recursos, fabrica herramientas, construye estructuras, lucha contra monstruos y sobrevive en entornos diversos. Juega solo o con amigos en un mundo donde los límites solo los pone tu imaginación.",
        caracteristicas: [
            "Un mundo generado proceduralmente que ofrece una exploración infinita.",
            "Libertad total para construir cualquier cosa que imagines con bloques.",
            "Un modo Supervivencia desafiante donde debes recolectar recursos y defenderte de criaturas.",
            "Un modo Creativo donde tienes recursos ilimitados para construir sin restricciones.",
            "Posibilidad de jugar en solitario o en modo multijugador con amigos.",
            "Una comunidad activa que crea mods, mapas y servidores personalizados."
        ],
        enlaces: [
            { texto: "Xbox Store", url: "https://www.xbox.com/es-MX/games/store/minecraft-java-bedrock-edition-for-pc/9NXP44L49SHJ/0010/B30PHZ89WC0C", icono: "xbox" },
            { texto: "Minecraft.net", url: "https://www.minecraft.net/es-es/get-minecraft", icono: "web" },
            { texto: "Amazon", url: "https://www.amazon.com.mx/Minecraft-Java-Bedrock-C%C3%B3digo-mail/dp/B0BNK6QY38", icono: "amazon" },
            { texto: "PlayStation 5", url: "https://store.playstation.com/es-mx/concept/212779", icono: "playstation" },
            { texto: "PlayStation 4", url: "https://store.playstation.com/es-mx/product/UP4433-CUSA00744_00-MINECRAFTPS40001", icono: "playstation" },
            { texto: "Xbox Series X|S", url: "https://www.xbox.com/es-MX/games/store/minecraft/9MVXMVT8ZKWC", icono: "xbox" },
            { texto: "Xbox One", url: "https://www.xbox.com/es-MX/games/store/minecraft/9MVXMVT8ZKWC", icono: "xbox" },
            { texto: "Nintendo eShop", url: "https://www.nintendo.com/es-mx/store/games/minecraft-games/", icono: "nintendo" },
            { texto: "Coppel", url: "https://www.coppel.com/l/minecraft-nintendo-switch", icono: "store" },
            { texto: "App Store", url: "https://apps.apple.com/mx/app/minecraft-explora-con-amigos/id479516143", icono: "apple" },
            { texto: "Google Play", url: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpe&hl=es_MX&gl=US", icono: "android" },
            { texto: "Sitio Web", url: "https://www.minecraft.net/es-es/", icono: "web" },
            { texto: "Tráiler", url: "https://www.youtube.com/watch?v=r6Ja2ZxWbRE", icono: "youtube" }
        ],
        videoUrl: "https://www.youtube.com/embed/r6Ja2ZxWbRE"
    },
    "cyberpunk": {
        titulo: "Cyberpunk 2077",
        imagen: "images/cyberpunk-2077.jpg",
        categoria: "RPG, Mundo Abierto, Ciencia Ficción",
        plataformas: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series X|S", "Xbox One"],
        descripcion: "Sumérgete en la metrópolis futurista de Night City en Cyberpunk 2077, un RPG de mundo abierto donde juegas como V, un mercenario en busca de un implante único que es la clave para la inmortalidad. Explora una ciudad vibrante y peligrosa, toma decisiones que impactan la historia y personaliza a tu personaje con implantes cibernéticos y habilidades únicas.",
        caracteristicas: [
            "Un vasto y detallado mundo abierto para explorar: Night City.",
            "Una historia profunda y ramificada con múltiples finales posibles.",
            "Amplia personalización del personaje, incluyendo implantes cibernéticos.",
            "Un sistema de combate dinámico con diversas armas y habilidades.",
            "Un elenco de personajes memorables e intrigantes."
        ],
        enlaces: [
            { texto: "Steam", url: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/", icono: "steam" },
            { texto: "GOG.com", url: "https://www.gog.com/game/cyberpunk_2077", icono: "gog" },
            { texto: "Epic Games", url: "https://store.epicgames.com/es-MX/p/cyberpunk-2077", icono: "epic" },
            { texto: "PlayStation 5", url: "https://store.playstation.com/es-mx/product/UP4497-PPSA04029_00-0000000000000N22", icono: "playstation" },
            { texto: "PlayStation 4", url: "https://store.playstation.com/es-mx/product/UP4497-PPSA03974_00-0000000000000CP1", icono: "playstation" },
            { texto: "Xbox Series X|S", url: "https://www.xbox.com/es-MX/games/store/cyberpunk-2077-edicion-definitiva-xbox-series-xs/9P9G5WX8C0VH", icono: "xbox" },
            { texto: "Xbox One", url: "https://www.xbox.com/es-MX/games/store/cyberpunk-2077/BX3M8L83BBRW", icono: "xbox" },
            { texto: "Sitio Web", url: "https://www.cyberpunk.net/es/", icono: "web" },
            { texto: "Tráiler", url: "https://www.youtube.com/watch?v=VhM3NRu23Sk", icono: "youtube" }
        ],
        videoUrl: "https://www.youtube.com/embed/VhM3NRu23Sk"
    },
};
