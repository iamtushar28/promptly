import Image from "next/image";
import Greeting from "./components/Greeting";
import PromptSearch from "./components/PromptSearch";
import PromptsSection from "./components/PromptsSection";
import AddPromptModal from "./components/AddPromptModal";
import ViewPromptModal from "./components/ViewPromptModal";

export default function Home() {
  return (
    <>

      <section className="min-h-screen h-auto w-full p-4 md:p-6 pb-10 mt-16 bg-gray-50/40 flex flex-col gap-6">

        {/* Greeting screen section */}
        <Greeting />

        {/* prompts filter section */}
        <PromptSearch />

        {/* all prompts section */}
        <PromptsSection />

      </section>

      {/* add new prompt modal */}
      <AddPromptModal />

      {/* view prompt modal */}
      <ViewPromptModal />

    </>
  );
}
