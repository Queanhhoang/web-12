import Header from "@/components/header";


export default function ProfileLayout({ children }) {
    return (
      <section>
          <Header/>
          {children}
      </section>
    );
  }
  