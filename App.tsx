import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';
import ChatArea from './components/ChatArea';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [injectedPrompt, setInjectedPrompt] = useState<string>('');

  // Callback to handle topic selection from sidebar to chat
  const handleSelectTopic = (text: string) => {
      setInjectedPrompt(text);
      // Reset after a brief moment so it can be triggered again if needed, 
      // though ChatArea handles the prop change effect.
      setTimeout(() => setInjectedPrompt(''), 100); 
      if (window.innerWidth < 768) {
          setIsMobileMenuOpen(false);
      }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
      
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-slate-800 text-white rounded-md shadow-lg"
        >
            {isMobileMenuOpen ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* Left Sidebar (Responsive) */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarLeft onSelectTopic={handleSelectTopic} />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content - Chat */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-white">
        {/* Header visible mostly on mobile or as a placeholder */}
        <div className="h-14 border-b border-slate-200 flex items-center justify-center md:hidden bg-white">
            <span className="font-semibold text-slate-800">LingoFlow AI</span>
        </div>
        
        <div className="flex-1 h-full overflow-hidden">
            <ChatArea initialPrompt={injectedPrompt} />
        </div>
      </main>

      {/* Right Sidebar (News) - Hidden on smaller screens */}
      <SidebarRight />

    </div>
  );
};

export default App;