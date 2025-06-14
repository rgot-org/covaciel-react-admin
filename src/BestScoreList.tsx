import {
  CircularProgress,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { useMemo, useState } from "react";
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
    />
  );
};

export const BestScoreList = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedVehicules, setSelectedVehicules] = useState<any[]>([]);
  const { competitionId } = useCompetition();
  // const { data: allCourses, isLoading: loadingCourses } = useGetList(
  //   "courses",
  //   {
  //     pagination: { page: 1, perPage: 100 },
  //     sort: { field: "id", order: "ASC" },
  //     filter: { competitionId },
  //   },
  // );
  // console.log(allCourses);
  // const { isLoading, error } = useGetList("score", {
  //   sort: { field: "score", order: "DESC" },
  //   pagination: { page: 1, perPage: 100 },
  // });
  // const { data: grilles } = useGetList("grille_depart", {
  //   pagination: { page: 1, perPage: 1000 },
  // });
  // const usedCourseIds = useMemo(() => {
  //   if (!grilles) return [];
  //   return Array.from(new Set(grilles.map((g) => g.courseId)));
  // }, [grilles]);

  // const availableCourses = useMemo(() => {
  //   if (!allCourses) return [];
  //   return allCourses.filter((course) => !usedCourseIds.includes(course.id));
  // }, [allCourses, usedCourseIds]);

  const handleToggle = (vehicule: any) => {
    setSelectedVehicules((prev) =>
      prev.includes(vehicule)
        ? prev.filter((v) => v !== vehicule)
        : [...prev, vehicule],
    );
  };

  // if (isLoading || loadingCourses) return <CircularProgress />;
  // if (error) return <Typography color="error">Erreur de chargement</Typography>;

  return (
    <Box p={2}>
      {/* <Title title="Classement qualifications" /> */}

      <InfiniteList
        filter={competitionId ? { competitionId } : {}}
        sort={{ field: "classement", order: "ASC" }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={2}
          p={2}
          bgcolor={blue}
        >
          <Typography variant="h6">Course :</Typography>

          <CourseSelectInput 
            value={selectedCourse}
            onChange={setSelectedCourse}
          />

          <CreateGrilleButton
            selectedCourse={selectedCourse}
            selectedVehicules={selectedVehicules}
          />
        </Box>

        <Datagrid bulkActionButtons={false}>
          <CustomCheckboxField
            onToggle={handleToggle}
            selected={selectedVehicules}
          />
          <ReferenceField
            source="vehiculeId"
            reference="vehicules"
            label="Véhicule"
            link={false}
          >
            <FunctionField
              label="Véhicule"
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
                              render={(lycee: any) => (
                                <>
                                  {lycee.nom} - {lycee.academie}
                                  {")"}
                                </>
                              )}
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
            render={(record: any) => (
              <MedalField classement={record.classement} />
            )}
          />
        </Datagrid>
      </InfiniteList>
    </Box>
  );
};
