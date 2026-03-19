/**
 * Job Discovery Dashboard
 * All HTML is kept statically in index.html. 
 * This script strictly adds interactivity, manipulating existing DOM elements.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Cache Existing DOM Elements
    const jobCards = document.querySelectorAll('.job-card');
    const searchInput = document.getElementById('search-input');
    const locationInput = document.getElementById('location-input');
    const typePills = document.querySelectorAll('.filter-pill');
    const resultsCountText = document.getElementById('results-count-text');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const activeTypeTag = document.getElementById('active-type-tag');
    const activeTypeName = document.getElementById('active-type-name');
    const removeTypeBtn = document.getElementById('remove-type-filter');
    const bookmarkCountBadge = document.getElementById('bookmark-count');
    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');

    // 2. State definition
    let state = {
        keyword: '',
        location: '',
        type: 'Full-time' // Default visually selected in HTML
    };

    // 3. Core Filtering Logic
    function filterCards() {
        let visibleCount = 0;
        
        const keywordQuery = state.keyword.toLowerCase();
        const locationQuery = state.location.toLowerCase();

        // Loop through the actual HTML nodes and toggle visibility
        jobCards.forEach(card => {
            // Extract text metrics natively from the HTML nodes themselves
            const cardText = card.innerText.toLowerCase();
            
            const typeElement = card.querySelector('.job-type-tag');
            const cardType = typeElement ? typeElement.innerText.trim().toLowerCase() : '';
            
            // In our HTML, location is always the 1st meta item
            const locationElement = card.querySelector('.meta-item:nth-child(1) .meta-value');
            const cardLocation = locationElement ? locationElement.innerText.trim().toLowerCase() : '';

            // Check conditions
            const matchesKeyword = keywordQuery === '' || cardText.includes(keywordQuery);
            const matchesLocation = locationQuery === '' || cardLocation.includes(locationQuery);
            const matchesType = state.type === 'All' || cardType.includes(state.type.toLowerCase());

            // Apply visibility
            if (matchesKeyword && matchesLocation && matchesType) {
                card.style.display = 'flex'; // `.job-card` is a flex column in CSS
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // 4. Update UI labels and tags
        resultsCountText.textContent = visibleCount;

        // Show/hide 'Clear all filters'
        const hasFilters = state.keyword !== '' || state.location !== '' || state.type !== 'All';
        clearFiltersBtn.style.display = hasFilters ? 'block' : 'none';

        // Update the visual "Active Type" tag floating above grid
        if (state.type !== 'All') {
            activeTypeTag.style.display = 'inline-flex';
            activeTypeName.textContent = state.type;
        } else {
            activeTypeTag.style.display = 'none';
        }
    }

    // 5. Input Event Listeners
    searchInput.addEventListener('input', (e) => {
        state.keyword = e.target.value;
        filterCards();
    });

    locationInput.addEventListener('input', (e) => {
        state.location = e.target.value;
        filterCards();
    });

    // 6. Pill Tab Listeners
    typePills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            const targetType = e.target.getAttribute('data-type');
            
            // Update styling of pills
            typePills.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');

            // Update state and run filter
            state.type = targetType;
            filterCards();
        });
    });

    // 7. Remove Active Tag Button (The 'x' on the active label)
    removeTypeBtn.addEventListener('click', () => {
        state.type = 'All'; // Drop type to 'All'
        
        typePills.forEach(p => {
            if(p.getAttribute('data-type') === 'All') {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        filterCards();
    });

    // 8. Global Clear Command
    clearFiltersBtn.addEventListener('click', () => {
        // Reset state
        state.keyword = '';
        state.location = '';
        state.type = 'All';

        // Reset inputs
        searchInput.value = '';
        locationInput.value = '';

        // Reset pills
        typePills.forEach(p => {
            if(p.getAttribute('data-type') === 'All') {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        filterCards();
    });

    // 9. Bookmark Interactivity
    let totalBookmarks = 0;

    function updateBookmarkCounterBadge() {
        bookmarkCountBadge.textContent = totalBookmarks;
    }

    bookmarkBtns.forEach(btn => {
        // Hydrate initial count if any element was hardcoded with 'saved'
        if (btn.classList.contains('saved')) {
            totalBookmarks++;
        }

        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            this.classList.toggle('saved');
            
            if (this.classList.contains('saved')) {
                // Change phosphor icon from outline to fill
                icon.classList.remove('ph');
                icon.classList.add('ph-fill');
                totalBookmarks++;
            } else {
                // Change back to outline
                icon.classList.remove('ph-fill');
                icon.classList.add('ph');
                totalBookmarks--;
            }
            
            updateBookmarkCounterBadge();
        });
    });

    // Run setup initialization
    updateBookmarkCounterBadge();
    filterCards();

});
