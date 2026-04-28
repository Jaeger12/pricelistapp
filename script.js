// Data pricelist
const dataPricelist = [
    { 
        service: "Spotify", 
        iconPath: "assets/spotify.png",
        description: "Premium streaming musik tanpa batas.",
        tags: ["Musik", "Streaming", "Unlimited"],
        items: [
            { d: "1 Month", p: "18k" }, 
            { d: "2 Month", p: "25k" }
        ] 
    },
    { 
        service: "ChatGPT", 
        iconPath: "assets/chatgpt.png",
        description: "Akses AI canggih untuk tugas dan ide kreatif.",
        tags: ["AI", "Produktivitas", "Smart"],
        items: [
            { d: "8 User / 1 Month", p: "17k" }, 
            { d: "5 User / 1 Month", p: "20k" }
        ] 
    },
    { 
        service: "Netflix", 
        iconPath: "assets/netflix.png",
        description: "Film dan serial populer dengan harga hemat.",
        tags: ["Seru", "Streaming", "Unlimited"],
        items: [
            { d: "2 User / 1 Month", p: "25k" }, 
            { d: "1 User / 1 Month", p: "30k" }
        ] 
    },
    { 
        service: "Canva", 
        iconPath: "assets/canva.png",
        description: "Desain profesional mudah dalam satu platform.",
        tags: ["Desain", "Kreatif", "Cepat"],
        items: [
            { d: "1 Month", p: "6k" }, 
            { d: "1 Year", p: "15k" }
        ] 
    },
    { 
        service: "Grammarly", 
        iconPath: "assets/grammarly.png",
        items: [
            { d: "Sharing / 1 Month", p: "15k" }, 
            { d: "Private / 1 Month", p: "45k" }
        ] 
    },
    { 
        service: "Gemini AI", 
        iconPath: "assets/gemini.png",
        items: [
            { d: "Private / 1 Month", p: "20k" }
        ] 
    },
    { 
        service: "Microsoft 365", 
        iconPath: "assets/microsoft.png",
        items: [
            { d: "1 Month", p: "12k" }
        ] 
    },
    { 
        service: "Duolingo", 
        iconPath: "assets/duolingo.png",
        items: [
            { d: "1 Month", p: "15k" }, 
            { d: "6 Month", p: "35k" }, 
            { d: "1 Year", p: "45k" }
        ] 
    },
    { 
        service: "Capcut", 
        iconPath: "assets/capcut.png",
        items: [
            { d: "Sharing / 1 Month", p: "7k" }, 
            { d: "Private / 1 Month", p: "10k" }
        ] 
    },
    { 
        service: "Viu", 
        iconPath: "assets/viu.png",
        items: [
            { d: "Lifetime", p: "7k" }
        ] 
    },
    { 
        service: "GetContact", 
        iconPath: "assets/getcontact.png",
        items: [
            { d: "1 Month", p: "20k" }
        ] 
    },
    { 
        service: "PicsArt", 
        iconPath: "assets/picsart.png",
        items: [
            { d: "Sharing / 1 Month", p: "6k" }, 
            { d: "Private / 1 Month", p: "10k" }
        ] 
    }
];

// DOM Elements
const homeView = document.getElementById('home-view');
const detailView = document.getElementById('detail-view');
const appsGrid = document.getElementById('apps-grid');
const backBtn = document.getElementById('back-btn');
const appTitle = document.getElementById('app-title');
const detailContent = document.getElementById('detail-content');

// Modal Elements
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const orderForm = document.getElementById('order-form');
const modalAppName = document.getElementById('modal-app-name');
const modalAppPackage = document.getElementById('modal-app-package');
const modalAppPrice = document.getElementById('modal-app-price');
const thankyouPanel = document.getElementById('thankyou-panel');
const thanksAppName = document.getElementById('thanks-app-name');
const thanksAppPackage = document.getElementById('thanks-app-package');
const thanksAppPrice = document.getElementById('thanks-app-price');
const whatsappSendButton = document.getElementById('whatsapp-send-button');

let currentApp = null;
let currentOrder = null;

// Render apps grid on home view
function renderAppsGrid() {
    appsGrid.innerHTML = '';
    dataPricelist.forEach((app, index) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.innerHTML = `
            <img class="app-card-icon" src="${app.iconPath}" alt="${app.service} icon">
            <span class="app-card-name">${app.service}</span>
        `;
        appCard.addEventListener('click', () => showAppDetail(index));
        appsGrid.appendChild(appCard);
    });
}

// Show app detail view
function showAppDetail(index) {
    currentApp = dataPricelist[index];
    appTitle.textContent = currentApp.service;
    document.getElementById('app-subtitle').textContent = currentApp.description || 'Pilih paket yang sesuai';
    
    // Set app header icon
    const appHeaderIcon = document.getElementById('app-header-icon');
    appHeaderIcon.innerHTML = `<img class="app-header-icon-img" src="${currentApp.iconPath}" alt="${currentApp.service} icon">`;

    // Render detail tags
    const detailTags = document.getElementById('detail-tags');
    if (currentApp.tags && currentApp.tags.length) {
        detailTags.innerHTML = currentApp.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    } else {
        detailTags.innerHTML = `<span class="tag">Rekomendasi</span><span class="tag">Premium</span>`;
    }
    
    // Render price cards
    detailContent.innerHTML = '';
    currentApp.items.forEach((item, itemIndex) => {
        const priceCard = document.createElement('div');
        priceCard.className = 'price-card';
        priceCard.style.cursor = 'pointer';
        priceCard.innerHTML = `
            <div class="price-card-header">
                <span class="price-card-title">${item.d}</span>
                <span class="price-badge">Paket ${itemIndex + 1}</span>
            </div>
            <div class="price-item">
                <span class="price-duration">Durasi</span>
                <span class="price-value">Rp ${item.p}</span>
            </div>
        `;
        
        // Add click event to open modal
        priceCard.addEventListener('click', () => {
            openOrderModal(currentApp.service, item.d, item.p);
        });
        
        detailContent.appendChild(priceCard);
    });
    
    // Switch views
    homeView.classList.remove('active');
    setTimeout(() => {
        detailView.classList.add('active');
    }, 200);
}

// Go back to home view
backBtn.addEventListener('click', () => {
    detailView.classList.remove('active');
    setTimeout(() => {
        homeView.classList.add('active');
    }, 200);
});

// Modal Functions
function openOrderModal(appName, packageName, price) {
    currentOrder = { appName, packageName, price };
    modalAppName.textContent = appName;
    modalAppPackage.textContent = packageName;
    modalAppPrice.textContent = `Rp ${price}`;
    
    // Reset form
    orderForm.reset();
    
    modalOverlay.classList.add('active');
}

function closeOrderModal() {
    modalOverlay.classList.remove('active');
    resetOrderModal();
}

// Modal event listeners
modalClose.addEventListener('click', closeOrderModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeOrderModal();
    }
});

// Form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userName = document.getElementById('user-name').value;
    const userEmail = document.getElementById('user-email').value;
    const userPhone = document.getElementById('user-phone').value;
    
    currentOrder.userName = userName;
    currentOrder.userEmail = userEmail;
    currentOrder.userPhone = userPhone;
    
    // Show thank you panel and continue to WhatsApp automatically
    showThankYouPanel();
    openWhatsApp();
});

function showThankYouPanel() {
    thanksAppName.textContent = currentOrder.appName;
    thanksAppPackage.textContent = currentOrder.packageName;
    thanksAppPrice.textContent = `Rp ${currentOrder.price}`;
    
    document.querySelector('.order-form').hidden = true;
    thankyouPanel.hidden = false;
    modalOverlay.classList.add('active');
}

function resetOrderModal() {
    document.querySelector('.order-form').hidden = false;
    thankyouPanel.hidden = true;
    orderForm.reset();
}

whatsappSendButton.addEventListener('click', openWhatsApp);

function openWhatsApp() {
    const message = `Halo, saya ingin memesan:\n\n📱 Aplikasi: ${currentOrder.appName}\n📦 Paket: ${currentOrder.packageName}\n💰 Harga: Rp ${currentOrder.price}\n\nNama: ${currentOrder.userName}\nEmail: ${currentOrder.userEmail}\nNo. WhatsApp: ${currentOrder.userPhone}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '6289687536022'; // Replace with your WhatsApp number
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    closeOrderModal();
}

// Initialize
homeView.classList.add('active');
renderAppsGrid();