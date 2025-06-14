// CreateGrilleButton.tsx
import {
  useListContext,
  useNotify,
  useRedirect,
  useDataProvider,
  useUnselectAll,
  Button,
} from "react-admin";
import { useState } from "react";
import { data, Navigate, useNavigate } from 'react-router-dom';
export const CreateGrilleButton = ({
  selectedCourse,
  selectedVehicules,
}: Props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();
  const unselectAll = useUnselectAll();
  const [loading, setLoading] = useState(false);

  const handleCreateGrille = async () => {
    if (!selectedCourse) {
      notify("Veuillez sélectionner une course", { type: "warning" });
      return;
    }

    try {
      setLoading(true);
      const selectedVehiculeRecords = selectedVehicules;

      const sortedVehicules = selectedVehiculeRecords.sort(
        (a, b) => b.score - a.score,
      );

      for (let i = 0; i < sortedVehicules.length; i++) {
        await dataProvider.create("grille_depart", {
          data: {
            courseId: selectedCourse,
            vehiculeId: sortedVehicules[i].vehiculeId,
            position_depart: i + 1,
          },
        });
      }

      notify("Grille de départ créée avec succès", { type: "success" });
      unselectAll("score");
      // redirect("/grille_depart");
      redirect("list","/grille_depart",selectedCourse,{},{record:{courseId:selectedCourse}});
      //Navigate("/grille_depart", { state: { selectedCourseId: courseId } });
    } catch (error) {
      console.error(error);
      notify("Erreur lors de la création de la grille", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      label="Créer la grille de départ"
      onClick={handleCreateGrille}
      disabled={loading || !selectedVehicules.length || !selectedCourse}
    />
  );
};
