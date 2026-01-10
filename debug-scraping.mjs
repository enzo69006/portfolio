
async function testScraping() {
    const appId = "6744340944";
    const url = `https://apps.apple.com/fr/app/unlatch-app/id${appId}`;
    
    console.log("Testing scraping on:", url);
    
    try {
        const htmlRes = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = await htmlRes.text();
        
        // Extract images from source srcset
        const matches = [...html.matchAll(/srcset="([^"]+)"/g)];
        const scrapedScreenshots = new Set();

        console.log(`Found ${matches.length} srcset matches`);

        for (const match of matches) {
            const srcset = match[1];
            // Extract URLs ending in .png, .jpg, .webp
            const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
            
            for (const url of urls) {
                // Filter for likely screenshot URLs (often contain 'Purple' or 'Screen')
                if (url.includes('Purple') || url.includes('Screen') || url.includes('mzstatic')) {
                        // Prefer higher res (usually last in srcset, but here we take what we find)
                        // We want to avoid small icons or other assets
                        if (!url.includes('300x') && !url.includes('favicon')) {
                        scrapedScreenshots.add(url);
                        }
                }
            }
        }
        
        console.log("Scraped Screenshots:", Array.from(scrapedScreenshots));
        
    } catch (e) {
        console.error(e);
    }
}

testScraping();
