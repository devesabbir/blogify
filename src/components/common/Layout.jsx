import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, className }) {
  return (
    <div>
      <Header />
      <main className={className ? className : ""}>{children}</main>
      <Footer />
    </div>
  );
}
