// CreateGrilleButton.tsx
// import {
//   useListContext,
//   useNotify,
//   useRedirect,
//   useDataProvider,
//   useUnselectAll,
//   Button,
// } from "react-admin";
// import { useState } from "react";
// import { data, Navigate, useNavigate } from 'react-router-dom';
// export const CreateGrilleButton = ({
//   selectedCourse,
//   selectedVehicules,
// }: Props) => {
//   const notify = useNotify();
//   const redirect = useRedirect();
//   const dataProvider = useDataProvider();
//   const unselectAll = useUnselectAll();
//   const [loading, setLoading] = useState(false);

//   const handleCreateGrille = async () => {
//     if (!selectedCourse) {
//       notify("Veuillez sélectionner une course", { type: "warning" });
//       return;
//     }

//     try {
//       setLoading(true);
//       const selectedVehiculeRecords = selectedVehicules;

//       const sortedVehicules = selectedVehiculeRecords.sort(
//         (a, b) => b.score - a.score,
//       );

//       for (let i = 0; i < sortedVehicules.length; i++) {
//         await dataProvider.create("grille_depart", {
//           data: {
//             courseId: selectedCourse,
//             vehiculeId: sortedVehicules[i].vehiculeId,
//             position_depart: i + 1,
//           },
//         });
//       }

//       notify("Grille de départ créée avec succès", { type: "success" });
//       unselectAll("score");
//       // redirect("/grille_depart");
//       redirect("list","/grille_depart",selectedCourse,{},{record:{courseId:selectedCourse}});
//       //Navigate("/grille_depart", { state: { selectedCourseId: courseId } });
//     } catch (error) {
//       console.error(error);
//       notify("Erreur lors de la création de la grille", { type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Button
//       label="Créer la grille de départ"
//       onClick={handleCreateGrille}
      
//       disabled={loading || !selectedVehicules.length || !selectedCourse}
//     />
//   );
// };
import { useNotify, useDataProvider } from "react-admin";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";

interface Props {
  selectedCourse: string | null;
  selectedVehicules: string[]; // ou number[], selon le type d'ID
}

export const CreateGrilleButton = ({ selectedCourse, selectedVehicules }: Props) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (!selectedCourse || selectedVehicules.length === 0) {
      notify("Veuillez sélectionner une course et des véhicules.", { type: "warning" });
      return;
    }

    try {
      setLoading(true);

      // Vérifie si une grille existe déjà pour cette course
      const { data: existingGrille } = await dataProvider.getList("grille_depart", {
        filter: { courseId: selectedCourse },
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
      });

      if (existingGrille.length > 0) {
        notify("Une grille existe déjà. Les cases ont été mises à jour.", { type: "info" });
        return;
      }

      // Crée une nouvelle grille en envoyant chaque véhicule
      await Promise.all(
        selectedVehicules.map((vehiculeId, index) =>
          dataProvider.create("grille_depart", {
            data: {
              courseId: selectedCourse,
              vehiculeId: vehiculeId.vehiculeId,
              position_depart: index + 1,
            },
          })
        )
      );

      notify("Grille de départ créée avec succès !", { type: "success" });
    } catch (error) {
      console.error(error);
      notify("Erreur lors de la création de la grille.", { type: "error" });
    } finally {
      setLoading(false);
    }
  }, [selectedCourse, selectedVehicules, dataProvider, notify]);

  return (
    <Button variant="contained" color="primary" onClick={handleClick} disabled={loading}>
      {loading ? "Création..." : "Créer la grille"}
    </Button>
  );
};
