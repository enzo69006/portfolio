export async function getCodeurReviews() {
  const PROFILE_URL = "https://www.codeur.com/-enzooo";

  try {
    const response = await fetch(PROFILE_URL, { 
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error("Failed to fetch Codeur profile:", response.statusText);
      return [];
    }

    const html = await response.text();
    const reviews = [];

    // Regex to find review blocks
    // Look for <div class="subcard project_rating" ...> ... </div>
    // We'll split by "subcard project_rating" to get chunks
    const parts = html.split('class="subcard project_rating"');
    
    // Skip the first part (header/before first review)
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      
      // Stop at the next major section if needed, but usually the split works well 
      // as long as we limit the chunk to the footer of the card
      const contentBlock = part.split('<div class="subcard-footer')[0];

      // Extract ID
      const idMatch = contentBlock.match(/id="project_rating_(\d+)"/);
      const id = idMatch ? idMatch[1] : `review-${i}`;

      // Extract Project Title
      const titleMatch = contentBlock.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
      const projectTitle = titleMatch ? titleMatch[1].trim() : "Projet réalisé";

      // Extract Review Content
      // Content is in <div class="subcard-content ..."> ... </div>
      const contentMatch = contentBlock.match(/class="subcard-content[^>]*>([\s\S]*?)<\/div>/);
      let content = "";
      if (contentMatch) {
        // Remove HTML tags from content
        content = contentMatch[1]
          .replace(/<[^>]+>/g, '') // Strip tags
          .replace(/\s+/g, ' ')    // Normalize whitespace
          .trim();
      }

      // Extract Date and Author
      // "Évalué le  2 janvier 2026 par Client #732859 (client)"
      const metaMatch = contentBlock.match(/Évalué le\s+(.*?)\s+par\s+(.*?)\s+(\(|<)/);
      const date = metaMatch ? metaMatch[1].trim() : "";
      const author = metaMatch ? metaMatch[2].trim() : "Client Codeur.com";

      // Count stars (rating)
      // Look for star icon occurrences in the block
      const starCount = (contentBlock.match(/\/assets\/ratings\/star/g) || []).length;
      // Usually there are 5 stars displayed. If the user rated 5, there are 5 stars.
      // Codeur displays all 5 stars but some might be empty/grey? 
      // Looking at the HTML provided: 
      // <img ... src="/assets/ratings/star-f3558f3629ce517a8e046c5b5d2e6e869e25f546b324eb1a5f21ea928498dc18.svg" />
      // All look the same in the snippet. Assuming full stars for now.
      // In the snippet, I see 5 img tags for stars.
      // If a rating is 4/5, maybe one is different?
      // For now, let's assume the count of "star-..." svg corresponds to the rating if they only show filled stars, 
      // or we accept that we might show 5/5 for everyone if we can't distinguish.
      // In the snippet, all 5 seem to be the same "star-f355...".
      // Let's rely on the star count found in the block.
      
      if (content && projectTitle) {
        reviews.push({
          id,
          project: projectTitle,
          content,
          rating: Math.min(starCount, 5), // Cap at 5
          date,
          author,
          authorUrl: null
        });
      }
    }

    return reviews;

  } catch (error) {
    console.error("Error fetching Codeur reviews:", error);
    return [];
  }
}
