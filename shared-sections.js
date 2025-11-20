(function() {
    const sectionIds = ['home', 'team', 'gallery', 'about'];
    if (window.sharedSectionsReady) {
        return;
    }

    window.sharedSectionsReady = new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                const response = await fetch('index.html');
                if (!response.ok) {
                    throw new Error(`Failed to fetch index.html (${response.status})`);
                }

                const htmlText = await response.text();
                const parser = new DOMParser();
                const sharedDoc = parser.parseFromString(htmlText, 'text/html');

                sectionIds.forEach(id => {
                    const sourceSection = sharedDoc.getElementById(id);
                    const targetSection = document.getElementById(id);
                    if (sourceSection && targetSection) {
                        targetSection.innerHTML = sourceSection.innerHTML;
                    }
                });
            } catch (error) {
                console.error('Unable to sync shared sections from index.html', error);
            } finally {
                resolve();
            }
        }, { once: true });
    });
})();
