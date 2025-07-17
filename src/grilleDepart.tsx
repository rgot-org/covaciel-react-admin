// grilleDepart.tsx
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  Edit,
  SimpleForm,
  NumberInput,
  TimeInput,
  Create,
  ReferenceInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  useDataProvider,
  useNotify,
  ListBase,
  Confirm,
} from "react-admin";

import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Typography,
} from "@mui/material";
import { useCompetition } from "./utils/CompetitionContext";
import { CustomToolbar } from "./utils/CustomToolBar";
import { useLocation } from "react-router-dom";
import { CustomTopToolbar } from "./utils/CustomTopToolbar";

export const GrilleDepartList = () => {
  const location = useLocation();
  const courseId = location.state?.record?.courseId || null;
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [open, setOpen] = useState(false);

  const [key, setKey] = useState(0); // pour forcer le re-render
  const { competitionId } = useCompetition();
  const fetchCourses = async () => {
    const { data } = await dataProvider.getList("courses", {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "ASC" },
      filter: { competitionId },
    });
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  const handleClick = () => setOpen(true);
  const handleDialogClose = () => setOpen(false);
  const handleConfirm = () => {
    handleDeleteGrille();
    setOpen(false);
  };
  const handleDeleteGrille = async () => {
    if (!selectedCourseId) return;
    // const confirmed = window.confirm("Supprimer cette grille de départ ?");
    // if (!confirmed) return;
    try {
      const { data } = await dataProvider.getList("grille_depart", {
        filter: { courseId: selectedCourseId },
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "ASC" },
      });

      for (const record of data) {
        await dataProvider.delete("grille_depart", { id: record.id });
      }

      notify("Grille supprimée avec succès", { type: "success" });
      setKey((k) => k + 1); // re-render la liste
    } catch (error) {
      console.error(error);
      notify("Erreur lors de la suppression", { type: "error" });
    }
  };

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" gap={2} mb={2} p={2}>
        <Typography variant="h6">Course :</Typography>
        <FormControl size ="small" sx={{ width: 300, mb: 2 }}>
          <InputLabel>Course</InputLabel>
          <Select
            label="Course"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            {courses.map((course: any) => (
              <MenuItem key={course.id} value={course.id}>
                {course.nom}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedCourseId && (
        <>
          {/* <Box mb={2}> */}
          {/* <Button onClick={handleClick}>Supprimer la grille</Button>
          <Confirm
            isOpen={open}
            // loading={isPending}
            title={`Supprimer la grille de départ`}
            content="Etes-vous sûr de supprimer cette grille ?"
            onConfirm={handleConfirm}
            onClose={handleDialogClose}
          /> */}
          {/* </Box> */}
          {/* <Box display="flex" justifyContent="center">
            <Box > */}
          <ListBase
            key={key}
            resource="grille_depart"
            filter={{ courseId: selectedCourseId }}
            perPage={100}
            sort={{ field: "position_depart", order: "ASC" }}
          >
            <Datagrid
              bulkActionButtons={false}
              rowClick="edit"
              rowStyle={(record, index) => ({
                backgroundColor: index % 2 === 0 ? "#D7BBF5" : "#EDE4FF", // bleu clair / rose clair
              })}
            >
              <ReferenceField
                source="vehiculeId"
                reference="vehicules"
                label="Num."
                link={false}
              >
                <TextField
                  source="numero"
                  sx={{
                    textTransform: "uppercase",
                    color: "#321479",
                    fontWeight: 600,
                  }}
                />
              </ReferenceField>
              <ReferenceField
                source="vehiculeId"
                reference="vehicules"
                label="Véhicule"
                link={false}
              >
                <TextField
                  source="nom"
                  sx={{
                    textTransform: "uppercase",
                    color: "#321479",
                    fontWeight: 600,
                  }}
                />
              </ReferenceField>

              <NumberField
                source="position_depart"
                label="Position départ"
                sx={{
                  textTransform: "uppercase",
                  color: "#321479",
                  fontWeight: 600,
                }}
              />
              {/* <NumberField source="distance_parcourue" label="Réussite (%)" />
              <NumberField source="temps_course" label="Temps" /> */}

              <NumberField
                source="position_arrivee"
                label="Position arrivée"
                sx={{
                  textTransform: "uppercase",
                  color: "#321479",
                  fontWeight: 600,
                }}
              />
            </Datagrid>
          </ListBase>
          {/* </Box>
          </Box> */}
        </>
      )}
    </Box>
  );
};

export const GrilleDepartEdit = () => (
  <Edit
    redirect="grille_depart"
    actions={<CustomTopToolbar resource="grille_depart" />}
  >
    <SimpleForm toolbar={<CustomToolbar />}>
      <ReferenceField source="courseId" reference="courses" link={false}>
        Course : <TextField label="Course" source="nom" sx={{ fontSize: 24 }} />
      </ReferenceField>
      <ReferenceField source="vehiculeId" reference="vehicules" link={false}>
        Véhicule :{" "}
        <TextField source="nom" label="Véhicule : " sx={{ fontSize: 24 }} />
      </ReferenceField>

      <NumberInput source="position_depart" />
      {/* <NumberInput source="distance_parcourue" label="Reussite %" />
      <CustomTimeInput /> */}
      <NumberInput source="position_arrivee" />

      <SelectInput
        source="abandon"
        label="Statut"
        choices={[
          { id: 1, name: "Disqualification" },
          { id: 2, name: "Abandon" },
        ]}
      />

      <ReferenceInput source="commissaire_id" reference="commissaires">
        <SelectInput
          optionText="nom"
          // validate={required("Champ requis !")}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const GrilleDepartCreate = () => (
  <Create>
    <SimpleForm>
      <NumberInput source="position_depart" />
      <NumberInput source="position_arrivee" />
      <TimeInput source="temps_course" />
      <NumberInput source="abandon" />
      <NumberInput source="distance_parcourue" />
      <ReferenceInput source="courseId" reference="courses" />
      <ReferenceInput source="vehiculeId" reference="vehicules" />
      <ReferenceInput source="commissaire_id" reference="commissaires" />
    </SimpleForm>
  </Create>
);

export const GrilleDepartShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <NumberField source="position_depart" />
      <NumberField source="position_arrivee" />
      <TextField source="temps_course" />
      <NumberField source="abandon" />
      <NumberField source="distance_parcourue" />
      <ReferenceField source="courseId" reference="courses" />
      <ReferenceField source="vehiculeId" reference="vehicules" />
      <ReferenceField source="commissaire_id" reference="commissaires" />
    </SimpleShowLayout>
  </Show>
);
