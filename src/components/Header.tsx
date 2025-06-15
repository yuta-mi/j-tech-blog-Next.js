import { Title } from "./Title";

export const Header = () => {
  return (
    <header className="bg-black border-b-2 border-indigo-500/30 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Title />
        <nav className="hidden md:flex space-x-6">
        </nav>
      </div>
    </header>
  );
};