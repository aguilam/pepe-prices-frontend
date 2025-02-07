import { Outlet } from "react-router-dom";
import Header from "../shared/ui/Header/Header";
import Footer from "../shared/ui/Footer/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
