import React from 'react';
import { RolexWatch } from './components/RolexWatch';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black z-0" />
      
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-white/5 blur-3xl rounded-full pointer-events-none z-0" />

      <main className="z-10 flex flex-col items-center gap-8 p-4">
        <RolexWatch />
        
        <div className="text-center space-y-2 opacity-60">
          <h2 className="text-gold-500 font-serif text-sm tracking-[0.2em] text-yellow-500 uppercase">
            Precision Timepiece
          </h2>
          <p className="text-white/50 text-xs font-light tracking-wider">
            BEIJING TIME ZONE (UTC+8)
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;