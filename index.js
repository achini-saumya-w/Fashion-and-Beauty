// Dummy ad data
const adData = [
    {
        id: 1,
        category: '',
        location: 'Colombo',
        price: 'Rs. 1500.00',
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
        postedTime: '2024-06-01',
        description: ''
    },
    {
        id: 2,
        category: '',
        location: 'Colombo',
        price: 'Rs. 1500.00',
        images: ['img4.jpg', 'img6.jpg'],
        postedTime: '2024-06-01',
        description: ''
    },
    {
        id: 3,
        category: '',
        location: 'Colombo',
        price: 'Rs. 1500.00',
        images: ['img8.jpeg', 'img8.jpeg'],
        postedTime: '2024-06-01',
        description: ''
    },
    
];

let filteredAds = [...adData];

function handleSearch() {
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const location = document.getElementById('location').value;

    filteredAds = adData.filter(ad => {
        return (!category || ad.category === category) &&
            (!minPrice || ad.price >= parseInt(minPrice)) &&
            (!maxPrice || ad.price <= parseInt(maxPrice)) &&
            (!location || ad.location.toLowerCase().includes(location.toLowerCase()));
    });

    displayAds();
}

function displayAds() {
    const adContainer = document.getElementById('adContainer');
    adContainer.innerHTML = '';

    filteredAds.forEach(ad => {
        const shortDescription = ad.description.length > 100 ? ad.description.substring(0, 100) + '...' : ad.description;
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 ad-card">
                <div id="carousel${ad.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${ad.images.map((img, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img class="d-block w-100" src="${img}" alt="Ad image">
                        </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carousel${ad.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${ad.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${formatCategory(ad.category)}</h5>
                    <p class="card-text">Price: ${ad.price}</p>
                    <p class="card-text">Location: ${ad.location}</p>
                    <p class="card-text">Posted on: ${ad.postedTime}</p>
                    <p class="card-text">${shortDescription}</p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${ad.id})">View Details</button>
                </div>
            </div>`;
        adContainer.appendChild(card);
    });
}

function formatCategory(category) {
    return category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function handleViewDetails(id) {
    const ad = filteredAds.find(p => p.id === id);
    const modal = new bootstrap.Modal(document.getElementById('adModal'));

    document.getElementById('adModalLabel').innerText = ad.location;
    document.getElementById('carouselInner').innerHTML = ad.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Ad image">
        </div>`).join('');
    document.getElementById('modalLocation').innerText = `Location: ${ad.location}`;
    document.getElementById('modalPrice').innerText = `Price: ${ad.price}`;
    document.getElementById('modalCategory').innerText = `Category: ${formatCategory(ad.category)}`;
    document.getElementById('modalPostedTime').innerText = `Posted on: ${ad.postedTime}`;
    document.getElementById('modalDescription').innerText = `Description: ${ad.description}`;

    modal.show();
}

// Scroll to top button
let backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Initial display of ads
displayAds();
