import CatGif from "../CatGif";
import Footer from "../Footer";
import Navbar from "../Navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container max-w-xl min-h-[calc(100vh-136px)] mx-auto px-4">
        <CatGif />
        {children}
      </main>
      <Footer />
    </>
  );
};
