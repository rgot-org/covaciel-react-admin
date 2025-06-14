import { List, Datagrid, TextField, EditButton, DeleteButton,Edit, SimpleForm, TextInput, Create } from 'react-admin';
import { CustomTopToolbar } from "./utils/CustomTopToolbar";
export const LyceeList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="nom" />
      <TextField source="academie" />
      <TextField source="contact" />
    </Datagrid>
  </List>
);


export const LyceeEdit = () => (
  <Edit 
  redirect="list"
      actions={<CustomTopToolbar resource="lycees" />}
      mutationMode="pessimistic" // demande confirmation à la suppression
  >
    <SimpleForm>
      <TextInput source="id" readOnly={true} />
      <TextInput source="nom" />
      <TextInput source="academie" />
      <TextInput source="contact" />
    </SimpleForm>
  </Edit>
);

export const LyceeCreate = () => (
<Create redirect='list' actions={<CustomTopToolbar resource="lycees" />}>
    <SimpleForm>
      <TextInput source="nom" />
      <TextInput source="academie" />
      <TextInput source="contact" />
    </SimpleForm>
  </Create>
);
