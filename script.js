/**
 * BEGINNER FRIENDLY JAVASCRIPT
 * 
 * We write our javascript completely enclosed in this event listener because 
 * we want to make sure the standard HTML has *completely finished loading* 
 * before we try to use JS to target buttons or paragraphs!
 */

// Step 1: Wait for page to finish loading
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. FIND OUR HTML HTML ELEMENTS
    // ==========================================
    // We use document.getElementById to capture specific things from the page 
    // and hold them as variables so we can manipulate them.
    var searchInput = document.getElementById('search-input');
    var locationInput = document.getElementById('location-input');
    var resultsCountText = document.getElementById('results-count-text');
    var clearFiltersBtn = document.getElementById('clear-filters');
    
    // UI elements for the "Active Tag" displaying above the grid
    var activeTypeTag = document.getElementById('active-type-tag');
    var activeTypeName = document.getElementById('active-type-name');
    var removeTypeBtn = document.getElementById('remove-type-filter');
    var bookmarkCountBadge = document.getElementById('bookmark-count');
    
    // querySelectorAll is used when we want to get a LIST of multiple items sharing the same class
    var jobCards = document.querySelectorAll('.job-card');
    var typePills = document.querySelectorAll('.filter-pill');
    var bookmarkBtns = document.querySelectorAll('.bookmark-btn');


    // ==========================================
    // 2. KEEP TRACK OF USER STATE
    // ==========================================
    // We create a simple object to remember what the user is currently looking for
    var activeFilters = {
        keywordText: '',          // Example: 'Developer'
        locationText: '',         // Example: 'Austin'
        jobType: 'Full-time'      // Example: 'Part-time' or 'All'
    };


    // ==========================================
    // 3. THE CORE LOGIC: FILTERING THE CARDS
    // ==========================================
    // This is the function we call every single time a single button or key is pressed
    function filterJobsOnScreen() {
        var NumberOfVisibleCards = 0;
        
        // Convert user search to lowercase so 'Dev' matches 'dev'
        var searchSearchTextLower = activeFilters.keywordText.toLowerCase();
        var locationSearchTextLower = activeFilters.locationText.toLowerCase();

        // Let's loop through every single job card on our screen one by one using a standard "For" Loop
        for (var i = 0; i < jobCards.length; i++) {
            
            // Put the individual card we are currently looking at into a short variable name
            var individualCard = jobCards[i];

            // Here's a trick! If we grab 'innerText' of the whole card, we get ALL the text inside it!
            var cardEntireText = individualCard.innerText.toLowerCase();
            
            // Target the specific specific sub-elements inside this individual card
            var jobTypeTagElement = individualCard.querySelector('.job-type-tag');
            var cardJobTypeString = jobTypeTagElement.innerText.toLowerCase();
            
            var locationElement = individualCard.querySelector('.location-text');
            var cardLocationString = locationElement.innerText.toLowerCase();

            // Check if our card matches the filters using standard IF statement logic
            var matchesKeyword = false;
            if (activeFilters.keywordText === '' || cardEntireText.includes(searchSearchTextLower)) {
                matchesKeyword = true;
            }

            var matchesLocation = false;
            if (activeFilters.locationText === '' || cardLocationString.includes(locationSearchTextLower)) {
                matchesLocation = true;
            }

            var matchesType = false;
            if (activeFilters.jobType === 'All' || cardJobTypeString.includes(activeFilters.jobType.toLowerCase())) {
                matchesType = true;
            }

            // If ALL THREE filters match, we show the card! Otherwise, hid it!
            if (matchesKeyword === true && matchesLocation === true && matchesType === true) {
                individualCard.style.display = 'flex'; // 'flex' makes it visible because styles.css uses flexbox
                NumberOfVisibleCards = NumberOfVisibleCards + 1; // Count up our counter by 1
            } else {
                individualCard.style.display = 'none'; // 'none' hides from view entirely, shrinking spacing too
            }
        } // End of For Loop

        // Update the Number of results
        resultsCountText.textContent = NumberOfVisibleCards;

        // Decide if we should show the "Clear Filters" button
        if (activeFilters.keywordText !== '' || activeFilters.locationText !== '' || activeFilters.jobType !== 'All') {
            clearFiltersBtn.style.display = 'block'; // Make visible
        } else {
            clearFiltersBtn.style.display = 'none'; // Make invisible
        }

        // Decide if we should show the Active Job Type Tag text 
        if (activeFilters.jobType !== 'All') {
            activeTypeTag.style.display = 'inline-flex';
            activeTypeName.textContent = activeFilters.jobType;
        } else {
            activeTypeTag.style.display = 'none';
        }

    }


    // ==========================================
    // 4. ATTACH LISTENERS 
    // ==========================================
    // "Listeners" are features that wait for users to click or type into things!

    // Wait for User typing in Main Search Field
    searchInput.addEventListener('input', function(eventProperty) {
        // e.target.value grabs the actual text inside the input box at that exact moment
        activeFilters.keywordText = eventProperty.target.value; 
        filterJobsOnScreen(); // Run the logic we wrote above!
    });

    // Wait for User typing in Location Field
    locationInput.addEventListener('input', function(eventProperty) {
        activeFilters.locationText = eventProperty.target.value;
        filterJobsOnScreen(); 
    });

    // Wait for Clicks on ANY of the Pill Buttons (All, Part-time, Full-time)
    for (var i = 0; i < typePills.length; i++) {
        var singlePill = typePills[i];
        
        singlePill.addEventListener('click', function(eventProperty) {
            
            var clickedPill = eventProperty.target;

            // Notice we put custom "data-type" commands in the HTML? We extract them here!
            var targetTypeString = clickedPill.getAttribute('data-type'); 
            
            // First, remove the purple 'active' background color from EVERY pill
            for (var j = 0; j < typePills.length; j++) {
                typePills[j].classList.remove('active');
            }
            // Second, add purple 'active' back to ONLY the one the user clicked
            clickedPill.classList.add('active');

            // Update state memory entirely
            activeFilters.jobType = targetTypeString;
            filterJobsOnScreen(); // Run!
        });
    }

    // Wait for User to click the 'x' button on the Type Tag
    removeTypeBtn.addEventListener('click', function() {
        activeFilters.jobType = 'All'; // Erase the type filter
        
        // Reset Visual pills back to the default "All" state
        for (var i = 0; i < typePills.length; i++) {
            var p = typePills[i];
            if (p.getAttribute('data-type') === 'All') {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        }
        filterJobsOnScreen();
    });

    // Wait for user clicking the big completely clear action
    clearFiltersBtn.addEventListener('click', function() {
        // 1. Reset memory variables
        activeFilters.keywordText = '';
        activeFilters.locationText = '';
        activeFilters.jobType = 'All';

        // 2. Reset text input visual boxes to empty
        searchInput.value = '';
        locationInput.value = '';

        // 3. Re-set pills
        for (var i = 0; i < typePills.length; i++) {
            var p = typePills[i];
            if (p.getAttribute('data-type') === 'All') {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        }

        // 4. Finally re-run display rendering
        filterJobsOnScreen();
    });


    // ==========================================
    // 5. BOOKMARKS! 
    // ==========================================
    var totalBookmarkedNumber = 0;

    // Loop through however many bookmark buttons exist
    for (var i = 0; i < bookmarkBtns.length; i++) {
        var btn = bookmarkBtns[i];
        
        btn.addEventListener('click', function() {
            // 'this' refers to the exact button out of the 6 that was currently clicked
            var internalIcon = this.querySelector('i');
            
            // toggle adds the class 'saved' if it isn't there, or removes it if it is!
            this.classList.toggle('saved');
            
            // If it now correctly HAS the class 'saved' from our toggle above...
            if (this.classList.contains('saved') === true) {
                // Change visually to filled
                internalIcon.classList.remove('ph');
                internalIcon.classList.add('ph-fill');
                totalBookmarkedNumber = totalBookmarkedNumber + 1;
            } else {
                // Change visually back to outline
                internalIcon.classList.remove('ph-fill');
                internalIcon.classList.add('ph');
                totalBookmarkedNumber = totalBookmarkedNumber - 1;
            }
            
            // Update the HTML span so the User can see the number change!
            bookmarkCountBadge.textContent = totalBookmarkedNumber;
        });
    }


    // ==========================================
    // Finally kick off the page!
    // ==========================================
    // We run this function one time on boot to properly setup math and filters
    filterJobsOnScreen();

});
