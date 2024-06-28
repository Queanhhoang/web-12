import Header from "@/components/header";
import Footer from "@/components/footer";


export default function CategoryLayout({ children }) {
    return (
      <section>
          <Header/>
          {children}
          <Footer/>
      </section>
           
        
    );
  }