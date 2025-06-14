// CustomAppBar.tsx
// import { AppBar, TitlePortal, useGetList, useGetOne } from "react-admin";
// import { Toolbar, Typography } from "@mui/material";
// import { useCompetition } from "./CompetitionContext";
// export const CustomAppBar = () => {
// const {competitionId}=useCompetition();

//   // Ne lance pas la 2e requête tant que maConfig n’est pas chargée
//   const competitionId = maConfig?.competitionId;
//   const { data, isLoading: loadingComp } = useGetOne(
//     "competitions",
//     {
//       id: competitionId,
//     },
//     {
//       enabled: !!competitionId, // <== évite l'erreur quand undefined
//     },
//   );

//   if (loadingConf || loadingComp || !data) return null;

//   return (
//     <AppBar>
//       <Toolbar sx={{ flex: 1 }}>
//         <Typography variant="h6" component="div" sx={{ flex: 1 }}>
//           CoVACIEL {data.annee} - {data.lieu}
//         </Typography>
//         <TitlePortal variant="h5" sx={{ flex: 1 }} />
//       </Toolbar>
//     </AppBar>
//   );
// };
// import { AppBar, TitlePortal, useGetOne } from "react-admin";
// import { Toolbar, Typography } from "@mui/material";
// import { useCompetition } from "./CompetitionContext";

// export const CustomAppBar = () => {
//   const { competitionId } = useCompetition();
//   const { data, isLoading } = useGetOne("competitions", { id: competitionId }, { enabled: !!competitionId });

//   if (isLoading || !data) return null;

//   return (
//     <AppBar>
//       <Toolbar sx={{ flex: 1 }}>
//         <Typography variant="h6" component="div" sx={{ flex: 1 }}>
//           CoVACIEL {data.annee} - {data.lieu}
//         </Typography>
//         <TitlePortal variant="h5" sx={{ flex: 1 }} />
//       </Toolbar>
//     </AppBar>
//   );
// };

// CustomAppBar.tsx
import {
  AppBar,
  TitlePortal,
  useGetOne,
  useGetOneLegacy,
} from "react-admin";
import { Toolbar, Typography } from "@mui/material";
import { useEffect } from "react";
import { useCompetition } from "./CompetitionContext";

export const CustomAppBar = () => {
  const { competitionId, setCompetitionId } = useCompetition();

  // 1. Si pas encore dans le contexte, on récupère depuis configuration
  const {
    data: config,
    isLoading: loadingConfig,
    error: errorConfig,
  } = useGetOne("configuration", { id: 1 }, {
    enabled: competitionId === null,
  });

  // 2. Stocker le competitionId dans le contexte
  useEffect(() => {
    if (config?.competitionId && !competitionId) {
      setCompetitionId(config.competitionId);
    }
  }, [config, competitionId, setCompetitionId]);

  // 3. Récupérer la compétition uniquement si ID connu
  const {
    data: competition,
    isLoading: loadingCompetition,
    error: errorCompetition,
  } = useGetOne("competitions", { id: competitionId ?? 0 }, {
    enabled: !!competitionId,
  });

  if (loadingConfig || loadingCompetition) return null;

  return (
    <AppBar>
      <Toolbar sx={{ flex: 1 }}>
        <Typography variant="h6" component="div" sx={{ flex: 1 }}>
          CoVACIEL
          {competition && ` — ${competition.annee} - ${competition.lieu}`}
        </Typography>
        <TitlePortal variant="h5" sx={{ flex: 1 }} />
      </Toolbar>
    </AppBar>
  );
};
