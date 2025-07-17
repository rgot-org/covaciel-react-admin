import {
  CircularProgress,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  FunctionField,
  ReferenceField,
  Button,
  Title,
  useDataProvider,
  useGetList,
  useNotify,
  useRedirect,
  useListContext,
  SelectInput,
  TopToolbar,
  InfiniteList,
  ListBase,
  Pagination,
  useRefresh,
} from "react-admin";

// Affiche une médaille selon le classement
const MedalField = ({ classement }: { classement: number }) => {
  if (classement === 1) return "🥇";
  if (classement === 2) return "🥈";
  if (classement === 3) return "🥉";
  return classement.toString(); // Sinon afficher juste le chiffre
};
import { Checkbox } from "@mui/material";
import { useRecordContext } from "react-admin";
import { CreateGrilleButton } from "./utils/CreateGrilleButton";
import { blue } from "@mui/material/colors";
import { CourseSelectInput } from "./utils/CourseSelectInput";
import { useCompetition } from "./utils/CompetitionContext";

export const CustomCheckboxField = ({ onToggle, selected }: any) => {
  const record = useRecordContext();
  if (!record) return null;

  const isChecked = selected.includes(record);

  return (
    <Checkbox
      checked={isChecked}
      onChange={() => onToggle(record)}
      inputProps={{ "aria-label": "select vehicule" }}
      sx={{
        color: "#321479",
        transform: "scale(1.5)", // Agrandit visuellement la case
        "& .MuiSvgIcon-root": {
          fontSize: 28, // Taille de l'icône cochée
          color: "#321479",
        },
      }}
    />
  );
};

// export const BestScoreList = () => {
//   const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
//   const [selectedVehicules, setSelectedVehicules] = useState<any[]>([]);
//   const { competitionId } = useCompetition();

//   const handleToggle = (vehicule: any) => {
//     setSelectedVehicules((prev) =>
//       prev.includes(vehicule)
//         ? prev.filter((v) => v !== vehicule)
//         : [...prev, vehicule],
//     );
//   };

//   return (
//     <Box p={2}>
//       {/* <Title title="Classement qualifications" /> */}
//       <Box
//         display="flex"
//         alignItems="center"
//         gap={2}
//         mb={2}
//         p={2}
//       >
//         <Typography>Course :</Typography>

//         <CourseSelectInput
//           value={selectedCourse}
//           onChange={setSelectedCourse}
//         />

//         <CreateGrilleButton
//           selectedCourse={selectedCourse}
//           selectedVehicules={selectedVehicules}
//         />
//       </Box>
//       <ListBase
//         filter={competitionId ? { competitionId } : {}}
//         sort={{ field: "classement", order: "ASC" }}
//       >
//         <Datagrid
//           bulkActionButtons={false}
//           rowStyle={(record, index) => ({
//             backgroundColor: index % 2 === 0 ? "#D7BBF5" : "#EDE4FF", // bleu clair / rose clair
//           })}
//         >
//           <CustomCheckboxField
//             onToggle={handleToggle}
//             selected={selectedVehicules}
//           />
//           <ReferenceField
//             source="vehiculeId"
//             reference="vehicules"
//             label="Num."
//             link={false}
//           >
//             <TextField
//               source="numero"
//               sx={{
//                 textTransform: "uppercase",
//                 color: "#321479",
//                 fontWeight: 600,
//               }}
//             />
//           </ReferenceField>
//           <ReferenceField
//             source="vehiculeId"
//             reference="vehicules"
//             label="Véhicule"
//             link={false}
//           >
//             <FunctionField
//               label="Véhicule"
//               sx={{
//                 textTransform: "uppercase",
//                 color: "#321479",
//                 fontWeight: 600,
//               }}
//               render={(vehicule: any) => (
//                 <span>
//                   {vehicule.nom}
//                   <ReferenceField
//                     source="equipeId"
//                     reference="equipes"
//                     link={false}
//                   >
//                     <FunctionField
//                       render={(equipe: any) => (
//                         <>
//                           {" ("}
//                           {equipe.nom}
//                           {" / "}
//                           <ReferenceField
//                             source="lyceeId"
//                             reference="lycees"
//                             link={false}
//                           >
//                             <FunctionField
//                               render={(lycee: any) => (
//                                 <>
//                                   {lycee.nom} - {lycee.academie}
//                                   {")"}
//                                 </>
//                               )}
//                             />
//                           </ReferenceField>
//                         </>
//                       )}
//                     />
//                   </ReferenceField>
//                 </span>
//               )}
//             />
//           </ReferenceField>
//           <NumberField
//             source="seanceId"
//             label="Qualif n°"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <NumberField
//             source="reussite"
//             label="Réussite (%)"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <NumberField
//             source="duree_secondes"
//             label="Temps (s)"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <NumberField
//             source="score"
//             label="Score"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <FunctionField
//             label="Classement"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//             render={(record: any) => (
//               <MedalField classement={record.classement} />
//             )}
//           />
//         </Datagrid>
//       </ListBase>
//     </Box>
//   );
// };

// import { useEffect } from "react";
// import { useDataProvider } from "react-admin";

// export const BestScoreList = () => {
//   const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
//   const [selectedVehicules, setSelectedVehicules] = useState<any[]>([]);
//   const dataProvider = useDataProvider();
//   const { competitionId } = useCompetition();

//   useEffect(() => {
//     if (!selectedCourse) return;

//     // Charger les véhicules existants dans la grille pour la course sélectionnée
//     dataProvider
//       .getList("grille_depart", {
//         filter: { courseId: selectedCourse },
//         pagination: { page: 1, perPage: 100 },
//         sort: { field: "id", order: "ASC" },
//       })
//       .then(({ data }) => {
//         const vehiculesInGrille = data.map((entry) => entry.vehiculeId);
//         setSelectedVehicules(vehiculesInGrille);
//       })
//       .catch(() => {
//         // Si erreur (grille inexistante), on ne coche rien
//         setSelectedVehicules([]);
//       });
//   }, [selectedCourse, dataProvider]);

//   const handleToggle = (vehicule: any) => {
//     setSelectedVehicules((prev) =>
//       prev.includes(vehicule)
//         ? prev.filter((v) => v !== vehicule)
//         : [...prev, vehicule]
//     );
//   };

//   return (
//     <Box p={2}>
//       <Box display="flex" alignItems="center" gap={2} mb={2} p={2}>
//         <Typography>Course :</Typography>
//         <CourseSelectInput
//           value={selectedCourse}
//           onChange={setSelectedCourse}
//         />
//         <CreateGrilleButton
//           selectedCourse={selectedCourse}
//           selectedVehicules={selectedVehicules}
//         />
//       </Box>

//       <ListBase
//         filter={competitionId ? { competitionId } : {}}
//         sort={{ field: "classement", order: "ASC" }}
//       >
//         <Datagrid
//           bulkActionButtons={false}
//           rowStyle={(record, index) => ({
//             backgroundColor: index % 2 === 0 ? "#D7BBF5" : "#EDE4FF",
//           })}
//         >
//           <CustomCheckboxField
//             onToggle={handleToggle}
//             selected={selectedVehicules}
//           />
//                     <ReferenceField
//             source="vehiculeId"
//             reference="vehicules"
//             label="Num."
//             link={false}
//           >
//             <TextField
//               source="numero"
//               sx={{
//                 textTransform: "uppercase",
//                 color: "#321479",
//                 fontWeight: 600,
//               }}
//             />
//           </ReferenceField>
//           <ReferenceField
//             source="vehiculeId"
//             reference="vehicules"
//             label="Véhicule"
//             link={false}
//           >
//             <FunctionField
//               label="Véhicule"
//               sx={{
//                 textTransform: "uppercase",
//                 color: "#321479",
//                 fontWeight: 600,
//               }}
//               render={(vehicule: any) => (
//                 <span>
//                   {vehicule.nom}
//                   <ReferenceField
//                     source="equipeId"
//                     reference="equipes"
//                     link={false}
//                   >
//                     <FunctionField
//                       render={(equipe: any) => (
//                         <>
//                           {" ("}
//                           {equipe.nom}
//                           {" / "}
//                           <ReferenceField
//                             source="lyceeId"
//                             reference="lycees"
//                             link={false}
//                           >
//                             <FunctionField
//                               render={(lycee: any) => (
//                                 <>
//                                   {lycee.nom} - {lycee.academie}
//                                   {")"}
//                                 </>
//                               )}
//                             />
//                           </ReferenceField>
//                         </>
//                       )}
//                     />
//                   </ReferenceField>
//                 </span>
//               )}
//             />
//           </ReferenceField>
//           <NumberField
//             source="seanceId"
//             label="Qualif n°"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <NumberField
//             source="reussite"
//             label="Réussite (%)"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <NumberField
//             source="duree_secondes"
//             label="Temps (s)"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <NumberField
//             source="score"
//             label="Score"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//           />
//           <FunctionField
//             label="Classement"
//             sx={{
//               textTransform: "uppercase",
//               color: "#321479",
//               fontWeight: 600,
//             }}
//             render={(record: any) => (
//               <MedalField classement={record.classement} />
//             )}
//           />
//         </Datagrid>
//       </ListBase>
//     </Box>
//   );
// };

// export default function BestScoreList() {
//   const notify = useNotify();

//   const [courseId, setCourseId] = useState<number | null>(null);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);

//   // 1. Charger la liste des courses pour le <Select>
//   const { data: courses } = useGetList("courses", {
//     pagination: { page: 1, perPage: 100 },
//     sort: { field: "annee", order: "DESC" },
//   });

//   // 2. Charger les véhicules
//   const { data: vehicules = [] } = useGetList("vehicules", {
//     filter: courseId ? { courseId } : {},
//     pagination: { page: 1, perPage: 100 },
//     sort: { field: "numero", order: "ASC" },
//   });

//   // 3. Charger la grille de départ pour cette course
//   const { data: grille = [] } = useGetList("grille_depart", {
//     filter: courseId ? { courseId } : {},
//     pagination: { page: 1, perPage: 100 },
//     sort: { field: "id", order: "ASC" },
//   });

//   // 4. Mettre à jour les cases cochées dès que la grille change
//   useEffect(() => {
//     const ids = grille.map((entry) => entry.vehiculeId);
//     setSelectedIds(ids);
//   }, [grille]);

//   const toggleSelection = (vehiculeId: number) => {
//     setSelectedIds((prev) =>
//       prev.includes(vehiculeId)
//         ? prev.filter((id) => id !== vehiculeId)
//         : [...prev, vehiculeId]
//     );
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h5" gutterBottom>
//         Grille de départ – sélection par course
//       </Typography>

//       <FormControl sx={{ mb: 2, minWidth: 240 }}>
//         <InputLabel>Choisir une course</InputLabel>
//         <Select
//           value={courseId ?? ""}
//           label="Choisir une course"
//           onChange={(e) => setCourseId(Number(e.target.value))}
//         >
//           {courses?.map((course) => (
//             <MenuItem key={course.id} value={course.id}>
//               {course.annee} – {course.lieu}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {courseId && (
//         <Datagrid data={vehicules} bulkActionButtons={false}>
//           <CheckboxField
//             selectedIds={selectedIds}
//             toggleSelection={toggleSelection}
//           />
//           <TextField source="numero" label="Numéro" />
//           <TextField source="nom" label="Nom" />
//         </Datagrid>
//       )}
//     </Box>
//   );
// }

// Composant pour afficher la case à cocher
const CheckboxField = ({
  selectedIds,
  toggleSelection,
}: {
  selectedIds: number[];
  toggleSelection: (id: number) => void;
}) => {
  const record = useRecordContext();
  if (!record) return null;
  const checked = selectedIds.includes(record.id);
  return (
    <Checkbox
      checked={checked}
      onChange={() => toggleSelection(record.id)}
      sx={{ "&.Mui-checked": { color: "#6C5DD3" } }}
    />
  );
};

export const BestScoreList = () => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedVehicules, setSelectedVehicules] = useState<any[]>([]);
  const { competitionId } = useCompetition();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 10000); // 10 000 ms = 10 secondes

    return () => clearInterval(interval); // Nettoyage à la sortie
  }, [refresh]);
  
  const {
    data: seances,
    isLoading,
    error,
  } = useGetList("seance_qualif", {
    sort: { field: "seanceId", order: "ASC" },
  });
  // Charger les véhicules déjà dans la grille pour la course sélectionnée
  useEffect(() => {
    if (!selectedCourse) return;

    dataProvider
      .getList("grille_depart", {
        filter: { courseId: selectedCourse },
        pagination: { page: 1, perPage: 100 },
        sort: { field: "position_depart", order: "ASC" },
      })
      .then(({ data }) => {
        const vehicules = data.map((item: any) => ({
          vehiculeId: item.vehiculeId,
        }));
        setSelectedVehicules(vehicules);
      })
      .catch(() => setSelectedVehicules([]));
  }, [selectedCourse]);

  const handleToggle = (record: any) => {
    setSelectedVehicules((prev) =>
      prev.some((v) => v.vehiculeId === record.vehiculeId)
        ? prev.filter((v) => v.vehiculeId !== record.vehiculeId)
        : [...prev, { vehiculeId: record.vehiculeId }]
    );
  };

  const handleCreateGrille = async () => {
    if (!selectedCourse) return;

    try {
      // Supprimer grille existante pour cette course
      const existing = await dataProvider.getList("grille_depart", {
        filter: { courseId: selectedCourse },
        pagination: { page: 1, perPage: 100 },
        sort: { field: "position_depart", order: "ASC" },
      });

      await Promise.all(
        existing.data.map((item: any) =>
          dataProvider.delete("grille_depart", { id: item.id })
        )
      );

      // Recréer la grille
      await Promise.all(
        selectedVehicules.map((v, index) =>
          dataProvider.create("grille_depart", {
            data: {
              courseId: selectedCourse,
              vehiculeId: v.vehiculeId,
              position_depart: index + 1,
            },
          })
        )
      );

      alert("Grille créée avec succès !");
    } catch (error) {
      console.error("Erreur création grille :", error);
      alert("Erreur lors de la création de la grille.");
    }
  };

  const CustomCheckboxField = () => {
    const  record  = useRecordContext(); // ✅ récupère automatiquement le record du Datagrid
    const isChecked = selectedVehicules.some(
      (v) => v.vehiculeId === record?.vehiculeId
    );
  
    if (!record) return null;
  
    return (
      <Checkbox
        checked={isChecked}
        onChange={() => handleToggle(record)}
        sx={{
          color: "#321479",
          transform: "scale(1.2)", // Agrandit visuellement la case
          "& .MuiSvgIcon-root": {
            fontSize: 24, // Taille de l'icône cochée
            color: "#321479",
          },
        }}
      />
    );
  };
  return (
    <Box px={2}>
      <Box display="flex" alignItems="center" gap={2} mb={1} p={0}>
        <Typography>Course :</Typography>
        <CourseSelectInput value={selectedCourse} onChange={setSelectedCourse} />
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedCourse}
          onClick={handleCreateGrille}
        >
          Créer la grille de départ
        </Button>
      </Box>

      <ListBase perPage={25}  
      // <InfiniteList
        resource="best_score"
        filter={competitionId ? { competitionId } : {}}
        sort={{ field: "classement", order: "ASC" }}
      >
        {/* <Pagination /> */}
        {isSmall ? (
        <Datagrid
          bulkActionButtons={false}
          rowStyle={(_, i) => ({
            backgroundColor: i % 2 === 0 ? "#D7BBF5" : "#EDE4FF",
          })}
        >
          <CustomCheckboxField />

          <ReferenceField
            source="vehiculeId"
            reference="vehicules"
            label="#"
            link={false}
          >
            <TextField source="numero" />
          </ReferenceField>
{/* 
          <ReferenceField
            source="vehiculeId"
            reference="vehicules"
            label="Véhicule"
            link={false}
          >
            
          </ReferenceField> */}

          {/* <NumberField source="seanceId" label="Q." /> */}
          {/* <NumberField source="reussite" label="R. (%)" />
          <NumberField source="duree_secondes" label="T. (s)" /> */}
          <NumberField source="score" label="Score" />
          <FunctionField
  label="Clas."
  render={(record: any) =>
    record ? <MedalField classement={record.classement} /> : null
  }
/>

        </Datagrid>
        ) : (
          <Datagrid
          bulkActionButtons={false}
          rowStyle={(_, i) => ({
            backgroundColor: i % 2 === 0 ? "#D7BBF5" : "#EDE4FF",
          })}
        >
          <CustomCheckboxField />

          <ReferenceField
            source="vehiculeId"
            reference="vehicules"
            label="Num."
            link={false}
          >
            <TextField source="numero" />
          </ReferenceField>

          <ReferenceField
            source="vehiculeId"
            reference="vehicules"
            label="Véhicule"
            link={false}
          >
            <FunctionField
              render={(vehicule: any) => (
                <span>
                  {vehicule.nom}
                  <ReferenceField
                    source="equipeId"
                    reference="equipes"
                    link={false}
                  >
                    <FunctionField
                      render={(equipe: any) => (
                        <>
                          {" ("}
                          {equipe.nom}
                          {" / "}
                          <ReferenceField
                            source="lyceeId"
                            reference="lycees"
                            link={false}
                          >
                            <FunctionField
                              render={(lycee: any) =>
                                `${lycee.nom} - ${lycee.academie})`
                              }
                            />
                          </ReferenceField>
                        </>
                      )}
                    />
                  </ReferenceField>
                </span>
              )}
            />
          </ReferenceField>

          <NumberField source="seanceId" label="Qualif n°" />
          <NumberField source="reussite" label="Réussite (%)" />
          <NumberField source="duree_secondes" label="Temps (s)" />
          <NumberField source="score" label="Score" />
          <FunctionField
  label="Classement"
  render={(record: any) =>
    record ? <MedalField classement={record.classement} /> : null
  }
/>

        </Datagrid>
        )}
      </ListBase>
      {/* </InfiniteList> */}
    </Box>
  );
};