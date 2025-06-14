import { List, Datagrid, TextField, DateField ,Edit, SimpleForm, TextInput, DateTimeInput, Create, NumberField, NumberInput } from 'react-admin';
import { CustomTopToolbar } from './utils/CustomTopToolbar';
import { CompetitionSelector } from './utils/CompetitionSelector';

export const CompetitionList = () => (
  
  <List>
      <CompetitionSelector />
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="nom" />
      <TextField source="annee"   />
      <TextField source="lieu" />
    </Datagrid>
  </List>
);


export const CompetitionEdit = () => (

    <Edit
      redirect="list"
      actions={<CustomTopToolbar resource="competitions" />}
      mutationMode="pessimistic" // demande confirmation à la suppression
    >
    <SimpleForm>
      <TextInput source="nom" />
      <NumberInput source="annee" min="2025" />
      <TextInput source="lieu" />
    </SimpleForm>
  </Edit>
);

export const CompetitionCreate = () => (
  <Create
  redirect="list"
      actions={<CustomTopToolbar resource="competitions" />}
  >
    <SimpleForm>
      <TextInput source="nom" />
      <NumberInput source="annee" min="2025" defaultValue={'2025'}/>
      <TextInput source="lieu" />
    </SimpleForm>
  </Create>
);
