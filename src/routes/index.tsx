import { createFileRoute } from "@tanstack/react-router";
import { CartProvider } from "@/context/cart";
import { MenuProvider } from "@/context/menu";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { CartBar } from "@/components/CartBar";
import { CartDrawer } from "@/components/CartDrawer";
import { PearlsBackdrop } from "@/components/PearlsBackdrop";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <MenuProvider>
      <CartProvider>
        <div className="relative min-h-screen">
          <PearlsBackdrop />
          <Header />
          <main>
            <Hero />
            <Menu />
            <Reviews />
          </main>
          <Footer />
          <CartBar />
          <CartDrawer />
        </div>
      </CartProvider>
    </MenuProvider>
  );
}
