import { Header } from './components/Header';
import { ScrollVideo } from './components/ScrollVideo';
import { MomentsSection } from './components/MomentsSection';
import { CardShowcase } from './components/CardShowcase';
import { EcosystemSection } from './components/EcosystemSection';
import { BoomerangVideoSection } from './components/BoomerangVideoSection';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="nu-app">
      <Header />
      <main>
        <ScrollVideo totalFrames={200} />
        <MomentsSection />
        <CardShowcase />
        <EcosystemSection />
        <BoomerangVideoSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
