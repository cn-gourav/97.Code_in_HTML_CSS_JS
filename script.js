document.addEventListener('DOMContentLoaded', () => {
    
    // Sample job data representing what might fetch from a backend API
    const jobsData = [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "TechCorp Solutions",
            description: "Join our team to build cutting-edge web applications using React and TypeScript. Work on products used by millions of users globally.",
            location: "San Francisco, CA",
            salary: "$120k - $160k",
            postedAt: "2 days ago",
            type: "Full-time",
            skills: ["5+ years React experience", "TypeScript proficiency"],
            moreSkillsCount: "+1 more",
            isBookmarked: false,
            coverImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=150&h=150" // Placeholder avatar/logo
        },
        {
            id: 2,
            title: "UX/UI Designer",
            company: "DesignStudio Pro",
            description: "Create beautiful, user-centered designs for web and mobile applications. Collaborate with developers to ensure pixel-perfect implementation.",
            location: "Austin, TX",
            salary: "$90k - $130k",
            postedAt: "3 days ago",
            type: "Full-time",
            skills: ["Figma expertise", "Portfolio required"],
            moreSkillsCount: "+1 more",
            isBookmarked: false,
            coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 3,
            title: "Data Scientist",
            company: "DataDriven Analytics",
            description: "Analyze complex datasets and build machine learning models to drive business decisions. Work with cutting-edge AI technologies.",
            location: "Seattle, WA",
            salary: "$140k - $190k",
            postedAt: "5 days ago",
            type: "Full-time",
            skills: ["Python/R proficiency", "ML experience"],
            moreSkillsCount: "+1 more",
            isBookmarked: false,
            coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 4,
            title: "Product Manager",
            company: "StartupHub",
            description: "Lead product strategy and roadmap for our flagship SaaS platform. Collaborate cross-functionally to deliver amazing user experiences.",
            location: "New York, NY",
            salary: "$130k - $170k",
            postedAt: "1 week ago",
            type: "Full-time",
            skills: ["Agile methodology", "SaaS experience"],
            moreSkillsCount: "+2 more",
            isBookmarked: false,
            coverImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 5,
            title: "Backend Developer",
            company: "ServerSide Co",
            description: "Design and implement scalable APIs and microservices. Optimize database performance and ensure high availability of our systems.",
            location: "Denver, CO",
            salary: "$110k - $150k",
            postedAt: "2 weeks ago",
            type: "Full-time",
            skills: ["Node.js / Python", "AWS / Cloud", ],
            moreSkillsCount: "+2 more",
            isBookmarked: false,
            coverImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=150&h=150"
        },
        {
            id: 6,
            title: "Machine Learning Engineer",
            company: "AI Innovations Lab",
            description: "Develop and deploy machine learning models at scale. Enhance our predictive algorithms using the latest deep learning frameworks.",
            location: "Boston, MA",
            salary: "$150k - $200k",
            postedAt: "3 weeks ago",
            type: "Full-time",
            skills: ["PyTorch / TensorFlow", "Data Pipelines"],
            moreSkillsCount: "+3 more",
            isBookmarked: false,
            coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800&h=400",
            logo: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80&w=150&h=150"
        }
    ];

    const jobGrid = document.getElementById('job-grid');
    
    // Function to generate the HTML for a single job card
    function renderJobCard(job) {
        // Build skills HTML
        let skillsHtml = '';
        if (job.skills && job.skills.length > 0) {
            job.skills.forEach(skill => {
                skillsHtml += `<span class="skill-tag">${skill}</span>`;
            });
        }
        if (job.moreSkillsCount) {
            skillsHtml += `<span class="skill-tag skill-tag-alt">${job.moreSkillsCount}</span>`;
        }

        return `
            <article class="job-card">
                <div class="card-header">
                    <img src="${job.coverImage}" alt="${job.company} Workspace Cover" class="card-cover">
                    <!-- Toggle bookmark -> currently static but scalable to dynamic -->
                    <button class="bookmark-btn ${job.isBookmarked ? 'saved' : ''}" aria-label="Bookmark job">
                        <i class="ph${job.isBookmarked ? '-fill' : ''} ph-bookmark"></i>
                    </button>
                    <!-- Company Logo Overlap -->
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
                            <span class="meta-value">${job.postedAt}</span>
                        </div>
                    </div>
                    
                    <div class="job-skills">
                        ${skillsHtml}
                    </div>
                    
                    <button class="btn btn-primary">View Details</button>
                </div>
            </article>
        `;
    }

    // Function to render all jobs into the grid
    function renderJobs() {
        jobGrid.innerHTML = jobsData.map(job => renderJobCard(job)).join('');
        
        // Add interactivity to bookmark buttons
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        bookmarkBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const icon = this.querySelector('i');
                // Toggle Fill/Regular icon based on state
                if (icon.classList.contains('ph-fill')) {
                    icon.classList.remove('ph-fill');
                    icon.classList.add('ph');
                } else {
                    icon.classList.remove('ph');
                    icon.classList.add('ph-fill');
                }
            });
        });
    }

    // Interactive filter pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills (Except for 'Type' logic which could be multi-select, assuming single select for simplicity here as per standard tabs)
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked
            pill.classList.add('active');
        });
    });

    // Initialize layout
    renderJobs();
});
