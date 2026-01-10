import { getCodeurReviews } from './src/lib/codeur.js';

console.log("Fetching reviews...");
const reviews = await getCodeurReviews();
console.log("Reviews found:", reviews.length);
if (reviews.length > 0) {
  console.log("First review:", reviews[0]);
} else {
  console.log("No reviews found.");
}
