import ButtonListComponent from "@/components/button-list/button-list";
import LayoutComponent from "@/components/layout/layout";

export const metadata = {
  title: "Jumeuc Tchê",
  description: "Painel de gerenciamento"
}

export default function Home() {

  return (
    <LayoutComponent>
      <div className="min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              Painel da JUMEUC
            </h1>
          </div>
          <ButtonListComponent />
        </div>
      </div>
    </LayoutComponent>
  );
}
