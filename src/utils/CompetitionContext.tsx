// // CompetitionContext.tsx
// import { createContext, useContext, useState, ReactNode } from "react";

// interface CompetitionContextType {
//   competitionId: number | null;
//   setCompetitionId: (id: number | null) => void;
// }

// const CompetitionContext = createContext<CompetitionContextType | undefined>(undefined);

// export const CompetitionProvider = ({ children }: { children: ReactNode }) => {
//   const [competitionId, setCompetitionId] = useState<number | null>(null);
//   return (
//     <CompetitionContext.Provider value={{ competitionId, setCompetitionId }}>
//       {children}
//     </CompetitionContext.Provider>
//   );
// };

// export const useCompetition = () => {
//   const context = useContext(CompetitionContext);
//   if (!context) throw new Error("useCompetition must be used within a CompetitionProvider");
//   return context;
// };

// CompetitionContext.tsx
import { createContext, useContext, useState } from "react";

export const CompetitionContext = createContext({
  competitionId: null,
  setCompetitionId: (id: number | null) => {},
});

export const useCompetition = () => useContext(CompetitionContext);

export const CompetitionProvider = ({ children }) => {
  const [competitionId, setCompetitionId] = useState<number | null>(null);

  return (
    <CompetitionContext.Provider value={{ competitionId, setCompetitionId }}>
      {children}
    </CompetitionContext.Provider>
  );
};
