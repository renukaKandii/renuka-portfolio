import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Credentials from './components/Credentials';
import ScheduleCall from './components/ScheduleCall';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AskRenuka, {
  ASK_OPEN_EVENT,
  ASK_PRESET_EVENT,
  ASK_STARTERS_EVENT,
  AskLauncher,
  AskProvider,
  AskRenukaOverlay,
} from './components/AskRenuka';

function Site() {
  // The floating launcher + nav + project cards open the assistant as an
  // overlay from anywhere; the hero and the Ask Kandi section host it
  // inline too. History is shared via AskProvider so it persists while
  // visitors navigate.
  const [askOpen, setAskOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setAskOpen(true);
    window.addEventListener(ASK_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASK_OPEN_EVENT, onOpen);
  }, []);

  const openAssistant = () => {
    setAskOpen(true);
    window.dispatchEvent(new CustomEvent<null>(ASK_STARTERS_EVENT, { detail: null }));
  };

  const openAndAsk = (question: string | null, starters?: string[]) => {
    setAskOpen(true);
    if (starters) {
      window.dispatchEvent(new CustomEvent<string[]>(ASK_STARTERS_EVENT, { detail: starters }));
    }
    if (question) {
      window.setTimeout(() => {
        window.dispatchEvent(new CustomEvent<string>(ASK_PRESET_EVENT, { detail: question }));
      }, 80);
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav onAsk={openAssistant} />
      <main id="main">
        <Hero onAsk={openAssistant} />
        <Experience />
        <Projects onAskQuestion={openAndAsk} />
        <Skills />
        <Credentials />
        <AskRenuka />
        <ScheduleCall />
        <Contact />
      </main>
      <Footer />
      <AskLauncher onOpen={openAssistant} />
      <AskRenukaOverlay open={askOpen} onClose={() => setAskOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <AskProvider>
      <Site />
    </AskProvider>
  );
}
