// ==========================================
// CATÁLOGO OFICIAL DE LAS 9 NORMAS ACREDITADAS EN BSN
// ==========================================
const NOMS_DATA = [
  {
    code: 'NOM-004-SE-2021',
    category: 'Textil y Calzado',
    description: 'Información comercial-etiquetado de productos textiles, prendas de vestir, sus accesorios y ropa de casa.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-015-SCFI-2007',
    category: 'Salud y General',
    description: 'Información comercial-etiquetado de juegos y juguetes.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-020-SCFI-1997',
    category: 'Textil y Calzado',
    description: 'Información comercial-etiquetado de cueros y pieles curtidas naturales, materiales sintéticos o artificiales con esa apariencia, calzado, marroquinería, así como los productos elaborados con dichos materiales.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-024-SCFI-2013',
    category: 'Electrónica y Hogar',
    description: 'Información comercial para empaques, instructivos y garantías de los productos electrónicos, eléctricos y electrodomésticos.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-050-SCFI-2004',
    category: 'Salud y General',
    description: 'Información comercial-etiquetado general de productos.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-051-SCFI/SSAI-2010',
    category: 'Alimentos y Bebidas',
    description: 'Especificaciones generales de etiquetado para alimentos y bebidas no alcohólicas preenvasados-Información comercial y sanitaria.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-141-SSA1/SCFI-2012',
    category: 'Salud y General',
    description: 'Etiquetado para productos cosméticos preenvasados. Etiquetado sanitario y comercial.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-142-SSA1/SCFI-2014',
    category: 'Alimentos y Bebidas',
    description: 'Bebidas alcohólicas. Especificaciones sanitarias. Etiquetado sanitario y comercial.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=700&q=80'
  },
  {
    code: 'NOM-189-SSA1/SCFI-2018',
    category: 'Electrónica y Hogar',
    description: 'Productos y servicios. Etiquetado y envasado para productos de aseo de uso doméstico.',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=700&q=80'
  }
];

let activeCategory = 'all';
let currentSlide = 0;
let slideInterval = null;

// Número de WhatsApp (formato internacional México: 52 + 10 dígitos)
const WHATSAPP_NUMBER = '525552116754';

// ==========================================
// NAVEGACIÓN ENTRE SUBPÁGINAS
// ==========================================
function navigateTo(pageId) {
  document.querySelectorAll('.page-view').forEach(section => {
    section.classList.add('hidden');
  });

  const target = document.getElementById(`view-${pageId}`);
  if (target) {
    target.classList.remove('hidden');
  }

  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.getAttribute('data-nav') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
}

// ==========================================
// CARRUSEL DEL HERO (3 IMÁGENES)
// ==========================================
function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    if (idx === currentSlide) {
      slide.classList.remove('opacity-0', 'z-0', 'pointer-events-none');
      slide.classList.add('opacity-100', 'z-10');
    } else {
      slide.classList.remove('opacity-100', 'z-10');
      slide.classList.add('opacity-0', 'z-0', 'pointer-events-none');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentSlide) {
      dot.className = 'carousel-dot w-8 h-2.5 rounded-full bg-sky-400 transition-all';
    } else {
      dot.className = 'carousel-dot w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/70 transition-all';
    }
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
  resetCarouselTimer();
}

function prevSlide() {
  showSlide(currentSlide - 1);
  resetCarouselTimer();
}

function goToSlide(index) {
  showSlide(index);
  resetCarouselTimer();
}

function resetCarouselTimer() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 6500);
}

// ==========================================
// RENDERIZADO DEL CATÁLOGO DE NORMAS
// ==========================================
function renderHomeNormsPreview() {
  const container = document.getElementById('home-norms-preview');
  if (!container) return;

  container.innerHTML = NOMS_DATA.map(nom => `
    <div class="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-sky-400/60 transition-all flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30">
            ${nom.code}
          </span>
          <span class="text-[11px] text-slate-400">${nom.category}</span>
        </div>
        <p class="text-xs text-slate-200 leading-relaxed mt-2">${nom.description}</p>
      </div>
      <button onclick="solicitarServicio('${nom.code}')" class="mt-4 text-left text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1">
        <span>Solicitar evaluación de esta NOM</span>
        <span>→</span>
      </button>
    </div>
  `).join('');
}

function renderNormsCatalog() {
  const grid = document.getElementById('norms-grid');
  const searchInput = document.getElementById('norm-search-input');
  if (!grid) return;

  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

  const filtered = NOMS_DATA.filter(nom => {
    const matchesCategory = activeCategory === 'all' || nom.category === activeCategory;
    const matchesSearch =
      nom.code.toLowerCase().includes(query) ||
      nom.description.toLowerCase().includes(query) ||
      nom.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-white rounded-2xl p-10 text-center border border-slate-200">
        <p class="text-sm font-bold text-slate-800">No se encontraron normas que coincidan con tu búsqueda.</p>
        <button onclick="resetNormFilters()" class="mt-3 px-4 py-2 rounded-xl bg-bsn-primary text-white text-xs font-bold">
          Mostrar las 9 Normas
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(nom => `
    <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group">
      <div class="h-44 overflow-hidden relative">
        <img src="${nom.image}" alt="${nom.code}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>
        <span class="absolute bottom-3 left-3 font-mono text-xs font-bold px-3 py-1 rounded-lg bg-bsn-navy/95 text-sky-300 border border-sky-400/30">
          ${nom.code}
        </span>
      </div>
      <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span class="text-[11px] font-bold uppercase tracking-wider text-sky-600">${nom.category}</span>
          <p class="text-sm text-slate-700 mt-2 leading-relaxed">${nom.description}</p>
        </div>
        <button onclick="solicitarServicio('${nom.code}')" class="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-bsn-primary hover:text-white text-slate-800 font-bold text-xs transition-all">
          Cotizar Dictamen / Constancia
        </button>
      </div>
    </article>
  `).join('');
}

function setNormCategory(category) {
  activeCategory = category;
  document.querySelectorAll('.norm-cat-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderNormsCatalog();
}

function filterNorms() {
  renderNormsCatalog();
}

function resetNormFilters() {
  const input = document.getElementById('norm-search-input');
  if (input) input.value = '';
  setNormCategory('all');
}

// ==========================================
// SOLICITUD PRE-LLENADA Y WHATSAPP
// ==========================================
function solicitarServicio(asunto) {
  navigateTo('contacto');
  const select = document.getElementById('form-asunto');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.includes(asunto)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

function handleContactSubmit(event) {
  event.preventDefault();
  const nombre = document.getElementById('form-nombre').value;
  const empresa = document.getElementById('form-empresa').value;
  const telefono = document.getElementById('form-telefono').value;
  const asunto = document.getElementById('form-asunto').value;
  const mensaje = document.getElementById('form-mensaje').value;

  const texto = `Hola BSN, solicito información:%0A*Nombre:* ${encodeURIComponent(nombre)}%0A*Empresa:* ${encodeURIComponent(empresa || 'N/A')}%0A*Teléfono:* ${encodeURIComponent(telefono)}%0A*Interés:* ${encodeURIComponent(asunto)}%0A*Mensaje:* ${encodeURIComponent(mensaje)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank');
}

function toggleWaPopup() {
  const popup = document.getElementById('wa-popup');
  popup.classList.toggle('hidden');
}

function sendWhatsApp() {
  const input = document.getElementById('wa-quick-msg');
  const msg = input && input.value.trim()
    ? input.value.trim()
    : 'Hola BSN, me gustaría solicitar información sobre sus servicios de evaluación y dictámenes NOM.';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ==========================================
// MODAL SISTEMA EN LÍNEA Y COOKIES
// ==========================================
function openSistemaModal() {
  document.getElementById('sistema-modal').classList.remove('hidden');
}

function closeSistemaModal() {
  document.getElementById('sistema-modal').classList.add('hidden');
}

function acceptCookies() {
  localStorage.setItem('bsn_cookies_accepted', 'true');
  document.getElementById('cookie-banner').classList.add('hidden');
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  navigateTo('inicio');
  renderHomeNormsPreview();
  renderNormsCatalog();
  resetCarouselTimer();

  if (!localStorage.getItem('bsn_cookies_accepted')) {
    document.getElementById('cookie-banner').classList.remove('hidden');
  }
});
