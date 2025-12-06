// js/checklist.js - Checklist functionality

document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const progressFill = document.getElementById('progressFill');
    const completedCount = document.getElementById('completedCount');
    const totalCount = document.getElementById('totalCount');
    const saveBtn = document.getElementById('saveBtn');
    const completionMessage = document.getElementById('completionMessage');
    const form = document.getElementById('checklistForm');
    
    const totalItems = checkboxes.length;
    totalCount.textContent = totalItems;
    
    // Load saved progress from localStorage
    loadProgress();
    
    // Update progress function
    function updateProgress() {
        const checked = document.querySelectorAll('.checklist-checkbox:checked').length;
        const percentage = (checked / totalItems) * 100;
        
        progressFill.style.width = percentage + '%';
        completedCount.textContent = checked;
        
        // Save to localStorage
        saveProgress();
        
        // Show completion message if all checked
        if (checked === totalItems) {
            completionMessage.classList.add('show');
            saveBtn.style.display = 'none';
        } else {
            completionMessage.classList.remove('show');
            saveBtn.style.display = 'inline-flex';
        }
    }
    
    // Save progress to localStorage
    function saveProgress() {
        const progress = {};
        checkboxes.forEach((checkbox, index) => {
            progress[`item${index + 1}`] = checkbox.checked;
        });
        localStorage.setItem('checklistProgress', JSON.stringify(progress));
    }
    
    // Load progress from localStorage
    function loadProgress() {
        const saved = localStorage.getItem('checklistProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            checkboxes.forEach((checkbox, index) => {
                const itemKey = `item${index + 1}`;
                if (progress[itemKey]) {
                    checkbox.checked = true;
                }
            });
        }
        updateProgress();
    }
    
    // Add event listeners to checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateProgress();
            
            // Add animation effect
            const label = this.nextElementSibling;
            label.style.transform = 'scale(0.98)';
            setTimeout(() => {
                label.style.transform = '';
            }, 200);
        });
    });
    
    // Save button click handler
    saveBtn.addEventListener('click', function() {
        saveProgress();
        
        // Visual feedback
        this.innerHTML = '<i class="fas fa-check"></i> Guardado';
        this.style.background = 'var(--success)';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-save"></i> Guardar Progreso';
            this.style.background = 'var(--primary)';
        }, 2000);
    });
    
    // Prevent form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
    
    // Add smooth scroll animation for items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
            }
        });
    }, observerOptions);
    
    // Initialize items with animation
    document.querySelectorAll('.checklist-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(item);
    });
});

