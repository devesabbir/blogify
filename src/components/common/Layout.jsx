import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, className }) {
  return (
    <>
      <Header />
      <main className={className}>{children}</main>
      <Footer />
    </>
  );
}
