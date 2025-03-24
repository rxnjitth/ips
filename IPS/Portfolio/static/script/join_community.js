
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("maKw0xiMpSl3fit09");
    
    // Form elements
    const form = document.getElementById('community-form');
    const submitButton = document.getElementById('submit-button');
    const skillsDropdownButton = document.getElementById('skills-dropdown-button');
    const skillsDropdownMenu = document.getElementById('skills-dropdown-menu');
    const skillsDropdownLabel = document.getElementById('skills-dropdown-label');
    const selectedSkillsContainer = document.getElementById('selected-skills');
    const skillsInput = document.getElementById('skills-input');
    const proficientInput = document.getElementById('proficient-input');
    const successMessage = document.getElementById('success-message');
    
    // Skills list
    const skillsList = [
        "JavaScript", "Frameworks & Libraries", "Databases & APIs", 
        "Mathematics & Algorithms", "Programming (Python & Libraries)", 
        "Model Deployment & Cloud Integration", "Real-Time Operating Systems (RTOS)", 
        "IoT Communication Protocols", "Embedded & Cloud Integration", 
        "Cybersecurity & Data Handling", "3D Modeling Software", 
        "Rendering & Animation", "3D Printing & Simulation", 
        "Robot Operating System (ROS)", "Kinematics & Motion Planning", 
        "Sensor Integration & Actuation", "Visual & Interaction Design", 
        "App Deployment & Performance Optimization"
    ];
    
    // State
    let selectedSkills = [];
    let skillsDropdownOpen = false;
    
    // Populate skills dropdown
    skillsList.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('dropdown-item');
        skillItem.textContent = skill;
        skillItem.addEventListener('click', () => {
            if (!selectedSkills.includes(skill)) {
                selectedSkills.push(skill);
                updateSelectedSkills();
            }
        });
        skillsDropdownMenu.appendChild(skillItem);
    });

    // Toggle dropdown
    skillsDropdownButton.addEventListener('click', () => {
        skillsDropdownOpen = !skillsDropdownOpen;
        skillsDropdownMenu.style.display = skillsDropdownOpen ? 'block' : 'none';
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            skills: selectedSkills.join(', '),
            proficient: proficientInput.value
        };

        try {
            // Send email using EmailJS
            await emailjs.send('service_id', 'template_id', formData);
            successMessage.style.display = 'block';
            form.reset();
            selectedSkills = [];
            updateSelectedSkills();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Update selected skills display
    function updateSelectedSkills() {
        selectedSkillsContainer.innerHTML = '';
        skillsInput.value = selectedSkills.join(', ');
        
        selectedSkills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.classList.add('skill-tag');
            skillTag.textContent = skill;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = '×';
            removeButton.addEventListener('click', () => {
                selectedSkills = selectedSkills.filter(s => s !== skill);
                updateSelectedSkills();
            });
            
            skillTag.appendChild(removeButton);
            selectedSkillsContainer.appendChild(skillTag);
        });
    }
});
