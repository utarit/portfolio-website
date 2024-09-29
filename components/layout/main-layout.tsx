import CatGif from "../CatGif";
import Footer from "../Footer";
import Navbar from "../Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container max-w-xl mx-auto px-4">
        <CatGif />
        {children}
      </main>
      <Footer />
    </>
  );
};
