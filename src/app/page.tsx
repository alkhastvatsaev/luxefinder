import { listSacsSlides } from "@/lib/sacs";
import HomeCoverflow from "@/components/home-coverflow";

export default function HomePage() {
  const bagSlides = listSacsSlides();
  return <HomeCoverflow bagSlides={bagSlides} />;
}
