document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
    
    // Animar las barras del menú hamburguesa
    const bars = document.querySelectorAll('.hamburger span');
    bars[0].classList.toggle('rotate-45');
    bars[1].classList.toggle('opacity-0');
    bars[2].classList.toggle('rotate-negative-45');
});
document.addEventListener('DOMContentLoaded', function() {
    const mainVideo = document.querySelector('main video');
    
    // Click en los enlaces del nav
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            mainVideo.classList.add('ocultar');
        });
    });

    // Click en cualquier parte de la pantalla
    document.addEventListener('click', function(e) {
        mainVideo.classList.add('ocultar');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');
    const arrow = document.querySelector('.expand-arrow');

    arrow.addEventListener('click', function() {
        footer.classList.toggle('expanded');
        arrow.classList.toggle('rotated');
    });
});

// Objeto con las traducciones
const translations = {
    es: {
        inicio: "Inicio",
        quienesSomos: "Quienes Somos",
        servicios: "Servicios",
        contacto: "Contacto",
        playlist: "PlayList",
        opiniones: "Opiniones",
        buscar: "Buscar"
    },
    en: {
        inicio: "Home",
        quienesSomos: "About Us",
        servicios: "Services",
        contacto: "Contact",
        playlist: "PlayList",
        opiniones: "Reviews",
        buscar: "Search"
    },
    pt: {
        inicio: "Início",
        quienesSomos: "Quem Somos",
        servicios: "Serviços",
        contacto: "Contato",
        playlist: "PlayList",
        opiniones: "Avaliações",
        buscar: "Procurar"
    },
    fr: {
        inicio: "Accueil",
        quienesSomos: "Qui Sommes-nous",
        servicios: "Services",
        contacto: "Contact",
        playlist: "PlayList",
        opiniones: "Avis",
        buscar: "Rechercher"
    },
    it: {
        inicio: "Home",
        quienesSomos: "Chi Siamo",
        servicios: "Servizi",
        contacto: "Contatto",
        playlist: "PlayList",
        opiniones: "Recensioni",
        buscar: "Cerca"
    }
};

// Función para traducir la página
function translatePage(language) {
    // Guardamos el idioma seleccionado en localStorage
    localStorage.setItem('selectedLanguage', language);
    
    // Obtenemos las traducciones para el idioma seleccionado
    const texts = translations[language];
    
    // Traducimos cada elemento con atributo data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (texts[key]) {
            element.textContent = texts[key];
        }
    });
}

// Event listener para el selector de idiomas
document.getElementById('lenguajes').addEventListener('change', function() {
    translatePage(this.value);
});

// Cargar el idioma guardado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'es';
    document.getElementById('lenguajes').value = savedLanguage;
    translatePage(savedLanguage);
});

document.addEventListener('DOMContentLoaded', function() {
    const videoInicio = document.getElementById('video-inicio');
    const backgroundMusic = document.getElementById('background-music');
    const videoContainer = document.getElementById('video-container');
    const headerColor = getComputedStyle(document.querySelector('header')).backgroundColor;

    // Forzar la reproducción del video inmediatamente
    function startVideo() {
        videoInicio.muted = true; // Asegurar que esté muteado para autoplay
        videoInicio.playbackRate = 0.6;
        
        const playPromise = videoInicio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log("Video reproduciendo correctamente");
                // Intentar reproducir el audio una vez que el video esté reproduciendo
                playAudioWithVideo();
            }).catch(error => {
                console.error("Error reproduciendo video:", error);
                // Reintentar la reproducción
                setTimeout(startVideo, 100);
            });
        }
    }

    // Función para reproducir audio
    function playAudioWithVideo() {
        console.log("Intentando reproducir audio...");
        const audioPromise = backgroundMusic.play();
        
        if (audioPromise !== undefined) {
            audioPromise
                .then(() => {
                    console.log("Audio reproduciendo exitosamente");
                })
                .catch(error => {
                    console.log("Error al reproducir audio:", error);
                });
        }
    }

    // Asegurarse de que el video esté cargado
    videoInicio.addEventListener('loadedmetadata', () => {
        console.log("Video metadata cargada");
        startVideo();
    });

    // Backup: si loadedmetadata no se dispara
    if (videoInicio.readyState >= 2) {
        console.log("Video ya está listo");
        startVideo();
    }

    // Detener audio con cualquier tecla
    document.addEventListener('keydown', function() {
        if (!backgroundMusic.paused) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }, { once: true });

    // Resto del código para la transición...
    document.documentElement.style.setProperty('--header-color', headerColor);

    const backgroundTransition = document.createElement('div');
    backgroundTransition.className = 'background-transition';
    videoContainer.appendChild(backgroundTransition);

    videoInicio.addEventListener('ended', function() {
        videoInicio.classList.add('circle-out');
        backgroundTransition.classList.add('expand-background');
        
        setTimeout(() => {
            videoInicio.style.display = 'none';
            videoContainer.style.backgroundColor = headerColor;
        }, 3000);
    });
}); 