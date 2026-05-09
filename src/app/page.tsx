import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import OrbitalCategories from "@/components/home/OrbitalCategories";
import PrimeCustomers from "@/components/home/PrimeCustomers";

export default function Home() {
  return (
    <>
      <Hero />
      <OrbitalCategories />
      <PrimeCustomers />
      <CategoryGrid />
    </>
  );
}
