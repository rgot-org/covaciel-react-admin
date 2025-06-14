import { Create, Datagrid, Edit, List, SimpleForm, TextField, TextInput } from 'react-admin';
import { CustomTopToolbar } from './utils/CustomTopToolbar';

export const CommissaireList = () => (
    <List>
        <Datagrid>
            <TextField source="nom" />
            <TextField source="prenom" />
        </Datagrid>
    </List>
);
export const CommissaireEdit = () => (
    <Edit actions={<CustomTopToolbar resource="commissaires" />}>
        <SimpleForm>
            <TextInput source="nom" />
            <TextInput source="prenom" />
            {/* <TextInput source="id" disabled/> */}
        </SimpleForm>
    </Edit>
);
export const CommissaireCreate = () => (
<Create redirect='list' actions={<CustomTopToolbar resource="commissaires" />}>
    <SimpleForm>
      <TextInput source="nom" />
      <TextInput source="prenom" />
    </SimpleForm>
  </Create>
);