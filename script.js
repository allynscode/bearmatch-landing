// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check for saved theme preference or use device preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Listen for device theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
        }
    });

    // Listen for Tally.so form submission messages
    window.addEventListener('message', function(e) {
        if (e.data.type === 'tally-form:loaded') {
            console.log('Tally form loaded');
            
            // Apply theme to Tally.so iframe (if possible)
            try {
                const tallyIframe = document.querySelector('.tally-embed-container iframe');
                if (tallyIframe && tallyIframe.contentWindow) {
                    const theme = document.body.getAttribute('data-theme') || 'light';
                    tallyIframe.contentWindow.postMessage({ type: 'tally-theme', theme: theme }, '*');
                }
            } catch (err) {
                console.log('Could not set Tally theme:', err);
            }
        }
        
        if (e.data.type === 'tally-form:success') {
            console.log('Form submitted successfully');
            
            // Custom success message already handled by Tally
            // But we can add additional animations or effects here if desired
            const card = document.querySelector('.card');
            const container = document.querySelector('.tally-embed-container');
            
            if (card) {
                card.classList.add('form-submitted');
            }
            
            if (container) {
                container.classList.add('tally-success');
                
                // Create a custom success message if the Tally one doesn't appear well
                const launchInfo = document.querySelector('.launch-info');
                if (launchInfo) {
                    // Add a heading before the launch info
                    const successHeading = document.createElement('div');
                    successHeading.classList.add('success-message');
                    successHeading.innerHTML = "<p>We'll notify you when BearMatch launches!</p>";
                    
                    // Insert before launch info
                    launchInfo.parentNode.insertBefore(successHeading, launchInfo);
                }
            }
        }
    });
    
    // Update Tally form theme when our theme changes
    themeToggleBtn.addEventListener('click', () => {
        try {
            const tallyIframe = document.querySelector('.tally-embed-container iframe');
            if (tallyIframe && tallyIframe.contentWindow) {
                const theme = document.body.getAttribute('data-theme') || 'light';
                tallyIframe.contentWindow.postMessage({ type: 'tally-theme', theme: theme }, '*');
            }
        } catch (err) {
            console.log('Could not update Tally theme:', err);
        }
    });
});
