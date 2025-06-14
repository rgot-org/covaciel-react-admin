// qualifications.tsx
import { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
  ReferenceInput,
  SelectInput,
  Show,
  SimpleShowLayout,
  TimeInput,
  useRecordContext,
  FunctionField,
  regex,
  required,
  DeleteButton,
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";

import { CustomTopToolbar } from "./utils/CustomTopToolbar";
import { CustomTimeInput } from "./utils/CustomTimeInput";

const CustomToolbar = () => {
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <SaveButton />
      <DeleteButton mutationMode="pessimistic" redirect="/vehicules" />
    </Toolbar>
  );
};
const validateTime = [
  required("Champ requis"),
  regex(/^00:[0-5]\d:[0-5]\d$/, "Format invalide. Utilisez m:ss (ex: 1:30)"),
];

export const QualificationList = () => (
  <List>
    <Datagrid>
      {/* <TextField source="id" /> */}
      <ReferenceField
        source="seance_qualifID"
        reference="seance_qualif"
        label="Qualif n°"
      >
        <TextField source="numero" />
      </ReferenceField>
      <TextField source="temps" />
      <TextField source="reussite" label="Réussite %" />
      <ReferenceField
        source="vehiculeId"
        reference="vehicules"
        label="Véhicule"
      >
        <TextField source="nom" />
      </ReferenceField>
      <ReferenceField source="commissaireId" reference="commissaires">
        <TextField source="nom" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export const QualificationEdit = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    //refresh();
    notify("Qualification enregistrée !");
    redirect("/vehicules");
  };

  return (
    <Edit
      actions={<CustomTopToolbar resource="vehicules" />}
      //mutationOptions={{ onSuccess }}
      redirect="/vehicules"
    >
      <SimpleForm toolbar={<CustomToolbar />}>
        <ReferenceField source="vehiculeId" reference="vehicules" link={false}>
          <TextField source="nom" label="Qualification n°" />
        </ReferenceField>

        <ReferenceField source="seance_qualifID" reference="seance_qualif">
          <FunctionField
            label="Nom "
            render={(record) => `Qualif n°${record.numero}`}
          />
        </ReferenceField>
        <TimeInput
          source="horaire"
          label="Horaire"
          format={(value) => {
            if (typeof value === "string" && value.length === 8) {
              // format "HH:mm:ss" => tronque à "HH:mm"
              return value.slice(0, 5);
            }
            return value;
          }}
          parse={(value) => {
            if (typeof value === "string" && value.length === 5) {
              // format "HH:mm" => complète avec ":00"
              return `${value}:00`;
            }
            return value;
          }}
        />
        <CustomTimeInput />
        <NumberInput source="reussite" validate={required("Champ requis !")} />
        <TextInput source="commentaire" />
        <ReferenceInput source="commissaireId" reference="commissaires">
          <SelectInput optionText="nom" validate={required("Champ requis !")} />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};

export const QualificationCreate = () => {
  const record = useRecordContext(); // `record` contient vehiculeId et seance_qualifID
  return (
    <Create
      redirect={(resource, id, data) => {
        return {
          pathname: "/vehicules",
          state: { refreshKey: Date.now() },
        };
      }}
      actions={<CustomTopToolbar resource="vehicules" />}
    >
      <SimpleForm
        defaultValues={{
          vehiculeId: record?.vehiculeId,
          seance_qualifID: record?.seance_qualifID,
        }}
      >
        {/* Affichage en lecture seule */}
        <ReferenceInput source="vehiculeId" reference="vehicules">
          <SelectInput optionText="nom" readOnly label="Véhicule" />
        </ReferenceInput>
        <ReferenceInput source="seance_qualifID" reference="seance_qualif">
          <SelectInput optionText="numero" readOnly label="Séance" />
        </ReferenceInput>

        {/* Champs masqués pour l'envoi */}
        {/* <TextInput source="vehiculeId"  readOnly/>
        <TextInput source="seance_qualifID" readOnly /> */}
        <TimeInput
          source="horaire"
          label="Horaire"
          format={(value) => {
            if (typeof value === "string" && value.length === 8) {
              // format "HH:mm:ss" => tronque à "HH:mm"
              return value.slice(0, 5);
            }
            return value;
          }}
          parse={(value) => {
            if (typeof value === "string" && value.length === 5) {
              // format "HH:mm" => complète avec ":00"
              return `${value}:00`;
            }
            return value;
          }}
        />
        {/* Formulaire normal */}
        <ReferenceInput
          source="commissaireId"
          reference="commissaires"
          label="Commissaire"
        >
          <SelectInput
            optionText="nom"
            // validate={required("Champ requis !")}
          />
        </ReferenceInput>

        {/* <CustomTimeInput />
        <NumberInput
          source="reussite"
          label="Réussite (%)"
          // validate={required("Champ requis !")}
        />
        <TextInput source="commentaire" label="Commentaire" /> */}
      </SimpleForm>
    </Create>
  );
};

export const QualificationShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="idQualification" />
      <TextField source="numero" />
      <TextField source="commentaire" />
      <TextField source="temps" />
      <TextField source="reussite" />
      <ReferenceField source="vehiculeId" reference="vehicules" />
      <ReferenceField source="commissaireId" reference="commissaires" />
    </SimpleShowLayout>
  </Show>
);
