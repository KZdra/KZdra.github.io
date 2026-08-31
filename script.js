/**
 * Interactive functionality for KZdra Profile Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Elements
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const btnShare = document.getElementById('btn-share');
    const btnCopyLink = document.getElementById('btn-copy-link');
    const linkCards = document.querySelectorAll('.link-card');

    let toastTimeout;

    /**
     * Show toast message
     * @param {string} msg
     */
    function showToast(msg) {
        if (!toast) return;
        
        if (toastMessage) {
            toastMessage.textContent = msg;
        }

        clearTimeout(toastTimeout);
        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Copy text to clipboard with fallback
     * @param {string} text
     * @param {string} successMessage
     */
    async function copyToClipboard(text, successMessage) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                showToast(successMessage);
            } else {
                // Fallback for non-https/legacy
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);

                if (successful) {
                    showToast(successMessage);
                } else {
                    showToast('Failed to copy link');
                }
            }
        } catch (err) {
            console.error('Clipboard copy error:', err);
            showToast('Failed to copy link');
        }
    }

    // Share Button Handler
    if (btnShare) {
        btnShare.addEventListener('click', async () => {
            const shareData = {
                title: 'Indra Hardika (@KZdra)',
                text: 'Check out Indra Hardika\'s developer links and portfolio!',
                url: window.location.href
            };

            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        copyToClipboard(window.location.href, 'Link copied to clipboard!');
                    }
                }
            } else {
                copyToClipboard(window.location.href, 'Link copied to clipboard!');
            }
        });
    }

    // Copy Link Button Handler
    if (btnCopyLink) {
        btnCopyLink.addEventListener('click', () => {
            copyToClipboard(window.location.href, 'Profile link copied to clipboard!');
        });
    }

    // Dynamic Spotlight Effect on Cards
    linkCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
