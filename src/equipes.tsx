import { Datagrid, List, ReferenceField, TextField } from "react-admin";
import { CustomTopToolbar } from "./utils/CustomTopToolbar";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
} from "react-admin";

export const EquipeEdit = () => (
  <Edit
    redirect="list"
    actions={<CustomTopToolbar resource="equipes" />}
    mutationMode="pessimistic" // demande confirmation à la suppression
  >
    <SimpleForm>
      <TextInput source="id" disabled /> {/* facultatif pour la modification */}
      <TextInput source="nom" label="Nom de l'équipe" />
      <ReferenceInput source="lyceeId" reference="lycees" label="Lycée">
        <SelectInput optionText="nom" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const EquipeCreate = () => (
  <Create redirect="list" actions={<CustomTopToolbar resource="equipes" />}>
    <SimpleForm>
      <TextInput source="nom" label="Nom de l'équipe" />
      <ReferenceInput source="lyceeId" reference="lycees" label="Lycée">
        <SelectInput optionText="nom" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);
export const EquipeList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="nom" />
      <ReferenceField
        label="Lycée"
        source="lyceeId"
        reference="lycees"
        link={false}
      >
        <TextField source="nom" />
      </ReferenceField>
      <ReferenceField
        label="Académie"
        source="lyceeId"
        reference="lycees"
        link={false}
      >
        <TextField source="academie" />
      </ReferenceField>
    </Datagrid>
  </List>
);
