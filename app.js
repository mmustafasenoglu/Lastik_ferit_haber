// ===============================================
// NEWS DATA
// ===============================================

// Load custom news from localStorage
function getCustomNews() {
    const stored = localStorage.getItem('customNews');
    return stored ? JSON.parse(stored) : [];
}

// Default news data
const defaultNewsData = [
    {
        id: 1,
        title: "Zelensky: 'Top Şimdi Putin'in Sahasında'",
        category: "dünya",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
        summary: "Ukrayna lideri, barış müzakereleri için şartların oluştuğunu ve inisiyatifin Rusya'da olduğunu belirtti.",
        content: "Ukrayna Devlet Başkanı Volodymyr Zelensky, son açıklamasında barış görüşmeleriyle ilgili dikkat çekici ifadeler kullandı. Zelensky, 'Artık top Putin'in sahasında. Barış için gerekli adımları atmak Rusya'nın elinde' dedi. Uluslararası toplumun desteğiyle Ukrayna'nın müzakere masasına güçlü bir pozisyonda oturduğunu vurgulayan Zelensky, kalıcı barış için toprak bütünlüğünün sağlanması gerektiğini belirtti. Batılı müttefikler de Ukrayna'nın bu tavrını desteklediklerini açıkladı.",
        author: "Ferit Şenoğlu",
        date: "24 Aralık 2025",
        readTime: "3 dk"
    },
    {
        id: 2,
        title: "Yapay Zeka ve Medya Etiği: Yeni Dönem Başlıyor",
        category: "teknoloji",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        summary: "Haber odalarında otomasyon dönemi başlarken etik tartışmalar da alevleniyor.",
        content: "Yapay zeka teknolojileri gazetecilik dünyasında köklü değişikliklere yol açıyor. Büyük medya kuruluşları artık haber üretiminde AI araçlarını aktif olarak kullanırken, bu durum etik ve telif hakkı tartışmalarını da beraberinde getiriyor. Uzmanlar, yapay zekanın gazetecilerin işini kolaylaştırabileceğini ancak insan denetimine mutlaka ihtiyaç olduğunu vurguluyor. Reuters ve Associated Press gibi büyük ajanslar, AI destekli haber doğrulama sistemleri geliştirirken, küçük medya kuruluşları da bu teknolojiye erişim konusunda endişelerini dile getiriyor. Gelecekte gazetecilik mesleğinin şeklinin nasıl değişeceği merak konusu.",
        author: "Ferit Şenoğlu",
        date: "24 Aralık 2025",
        readTime: "5 dk"
    },
    {
        id: 3,
        title: "Sokak Sanatının Ekonomi Politiği",
        category: "kültür",
        image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80",
        summary: "Şehir sanatçıları ve kentsel dönüşüm arasındaki karmaşık ilişki inceleniyor.",
        content: "İstanbul'un çeşitli semtlerinde yaptığımız araştırma, sokak sanatının sadece estetik değil, aynı zamanda ekonomik ve politik bir olgu olduğunu ortaya koyuyor. Kadıköy, Beyoğlu ve Beşiktaş'ta röportaj yaptığımız sanatçılar, eserlerinin kentsel dönüşüm projelerine nasıl araç edildiğini anlatıyor. Bir yandan özgür ifade aracı olarak görülen sokak sanatı, diğer yandan bölgelerin soylulaştırılması sürecinde kullanılıyor. Sanatçılar, eserlerinin ticari amaçlarla kullanılmasına karşı çıkarken, belediyeler ve özel sektör bu sanatı pazarlama aracı olarak görüyor. Bu durum, sanatın özgünlüğü ve ticarileşmesi arasındaki gerilimi gözler önüne seriyor.",
        author: "Ferit Şenoğlu",
        date: "23 Aralık 2025",
        readTime: "6 dk"
    },
    {
        id: 4,
        title: "Küresel Piyasalarda Yeni Yıl Rallisi Başladı",
        category: "ekonomi",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        summary: "Yatırımcılar yeni yıla umutla giriyor, borsalar rekor seviyelerde.",
        content: "Dünya borsaları yılın son haftasında güçlü bir performans sergiliyor. Wall Street'te S&P 500 endeksi yeni rekorlara imza atarken, Avrupa ve Asya piyasaları da yükseliş trendini sürdürüyor. Ekonomistler, merkez bankalarının faiz politikalarındaki yumuşama beklentilerinin piyasaları desteklediğini belirtiyor. Türkiye'de ise BIST 100 endeksi yabancı yatırımcı ilgisiyle birlikte güçlü bir performans gösteriyor. Altın fiyatları istikrarlı seyrederken, petrol fiyatlarında hafif düşüş gözlemleniyor. Analistler, 2026 yılının küresel ekonomi için iyimser bir tablo çizeceğini öngörüyor.",
        author: "Ferit Şenoğlu",
        date: "24 Aralık 2025",
        readTime: "4 dk"
    },
    {
        id: 5,
        title: "Galatasaray Şampiyonlar Ligi'nde Fark Attı",
        category: "spor",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
        summary: "Sarı-kırmızılılar, Avrupa devine karşı 3-0'lık skorla büyük galibiyet aldı.",
        content: "Galatasaray, Şampiyonlar Ligi grup maçında İspanya temsilcisine karşı muhteşem bir performans sergiledi. Mauro Icardi'nin çift golü ve Kerem Aktürkoğlu'nun muhteşem sol ayak vuruşuyla 3-0 kazanan sarı-kırmızılılar, gruptan çıkma şansını artırdı. Teknik direktör Okan Buruk, maç sonrası yaptığı açıklamada takımının performansından son derece memnun olduğunu belirtti. Türk futbol taraftarları, bu galibiyeti sosyal medyada coşkuyla kutladı. Galatasaray'ın bir sonraki rakibi Bundesliga ekibi olacak ve bu maç da kritik önem taşıyor.",
        author: "Ferit Şenoğlu",
        date: "23 Aralık 2025",
        readTime: "3 dk"
    },
    {
        id: 6,
        title: "İklim Değişikliği: Paris Anlaşması Hedefleri Risk Altında",
        category: "dünya",
        image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?auto=format&fit=crop&w=800&q=80",
        summary: "BM raporu, küresel ısınmanın 1.5 derece sınırını aşma riskinin arttığını gösteriyor.",
        content: "Birleşmiş Milletler İklim Değişikliği Çerçeve Sözleşmesi'nin yeni raporu, Paris Anlaşması hedeflerine ulaşmanın giderek zorlaştığını ortaya koyuyor. Raporda, mevcut politikalarla küresel ısınmanın 2100 yılına kadar 2.7 derece artabileceği uyarısı yapılıyor. Bilim insanları, acil eylem planlarının hayata geçirilmesi gerektiğini vurguluyor. Yenilenebilir enerji yatırımlarının artması olumlu bir gelişme olsa da, fosil yakıt kullanımının hala yüksek seviyelerde olması endişe yaratıyor. Gelişmiş ülkelerin iklim finansmanı konusundaki taahhütlerini yerine getirmemesi de eleştiriliyor.",
        author: "Ferit Şenoğlu",
        date: "23 Aralık 2025",
        readTime: "5 dk"
    },
    {
        id: 7,
        title: "Kuantum Bilgisayarlar: IBM'den Çığır Açan Gelişme",
        category: "teknoloji",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
        summary: "IBM, 1000 qubit'lik kuantum işlemcisini tanıttı, teknoloji dünyası heyecanlı.",
        content: "IBM, kuantum bilgisayar teknolojisinde önemli bir kilometre taşına imza attı. Şirketin yeni kuantum işlemcisi Condor, 1000'den fazla qubit ile çalışabiliyor ve bu, klasik bilgisayarların çözemeyeceği problemleri çözme potansiyeline sahip. Uzmanlar, bu gelişmenin ilaç araştırmalarından kriptografiye, yapay zekadan finansal modellemelere kadar birçok alanda devrim yaratacağını söylüyor. Google ve Microsoft gibi teknoloji devleri de kendi kuantum bilgisayar projelerini hızlandırıyor. Ancak ticari kullanıma hazır sistemlerin piyasaya çıkması için birkaç yıl daha gerekebileceği belirtiliyor.",
        author: "Ferit Şenoğlu",
        date: "22 Aralık 2025",
        readTime: "4 dk"
    },
    {
        id: 8,
        title: "Netflix'in Yeni Türk Dizisi Dünya Çapında İlgi Gördü",
        category: "kültür",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80",
        summary: "Türk yapımı dizi, 90 ülkede ilk 10'a girmeyi başardı.",
        content: "Netflix'te yayınlanan Türk yapımı 'Gece Yarısı' dizisi, dünya genelinde büyük ilgi görüyor. 90 ülkede en çok izlenen içerikler listesinde ilk 10'a giren dizi, Türk dizilerinin küresel başarısını bir kez daha kanıtladı. Dizi, İstanbul'un karanlık sokaklarında geçen gerilim dolu hikayesiyle izleyicileri ekrana kilitliyor. Yönetmen ve oyuncular, sosyal medyada paylaştıkları mesajlarla dünya genelinden gelen olumlu tepkilere teşekkür etti. Türkiye'nin sinema ve dizi sektörü, son yıllarda uluslararası platformlarda giderek daha fazla görünürlük kazanıyor.",
        author: "Ferit Şenoğlu",
        date: "22 Aralık 2025",
        readTime: "3 dk"
    },
    {
        id: 9,
        title: "Merkez Bankası Faiz Kararını Açıkladı",
        category: "ekonomi",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        summary: "TCMB, politika faizini sabit tutma kararı aldı, piyasalar beklentilere paralel tepki verdi.",
        content: "Türkiye Cumhuriyet Merkez Bankası, Para Politikası Kurulu toplantısında faiz oranlarını değiştirmeme kararı aldı. Analistlerin çoğunluğu bu kararı öngörmüştü ve piyasalar beklentiler doğrultusunda tepki verdi. Merkez Bankası açıklamasında, enflasyonla mücadelenin kararlılıkla sürdürüleceğini ve fiyat istikrarı hedefine ulaşılana kadar sıkı duruşun korunacağını belirtti. Ekonomistler, önümüzdeki aylarda enflasyon verilerine bağlı olarak faiz politikasında değişiklik olabileceğini söylüyor. Dolar/TL kuru açıklama sonrası sınırlı dalgalanma gösterdi.",
        author: "Ferit Şenoğlu",
        date: "21 Aralık 2025",
        readTime: "4 dk"
    },
    {
        id: 10,
        title: "Fenerbahçe, Transfer Döneminde Bombaları Patlatıyor",
        category: "spor",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
        summary: "Sarı-lacivertliler, iki dünya yıldızıyla anlaşmaya vardı, taraftarlar heyecanlı.",
        content: "Fenerbahçe, kış transfer döneminde büyük hamlelere imza atıyor. Kulübün, Avrupa'nın önde gelen takımlarından iki yıldız futbolcuyla anlaşmaya vardığı iddia ediliyor. Teknik direktör Jose Mourinho'nun istekleri doğrultusunda şekillenen transfer stratejisi, takımın şampiyonluk yarışındaki gücünü artırmayı hedefliyor. Taraftarlar, sosyal medyada gelişmeleri yakından takip ederken, resmi açıklamaların önümüzdeki günlerde yapılması bekleniyor. Transfer bütçesi konusunda da yönetimden olumlu sinyaller geliyor.",
        author: "Ferit Şenoğlu",
        date: "21 Aralık 2025",
        readTime: "3 dk"
    },
    {
        id: 11,
        title: "NASA, Mars'ta Su İzlerine Rastladı",
        category: "dünya",
        image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80",
        summary: "Perseverance rover'ın gönderdiği veriler, Mars'ta yüzey altı su varlığına işaret ediyor.",
        content: "NASA'nın Mars'taki Perseverance rover'ı, kızıl gezegende su varlığına dair önemli kanıtlar buldu. Rover'ın radar sistemleri, yüzey altında önemli miktarda buz depolarının olabileceğini gösteriyor. Bilim insanları, bu keşfin Mars'ta yaşam izlerine ulaşma olasılığını artırdığını belirtiyor. Ayrıca, gelecekte Mars'a yapılacak insanlı görevler için bu su kaynakları kritik önem taşıyor. NASA, önümüzdeki aylarda bölgeden daha detaylı numuneler alarak analizleri sürdürecek. Bu keşif, uzay araştırmalarında yeni bir döneme işaret ediyor.",
        author: "Ferit Şenoğlu",
        date: "20 Aralık 2025",
        readTime: "5 dk"
    },
    {
        id: 12,
        title: "ChatGPT-5 Tanıtıldı: Yapay Zeka Yeniden Tanımlanıyor",
        category: "teknoloji",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        summary: "OpenAI'nin yeni modeli, insansı akıl yürütme yetenekleriyle dikkat çekiyor.",
        content: "OpenAI, merakla beklenen ChatGPT-5 modelini resmi olarak tanıttı. Yeni model, önceki versiyonlara göre çok daha gelişmiş akıl yürütme yetenekleri ve çok modlu anlayış sunuyor. Şirket CEO'su Sam Altman, ChatGPT-5'in karmaşık matematiksel problemleri çözebileceğini, kodlama yapabileceğini ve hatta yaratıcı içerik üretiminde insan seviyesine yaklaştığını söylüyor. Ancak yapay zeka güvenliği konusundaki endişeler de artıyor. Uzmanlar, bu kadar güçlü bir AI sisteminin etik kullanımı için sıkı düzenlemelere ihtiyaç olduğunu vurguluyor.",
        author: "Ferit Şenoğlu",
        date: "20 Aralık 2025",
        readTime: "4 dk"
    },
    {
        id: 13,
        title: "İstanbul Modern'de Yeni Sergi: Dijital Sanat Buluşması",
        category: "kültür",
        image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80",
        summary: "Dijital sanatın öncüleri İstanbul'da bir araya geliyor, interaktif deneyimler sunuluyor.",
        content: "İstanbul Modern, 'Dijital Rüyalar' başlıklı yeni sergisiyle sanat dünyasında büyük ilgi uyandırıyor. Sergi, dünya çapında tanınmış dijital sanatçıların eserlerini bir araya getiriyor ve ziyaretçilere interaktif deneyimler sunuyor. Yapay zeka ile üretilen tablolardan sanal gerçeklik enstalasyonlarına kadar geniş bir yelpazede eserler yer alıyor. Küratör Ayşe Erkmen, 'Bu sergi, sanatın geleceğinin bir öngörüsü' diyor. Sergi, Mart ayına kadar ziyaret edilebilir ve her yaş grubundan sanatsevere hitap ediyor.",
        author: "Ferit Şenoğlu",
        date: "19 Aralık 2025",
        readTime: "4 dk"
    },
    {
        id: 14,
        title: "Elektrikli Araç Satışları Rekor Kırdı",
        category: "ekonomi",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80",
        summary: "2025 yılında dünya genelinde 15 milyon elektrikli araç satıldı, pazar büyümeye devam ediyor.",
        content: "Elektrikli araç pazarı 2025 yılında tarihi bir başarıya imza attı. Dünya genelinde 15 milyon elektrikli araç satışı gerçekleşti ve bu rakam bir önceki yıla göre %40 artış gösterdi. Çin, ABD ve Avrupa pazarları bu büyümenin lokomotifi olurken, Türkiye'de de elektrikli araç talebi hızla yükseliyor. Tesla, BYD ve Volkswagen gibi üreticiler, üretim kapasitelerini artırıyor. Uzmanlar, 2030 yılına kadar elektrikli araç satışlarının toplam otomobil pazarının yarısını oluşturacağını öngörüyor. Batarya teknolojilerindeki gelişmeler ve şarj altyapısının yaygınlaşması, bu dönüşümü hızlandırıyor.",
        author: "Ferit Şenoğlu",
        date: "19 Aralık 2025",
        readTime: "4 dk"
    },
    {
        id: 15,
        title: "Wimbledon'da Büyük Sürpriz: Türk Tenisçi Finalde",
        category: "spor",
        image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=800&q=80",
        summary: "Genç Türk tenisçi, Wimbledon finaline yükselen ilk Türk sporcu oldu.",
        content: "Türk tenisi tarihi bir başarıya imza attı. 22 yaşındaki Ece Çakır, Wimbledon Tenis Turnuvası'nda finale yükselmeyi başaran ilk Türk tenisçi oldu. Yarı final maçında dünya 3 numarasını 2-1 yenen Çakır, finalde dünya 1 numarası ile karşılaşacak. Türkiye Tenis Federasyonu Başkanı, bu başarının Türk tenisinin gelişimi için çok önemli olduğunu belirtti. Ece Çakır, sosyal medya hesabından yaptığı paylaşımda tüm Türkiye'nin desteğini hissettiğini ve finalde elinden gelenin en iyisini yapacağını söyledi. Final maçı bu pazar oynanacak.",
        author: "Ferit Şenoğlu",
        date: "18 Aralık 2025",
        readTime: "3 dk"
    }
];

// Merge custom news with default news (custom news first)
const newsData = [...getCustomNews(), ...defaultNewsData];

// ===============================================
// STATE MANAGEMENT
// ===============================================
let currentCategory = 'all';
let searchQuery = '';
let filteredNews = [...newsData];
let currentSlide = 0;
let sliderInterval = null;
const slidesData = newsData.slice(0, 5); // İlk 5 haber slider için

// ===============================================
// DOM ELEMENTS
// ===============================================
const newsGrid = document.getElementById('newsGrid');
const noResults = document.getElementById('noResults');
const searchInput = document.getElementById('searchInput');
const navLinks = document.querySelectorAll('.nav-link');
const newsModal = document.getElementById('newsModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

// Slider elements
const slidesContainer = document.getElementById('slides');
const sliderDots = document.getElementById('sliderDots');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');

// ===============================================
// HERO SLIDER FUNCTIONS
// ===============================================
function initSlider() {
    // Create slides
    slidesData.forEach((news, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${index === 0 ? 'active' : ''}`;
        slide.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="slide-image">
            <div class="slide-content">
                <span class="slide-category">${news.category.toUpperCase()}</span>
                <h2 class="slide-title">${news.title}</h2>
                <p class="slide-summary">${news.summary}</p>
                <button class="slide-read-more" data-news-id="${news.id}">
                    Haberi Oku
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </button>
            </div>
        `;
        slidesContainer.appendChild(slide);

        // Add click event to read more button
        const readMoreBtn = slide.querySelector('.slide-read-more');
        readMoreBtn.addEventListener('click', () => {
            const newsId = parseInt(readMoreBtn.dataset.newsId);
            const newsItem = newsData.find(n => n.id === newsId);
            if (newsItem) openModal(newsItem);
        });
    });

    // Create dots
    slidesData.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Haber ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });

    // Start auto-play
    startSlider();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');

    // Remove active class from current
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Update current slide
    currentSlide = index;

    // Add active class to new
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % slidesData.length;
    goToSlide(nextIndex);
}

function prevSlide() {
    const prevIndex = (currentSlide - 1 + slidesData.length) % slidesData.length;
    goToSlide(prevIndex);
}

function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopSlider() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
    }
}

function restartSlider() {
    stopSlider();
    startSlider();
}

// ===============================================
// RENDER FUNCTIONS
// ===============================================
function renderNews() {
    // Filter by category and search
    filteredNews = newsData.filter(news => {
        const matchesCategory = currentCategory === 'all' || news.category === currentCategory;
        const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            news.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Clear grid
    newsGrid.innerHTML = '';

    if (filteredNews.length === 0) {
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';

    // Render news cards
    filteredNews.forEach((news, index) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="news-card-image">
            <div class="news-card-content">
                <span class="news-category">${news.category.toUpperCase()}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-summary">${news.summary}</p>
                <div class="news-meta">
                    <span>📅 ${news.date}</span>
                    <span>⏱️ ${news.readTime}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openModal(news));
        newsGrid.appendChild(card);
    });
}

function openModal(news) {
    modalBody.innerHTML = `
        <span class="modal-category">${news.category.toUpperCase()}</span>
        <h1 class="modal-title">${news.title}</h1>
        <img src="${news.image}" alt="${news.title}" class="modal-image">
        <p class="modal-content-text">${news.content}</p>
        <div class="modal-footer">
            <strong>Hazırlayan:</strong> ${news.author} | <strong>Yayın Tarihi:</strong> ${news.date} | <strong>Okuma Süresi:</strong> ${news.readTime}
        </div>
    `;

    newsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    newsModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===============================================
// EVENT LISTENERS
// ===============================================

// Slider controls
prevSlideBtn.addEventListener('click', () => {
    prevSlide();
    restartSlider(); // Restart auto-play after manual navigation
});

nextSlideBtn.addEventListener('click', () => {
    nextSlide();
    restartSlider();
});

// Pause slider on hover
const sliderContainer = document.querySelector('.hero-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopSlider);
    sliderContainer.addEventListener('mouseleave', startSlider);
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        nextSlide();
        restartSlider();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - prev slide
        prevSlide();
        restartSlider();
    }
}

// Category filtering
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Update category
        currentCategory = link.dataset.category;
        renderNews();

        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderNews();
});

// Modal controls
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && newsModal.classList.contains('active')) {
        closeModal();
    }
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// ===============================================
// INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    initSlider(); // Initialize hero slider
    renderNews();

    // Add smooth scroll behavior to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Format date (if needed for dynamic dates)
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('tr-TR', options);
}

// Random news shuffle (for "related news" feature if needed)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
