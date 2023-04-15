import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BaseTemplate = ({ children }: any) => (
  <div>
    <header>
      <Header />
    </header>
    <main className="flex-grow">{children}</main>{" "}
    <footer>
      <Footer />
    </footer>
  </div>
);

export default BaseTemplate;
