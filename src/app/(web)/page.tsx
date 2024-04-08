// import { getFeaturedRoom } from "@/libs/apis";
// import FeaturedRoom from "@/components/FeaturedRoom/FeaturedRoom";
import Gallery from "@/components/Gallery/Gallery";
import HeroSection from "@/components/HeroSection/HeroSection";
// import PageSearch from "@/components/PageSearch/PageSearch";

const Home = async () => {
  // const featuredRoom = await getFeaturedRoom();

  return (
    <>
      <HeroSection />

      {/* TODO: Add PageSearch */}
      {/* <PageSearch /> */}

      {/* TODO: Add FeaturedRoom */}
      {/* <FeaturedRoom featuredRoom={featuredRoom} /> */}

      <Gallery />
    </>
  );
};

export default Home;
