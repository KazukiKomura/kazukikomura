// Load data from JSON files and populate the page
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Load all data files
        const basePath = 'data/';
        const [profileData, experienceData, educationData, publicationsData] = await Promise.all([
            fetch(`${basePath}profile.json`).then(res => {
                if (!res.ok) throw new Error(`Failed to load profile.json: ${res.status}`);
                return res.json();
            }),
            fetch(`${basePath}experience.json`).then(res => {
                if (!res.ok) throw new Error(`Failed to load experience.json: ${res.status}`);
                return res.json();
            }),
            fetch(`${basePath}education.json`).then(res => {
                if (!res.ok) throw new Error(`Failed to load education.json: ${res.status}`);
                return res.json();
            }),
            fetch(`${basePath}publications.json`).then(res => {
                if (!res.ok) throw new Error(`Failed to load publications.json: ${res.status}`);
                return res.json();
            })
        ]);

        // Populate profile section
        populateProfile(profileData);
        
        // Populate experience section
        populateExperience(experienceData);
        
        // Populate education section
        populateEducation(educationData);
        
        // Populate publications section
        populatePublications(publicationsData);

        // Add smooth scrolling for navigation
        initSmoothScrolling();
        
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback: show error message or use default content
    }
});

function populateProfile(data) {
    document.getElementById('first-name').textContent = data.name.first;
    document.getElementById('last-name').textContent = data.name.last;
    document.getElementById('email-link').href = `mailto:${data.email}`;
    document.getElementById('email-link').textContent = data.email;
    document.getElementById('bio').textContent = data.bio;
    
    // Populate social links
    const socialLinksContainer = document.getElementById('social-links');
    data.socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.href = link.url;
        socialLink.className = 'social-link';
        socialLink.target = '_blank';
        socialLink.rel = 'noopener noreferrer';
        socialLink.innerHTML = `<i class="${link.icon}"></i>`;
        socialLinksContainer.appendChild(socialLink);
    });
}

function populateExperience(data) {
    const experienceContainer = document.getElementById('experience-list');
    
    data.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-title">${item.position}</div>
                <div class="timeline-company">${item.company}</div>
                <div class="timeline-period">${item.period}</div>
                <div class="timeline-description">${item.description}</div>
            </div>
        `;
        
        experienceContainer.appendChild(timelineItem);
    });
}

function populateEducation(data) {
    const educationContainer = document.getElementById('education-list');
    
    data.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const degreeField = item.degree && item.field ? 
            `<div class="timeline-company">${item.degree}</div>
             <div class="timeline-description">${item.field}</div>` :
            (item.degree ? `<div class="timeline-company">${item.degree}</div>` : '');
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-title">${item.institution}</div>
                ${degreeField}
                <div class="timeline-period">${item.period}</div>
            </div>
        `;
        
        educationContainer.appendChild(timelineItem);
    });
}

function populatePublications(data) {
    // Populate conference publications
    const conferenceContainer = document.getElementById('conference-publications');
    data.conference.forEach(pub => {
        const pubItem = document.createElement('li');
        pubItem.className = 'publication-item';
        
        const doiLink = pub.doi ? 
            `<div><a href="${pub.doi}" class="publication-link" target="_blank" rel="noopener noreferrer">DOI: ${pub.doi}</a></div>` : '';
        
        pubItem.innerHTML = `
            <div class="publication-title">${pub.title}</div>
            <div class="publication-authors">${pub.authors} (${pub.year})</div>
            <div class="publication-venue">${pub.venue}, ${pub.status}, ${pub.location}</div>
            ${doiLink}
        `;
        
        conferenceContainer.appendChild(pubItem);
    });
    
    // Populate domestic publications
    const domesticContainer = document.getElementById('domestic-publications');
    data.domestic.forEach(pub => {
        const pubItem = document.createElement('li');
        pubItem.className = 'publication-item';
        
        const doiLink = pub.doi ? 
            `<div><a href="${pub.doi}" class="publication-link" target="_blank" rel="noopener noreferrer">${pub.doi}</a></div>` : '';
        
        const volumeInfo = pub.volume ? `, ${pub.volume} 巻` : '';
        
        pubItem.innerHTML = `
            <div class="publication-title">${pub.title}</div>
            <div class="publication-authors">${pub.authors}</div>
            <div class="publication-venue">${pub.venue}${volumeInfo}, ${pub.year}</div>
            ${doiLink}
        `;
        
        domesticContainer.appendChild(pubItem);
    });
}

function initSmoothScrolling() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}