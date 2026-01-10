export async function getAppStoreData(appId) {
  if (!appId) return null;

  try {
    const [reviewsRes, detailsRes] = await Promise.all([
      fetch(`https://itunes.apple.com/fr/rss/customerreviews/id=${appId}/sortBy=mostRecent/json`),
      fetch(`https://itunes.apple.com/lookup?id=${appId}&country=fr`)
    ]);

    const reviewsData = await reviewsRes.json();
    const detailsData = await detailsRes.json();

    // Process Reviews
    const reviews = reviewsData.feed?.entry?.slice(1).map(entry => ({
      id: entry.id.label,
      author: entry.author.name.label,
      title: entry.title.label,
      content: entry.content.label,
      rating: parseInt(entry['im:rating'].label),
      version: entry['im:version'].label
    })) || [];

    // Process Screenshots
    const result = detailsData.results?.[0];
    let screenshots = result?.screenshotUrls || [];
    let ipadScreenshots = result?.ipadScreenshotUrls || [];
    
    // Prefer iPad screenshots for tablet apps like VitalX if available and numerous, otherwise phone
    let allScreenshots = [...screenshots, ...ipadScreenshots];

    // Fallback: Scrape HTML if API returns no screenshots (common issue for some apps like Unlatch)
    if (allScreenshots.length === 0 && result?.trackViewUrl) {
        try {
            console.log("No screenshots from API, attempting to scrape HTML...", result.trackViewUrl);
            const htmlRes = await fetch(result.trackViewUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            const html = await htmlRes.text();
            
            // Extract images from source srcset
            const matches = [...html.matchAll(/srcset="([^"]+)"/g)];
            const scrapedScreenshots = new Set();

            for (const match of matches) {
                const srcset = match[1];
                // Extract URLs ending in .png, .jpg, .webp
                const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
                
                for (const url of urls) {
                    // Filter for likely screenshot URLs (often contain 'Purple' or 'Screen')
                    if (url.includes('Purple') || url.includes('Screen') || url.includes('mzstatic')) {
                         // Prefer higher res (usually last in srcset, but here we take what we find)
                         // We want to avoid small icons or other assets
                         if (!url.includes('300x') && !url.includes('favicon') && !url.includes('AppIcon')) {
                            // Try to avoid very small thumbnails if possible
                            if (!url.includes('157x') && !url.includes('230x')) {
                                scrapedScreenshots.add(url);
                            }
                         }
                    }
                }
            }
            
            if (scrapedScreenshots.size > 0) {
                allScreenshots = Array.from(scrapedScreenshots).slice(0, 10); // Limit to 10
                console.log(`Scraped ${allScreenshots.length} screenshots`);
            }
        } catch (scrapeError) {
            console.error("Error scraping screenshots:", scrapeError);
        }
    }

    return {
      reviews,
      screenshots: allScreenshots,
      averageRating: result?.averageUserRating,
      ratingCount: result?.userRatingCount,
      // Metadata
      icon: result?.artworkUrl512 || result?.artworkUrl100,
      name: result?.trackName,
      seller: result?.sellerName,
      description: result?.description,
      price: result?.formattedPrice,
      version: result?.version,
      releaseNotes: result?.releaseNotes,
      updated: result?.currentVersionReleaseDate,
      size: result?.fileSizeBytes,
      genres: result?.genres,
      rating: result?.contentAdvisoryRating,
      compatibility: result?.minimumOsVersion,
      url: result?.trackViewUrl
    };

  } catch (error) {
    console.error("Error fetching App Store data:", error);
    return null;
  }
}
