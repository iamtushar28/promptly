import Greeting from "./components/Greeting";
import PromptSearch from "./components/PromptSearch";
import PromptsSection from "./components/PromptsSection";
import AddPromptModal from "./components/AddPromptModal";
import ViewPromptModal from "./components/ViewPromptModal";
import EditPromptModal from "./components/EditPromptModal";

export default function Home() {
  return (
    <>

      {/* ================= Main Content ================= */}
      <section className="mt-16 flex min-h-screen w-full flex-col gap-6 bg-gray-50/40 p-4 pb-10 transition-colors duration-300 dark:bg-zinc-950 md:p-6">

        {/* ================= Greeting Section ================= */}
        <Greeting />

        {/* ================= Search & Filter Section ================= */}
        <PromptSearch />

        {/* ================= Prompts Section ================= */}
        <PromptsSection />

      </section>

      {/* ================= Add Prompt Modal ================= */}
      <AddPromptModal />

      {/* ================= Edit Prompt Modal ================= */}
      <EditPromptModal />

      {/* ================= View Prompt Modal ================= */}
      <ViewPromptModal />

    </>
  );
}