// Page initialization functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // We've removed theme toggling since we only use dark theme now
    // Hiding the toggle button since it's no longer needed
    if (themeToggleBtn) {
        themeToggleBtn.style.display = 'none';
    }

    // Listen for Tally.so form submission messages
    window.addEventListener('message', function(e) {
        if (e.data.type === 'tally-form:loaded') {
            console.log('Tally form loaded');
            
            // Always use dark theme for Tally.so iframe (if possible)
            try {
                const tallyIframe = document.querySelector('.tally-embed-container iframe');
                if (tallyIframe && tallyIframe.contentWindow) {
                    tallyIframe.contentWindow.postMessage({ type: 'tally-theme', theme: 'dark' }, '*');
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
});
