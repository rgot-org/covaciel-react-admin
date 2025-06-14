// AppLoader.tsx
import { useGetOne } from "react-admin";
import { useCompetition } from "./CompetitionContext";
import { CircularProgress, Box } from "@mui/material";
import { ReactNode, useEffect } from "react";

export const AppLoader = ({ children }: { children: ReactNode }) => {
    console.log("AppLoader mounted");
  const { competitionId,setCompetitionId } = useCompetition();
  const { data, isLoading ,error} = useGetOne("configuration", { id: 1 });

  console.log("AppLoader - data from configuration", data);
  useEffect(() => {
    if (error) console.error("Erreur lors du chargement de la configuration :", error);
    if (data && !competitionId) {
        setCompetitionId(data.competitionId);
        console.log("appLoader="+competitionId);
      }
    }, [data, competitionId, setCompetitionId,error]);

  if (isLoading || !data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return <>{children}</>;
};
