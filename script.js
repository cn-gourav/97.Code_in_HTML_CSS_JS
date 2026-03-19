/**
 * Job Discovery Dashboard
 * This script handles all dynamic features including searching, 
 * filtering, bookmarking, and rendering the job cards.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Data Source (Simulating what you'd get from a backend database or API)
    const jobsDatabase = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "TechCorp Solutions",
            description: "Join our team to build cutting-edge web applications using React and TypeScript. Work on products used ...",
            location: "San Francisco, CA",
            salary: "$120k - $160k",
            posted: "2 days ago",
            type: "Full-time",
            skills: ["5+ years React", "TypeScript"],
            extraSkills: "+1 more",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 2,
            title: "UX/UI Designer",
            company: "DesignStudio Pro",
            description: "Create beautiful, user-centered designs for web and mobile applications. Collaborate with developers to...",
            location: "Austin, TX",
            salary: "$90k - $130k",
            posted: "3 days ago",
            type: "Full-time",
            skills: ["Figma expertise", "Portfolio required"],
            extraSkills: "+1 more",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 3,
            title: "Data Scientist",
            company: "DataDriven Analytics",
            description: "Analyze complex datasets and build machine learning models to drive business decisions. Work with cuttin...",
            location: "Seattle, WA",
            salary: "$140k - $190k",
            posted: "5 days ago",
            type: "Full-time",
            skills: ["Python/R proficiency", "ML experience"],
            extraSkills: "+1 more",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 4,
            title: "Product Manager",
            company: "StartupHub",
            description: "Lead product strategy and roadmap for our flagship SaaS platform. Collaborate cross-functionally to...",
            location: "New York, NY",
            salary: "$130k - $170k",
            posted: "1 week ago",
            type: "Full-time",
            skills: ["Agile methodology", "SaaS experience"],
            extraSkills: "+2 more",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 5,
            title: "Backend Developer",
            company: "ServerSide Co",
            description: "Design and implement scalable APIs and microservices. Optimize database performance and ensure high...",
            location: "Denver, CO",
            salary: "$110k - $150k",
            posted: "2 weeks ago",
            type: "Full-time",
            skills: ["Node.js / Python", "AWS / Cloud"],
            extraSkills: "+2 more",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 6,
            title: "Machine Learning Engineer",
            company: "AI Innovations Lab",
            description: "Develop and deploy machine learning models at scale. Enhance our predictive algorithms using the...",
            location: "Boston, MA",
            salary: "$150k - $200k",
            posted: "3 weeks ago",
            type: "Full-time",
            skills: ["PyTorch / TensorFlow", "Data Pipelines"],
            extraSkills: "+3 more",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=150&h=150"
        },
        // We add two hidden extra jobs to test out the logic for other "pill" filters!
        {
            id: 7,
            title: "Remote Cloud Architect",
            company: "GlobalNet",
            description: "Design cloud infrastructure that scales to billions of requests globally.",
            location: "Remote, Earth",
            salary: "$160k - $210k",
            posted: "4 days ago",
            type: "Remote",
            skills: ["AWS", "Kubernetes"],
            extraSkills: "",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 8,
            title: "Junior Editor (Part-Time)",
            company: "StoryBrand",
            description: "Edit marketing copy and assist with content strategy 20 hours a week.",
            location: "Austin, TX",
            salary: "$30k - $45k",
            posted: "1 day ago",
            type: "Part-time",
            skills: ["Copywriting", "SEO"],
            extraSkills: "",
            isBookmarked: false,
            cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=150&h=150"
        }
    ];

    // 2. Mutable State representing Active UI filters
    let state = {
        keywordSearch: '',
        locationSearch: '',
        activeType: 'Full-time' // Starting on "Full-time" to match UI mock
    };

    // 3. Cache DOM Elements for performance
    const DOM = {
        jobGrid: document.getElementById('job-grid'),
        searchInput: document.getElementById('search-input'),
        locationInput: document.getElementById('location-input'),
        typePills: document.querySelectorAll('.filter-pill'),
        resultsCountText: document.getElementById('results-count-text'),
        clearFiltersBtn: document.getElementById('clear-filters'),
        activeTypeTag: document.getElementById('active-type-tag'),
        activeTypeName: document.getElementById('active-type-name'),
        removeTypeBtn: document.getElementById('remove-type-filter'),
        bookmarkCountBadge: document.getElementById('bookmark-count')
    };

    // 4. Core Rendering Engine
    function renderJobs(jobsToRender) {
        // Handle empty states gracefully
        if (jobsToRender.length === 0) {
            DOM.jobGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; color: var(--text-gray); padding: 4rem;">
                    <h3>No jobs exactly match your search.</h3>
                    <p style="margin-top: 0.5rem">Try adjusting your filters or search keywords.</p>
                </div>
            `;
            DOM.resultsCountText.textContent = "0";
            return;
        }

        // Standard card generation
        DOM.jobGrid.innerHTML = jobsToRender.map(job => {
            const isSaved = job.isBookmarked;
            
            // Build the skills list HTML elegantly
            const parsedSkills = job.skills.map(skill => 
                `<span class="skill-tag">${skill}</span>`
            ).join('');
            
            const extraSkillBadge = job.extraSkills 
                ? `<span class="skill-tag skill-tag-alt">${job.extraSkills}</span>`
                : '';

            return `
                <article class="job-card">
                    <div class="card-header">
                        <img src="${job.cover}" alt="${job.company} Workspace" class="card-cover">
                        <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-job-id="${job.id}" aria-label="Bookmark job">
                            <i class="${isSaved ? 'ph-fill' : 'ph'} ph-bookmark"></i>
                        </button>
                        <div class="company-logo-box">
                            <img src="${job.logo}" alt="${job.company} Logo" class="company-logo">
                        </div>
                    </div>
                    
                    <div class="card-body">
                        <span class="job-type-tag">
                            <i class="ph ph-briefcase"></i>
                            ${job.type}
                        </span>
                        
                        <h2 class="job-title">${job.title}</h2>
                        <p class="company-name">${job.company}</p>
                        
                        <p class="job-desc">${job.description}</p>
                        
                        <div class="job-meta">
                            <div class="meta-item">
                                <i class="ph ph-map-pin"></i>
                                <span class="meta-value">${job.location}</span>
                            </div>
                            <div class="meta-item">
                                <i class="ph ph-currency-dollar"></i>
                                <span class="meta-value">${job.salary}</span>
                            </div>
                            <div class="meta-item">
                                <i class="ph ph-clock"></i>
                                <span class="meta-value">${job.posted}</span>
                            </div>
                        </div>
                        
                        <div class="job-skills">
                            ${parsedSkills}
                            ${extraSkillBadge}
                        </div>
                        
                        <button class="btn btn-primary" style="margin-top: auto">View Details</button>
                    </div>
                </article>
            `;
        }).join('');

        DOM.resultsCountText.textContent = jobsToRender.length;
        attachBookmarkEvents();
    }

    // 5. Analytics/Filtering Engine
    function applyFilters() {
        let filtered = jobsDatabase;

        // Apply Keyword Filter
        if (state.keywordSearch.trim() !== '') {
            const query = state.keywordSearch.toLowerCase();
            filtered = filtered.filter(job => 
                job.title.toLowerCase().includes(query) || 
                job.company.toLowerCase().includes(query) ||
                job.skills.some(skill => skill.toLowerCase().includes(query))
            );
        }

        // Apply Location Filter
        if (state.locationSearch.trim() !== '') {
            const locationQuery = state.locationSearch.toLowerCase();
            filtered = filtered.filter(job => 
                job.location.toLowerCase().includes(locationQuery)
            );
        }

        // Apply Job Type Filter (unless 'All' is selected)
        if (state.activeType !== 'All') {
            filtered = filtered.filter(job => job.type === state.activeType);
        }

        // Manage visibility of the "Clear Filters" button
        const hasActiveFilters = state.keywordSearch || state.locationSearch || state.activeType !== 'All';
        DOM.clearFiltersBtn.style.display = hasActiveFilters ? 'block' : 'none';

        // Update the visual active tag area right above the results
        if (state.activeType !== 'All') {
            DOM.activeTypeTag.style.display = 'inline-flex';
            DOM.activeTypeName.textContent = state.activeType;
        } else {
            DOM.activeTypeTag.style.display = 'none';
        }

        // Re-render
        renderJobs(filtered);
    }

    // 6. Interaction Wireframes (Event Listeners)
    function setupEventListeners() {
        
        // Searching Listeners (Input method so it filters literally as they type)
        DOM.searchInput.addEventListener('input', (e) => {
            state.keywordSearch = e.target.value;
            applyFilters();
        });

        DOM.locationInput.addEventListener('input', (e) => {
            state.locationSearch = e.target.value;
            applyFilters();
        });

        // Pill clicking logic
        DOM.typePills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                const targetType = e.target.getAttribute('data-type');
                
                // Visual update for pills
                DOM.typePills.forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');

                // State update
                state.activeType = targetType;
                applyFilters();
            });
        });

        // Clicking the exact 'x' tag
        DOM.removeTypeBtn.addEventListener('click', () => {
            // Revert to all
            state.activeType = 'All';
            DOM.typePills.forEach(p => {
                if(p.getAttribute('data-type') === 'All') {
                    p.classList.add('active');
                } else {
                    p.classList.remove('active');
                }
            });
            applyFilters();
        });

        // The master Clear Button
        DOM.clearFiltersBtn.addEventListener('click', () => {
            state.keywordSearch = '';
            state.locationSearch = '';
            state.activeType = 'All'; // default drop

            DOM.searchInput.value = '';
            DOM.locationInput.value = '';

            DOM.typePills.forEach(p => {
                if(p.getAttribute('data-type') === 'All') p.classList.add('active');
                else p.classList.remove('active');
            });

            applyFilters();
        });
    }

    // 7. Event Delegation for dynamically rendered Bookmarks
    function attachBookmarkEvents() {
        // We use querySelectorAll repeatedly here because the DOM is recreated fresh each render
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        
        bookmarkBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const jobId = parseInt(this.getAttribute('data-job-id'));
                const targetJob = jobsDatabase.find(j => j.id === jobId);
                
                if (targetJob) {
                    // Toggle boolean
                    targetJob.isBookmarked = !targetJob.isBookmarked;
                    
                    // UI Polish (so we don't need to re-render the whole grid on bookmark)
                    const icon = this.querySelector('i');
                    if(targetJob.isBookmarked) {
                        this.classList.add('saved');
                        icon.classList.remove('ph');
                        icon.classList.add('ph-fill');
                    } else {
                        this.classList.remove('saved');
                        icon.classList.remove('ph-fill');
                        icon.classList.add('ph');
                    }

                    // Update count in top right header
                    const totalBookmarks = jobsDatabase.filter(j => j.isBookmarked).length;
                    DOM.bookmarkCountBadge.textContent = totalBookmarks;
                }
            });
        });
    }


    // INIT (Kick off the JS on load)
    setupEventListeners();
    applyFilters(); // This triggers the very first render!

});
