import { getCodeurReviews } from "@/lib/codeur";
import HomePage from "./HomePage";

export const metadata = {
  title: "Syntaax | Agence Digitale Créative",
  description: "Agence de développement web et mobile sur mesure. Nous transformons vos idées en expériences digitales exceptionnelles.",
};

export default async function Page() {
  const reviews = await getCodeurReviews();
  
  return <HomePage reviews={reviews} />;
}
