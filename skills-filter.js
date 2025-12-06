// ========================================
// SKILLS CATEGORY FILTERING
// ========================================

function initSkillsFilter() {
    // Wait for the skills cloud to be initialized
    setTimeout(() => {
        const filterButtons = document.querySelectorAll('.skill-filter-btn');
        const skillsCloud = document.getElementById('skillsCloud');

        if (!filterButtons.length || !skillsCloud) {
            console.log('Filter buttons or skills cloud not found');
            return;
        }

        // Create a map of skill names to their categories from SKILLS array
        const skillCategories = {};
        if (window.SKILLS && Array.isArray(window.SKILLS)) {
            window.SKILLS.forEach(skill => {
                skillCategories[skill.name.toLowerCase()] = skill.category;
            });
            console.log('Skill categories loaded:', Object.keys(skillCategories).length, 'skills');
        } else {
            console.log('SKILLS array not found');
            return;
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedCategory = button.dataset.category;
                console.log('Selected category:', selectedCategory);

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Get all skill tags (they're created dynamically)
                const skillTags = skillsCloud.querySelectorAll('.skill-tag');
                console.log('Found skill tags:', skillTags.length);

                // Filter skills with smooth animation
                skillTags.forEach(tag => {
                    const skillName = tag.textContent.trim().toLowerCase();
                    const skillCategory = skillCategories[skillName];

                    if (selectedCategory === 'all' || skillCategory === selectedCategory) {
                        // Show skill with fade-in
                        tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        tag.style.display = '';  // Reset display
                        tag.style.opacity = '1';
                        tag.style.visibility = 'visible';
                        tag.style.pointerEvents = 'auto';
                        // Keep the original transform from baseTransform
                        if (tag.dataset.baseTransform) {
                            tag.style.transform = tag.dataset.baseTransform;
                        }
                    } else {
                        // Hide skill with fade-out
                        tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        tag.style.opacity = '0';
                        tag.style.visibility = 'hidden';
                        tag.style.pointerEvents = 'none';
                        // Scale down slightly
                        if (tag.dataset.baseTransform) {
                            tag.style.transform = tag.dataset.baseTransform + ' scale(0.3)';
                        }
                    }
                });

                console.log(`Filtered to category: ${selectedCategory}`);
            });
        });

        console.log('Skills filter initialized successfully');
    }, 1500); // Wait 1.5 seconds for skills cloud to be ready
}

// Initialize skills filter when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkillsFilter);
} else {
    initSkillsFilter();
}
