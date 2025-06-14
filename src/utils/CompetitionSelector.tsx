
// CompetitionSelector.tsx
import { useGetList, useGetOne, useUpdate } from "react-admin";
import { useCompetition } from "./CompetitionContext";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export const CompetitionSelector = () => {
  const { data: myConf, isLoading: loadingConf } = useGetOne("configuration", {
    id: "1",
  });
  const { data, isLoading } = useGetList("competitions");
  const { competitionId, setCompetitionId } = useCompetition();

  const [update] = useUpdate(); // mutation RA

  if (isLoading) return null;
  if (loadingConf) {
    return null;
  } else {
    setCompetitionId(myConf.competitionId);
  }
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = Number(e.target.value);

    setCompetitionId(selectedId); // met à jour le contexte

    update(
      "configuration",
      { id: 1, data: { competitionId: selectedId }, previousData: myConf },
      {
        onSuccess: () => {
          console.log("Compétition mise à jour !");
        },
        onError: (error) => {
          console.error("Erreur de mise à jour : ", error);
        },
      },
    );
  };

  return (
    <Box sx={{ minWidth: 200, marginLeft: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="competition-select-label">Sélectionner la compétition pour laquelle sera paramétrée l'application</InputLabel>
        <Select
          labelId="competition-select-label"
          value={competitionId ?? myConf?.competitionId ?? ""}
          label="Compétition"
          onChange={handleChange}
        >
          <MenuItem value="">-- Aucune --</MenuItem>
          {data?.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.annee} - {c.lieu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
