import {
  List,
  Datagrid,
  TextField,
  EditButton,
  Edit,
  SimpleForm,
  TextInput,
  Create,
  required,
  NumberField,
  SelectInput,
  NumberInput,
  ReferenceInput,
  useGetOne,
} from "react-admin";
import { CircularProgress, Typography } from "@mui/material";
import { CustomTopToolbar } from "./utils/CustomTopToolbar";
import { useCompetition } from "./utils/CompetitionContext";
// import { Datagrid, List, NumberField, ReferenceField, TextField } from 'react-admin';

export const CourseList = () => {
  const { competitionId } = useCompetition();
  if (competitionId === undefined || competitionId === null) {
    return <CircularProgress />;
  }
  return (
    <List filter={competitionId ? { competitionId } : {}}>
      <Datagrid>
        <TextField source="id" />
        {/* <NumberField source="numero" /> */}
        <TextField source="nom" />
        <TextField source="heure" />
      </Datagrid>
    </List>
  );
};

// import { Edit, NumberInput, ReferenceInput, SimpleForm, TextInput } from 'react-admin';

export const CourseEdit = () => (
  <Edit
    redirect="list"
    mutationMode="pessimistic" // demande confirmation à la suppression
    actions={<CustomTopToolbar resource="courses" />}
  >
    <SimpleForm>
      {/* <TextInput source="id" /> */}
      {/* <NumberInput source="numero" /> */}
      <TextInput source="nom" />
      <TextInput source="heure" />
      <ReferenceInput source="competitionId" reference="competitions">
        <SelectInput optionText="annee" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const CourseCreate = () => {
  const { competitionId } = useCompetition();
  const { data: competition, isLoading } = useGetOne("competitions", {
    id: competitionId,
  });

  if (isLoading || !competitionId) return null;
  return (
    <Create redirect="list" actions={<CustomTopToolbar resource="courses" />}>
      <SimpleForm
      defaultValues={{
        competitionId: competition.id, // pré-remplit le champ competitionId si tu l’utilises
        annee: competition.annee, // extrait l’année depuis le champ datetime
      }}
      >
        <Typography variant="h6">Créer une course</Typography>
        {/* <TextInput
        source="nom"
        label="Nom de la course"
        validate={required()}
        fullWidth
      /> */}
        {/* <NumberInput source="numero" validate={required()}/> */}
        <TextInput source="nom" validate={required()} />
        <TextInput source="heure" />
        <ReferenceInput source="competitionId" reference="competitions">
          <SelectInput optionText="annee" validate={required()} readOnly/>
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
