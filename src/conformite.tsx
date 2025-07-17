import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  ReferenceField,
  Edit,
  SimpleForm,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  Create,
  Show,
  SimpleShowLayout,
  ReferenceOneField,
  useNotify,
  useRedirect,
  TextInput,
  useEditController,
  SaveButton,
  Toolbar,
  useRefresh,
  InfiniteList,
  useRecordContext,
  useUpdate,
  TimeInput,
  useGetOne,
} from "react-admin";
import { CustomTopToolbar } from "./utils/CustomTopToolbar";
import { useLocation, useParams } from "react-router-dom";
import { CustomToolbar } from "./utils/CustomToolBar";
import { Typography, Box } from "@mui/material";
const redirectToVehicules = (resource, id, data) => {
  return "/vehicules";
};

export const ConformiteList = () => (
  <InfiniteList>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <BooleanField source="dimension" />
      <BooleanField source="topDepart" />
      <BooleanField source="nonFurtif" />
      <BooleanField source="marcheAvant" />
      <BooleanField source="marcheArriere" />
    </Datagrid>
  </InfiniteList>
);

export const ConformiteEdit = () => (
  <Edit
    redirect={(resource, id, data) => {
      return "/vehicules";
    }}
    actions={<CustomTopToolbar resource="vehicules" />}
    mutationMode="pessimistic" // demande confirmation à la suppression
  >
    <SimpleForm toolbar={<CustomToolbar />}>
      <ReferenceField
        label="Véhicule"
        source="id"
        reference="vehicules"
        link={false}
      >
        <TextField source="nom" />
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
      <BooleanInput source="dimension" />
      <BooleanInput source="topDepart" />
      <BooleanInput source="nonFurtif" />
      <BooleanInput source="marcheAvant" />
      <BooleanInput source="marcheArriere" />
    </SimpleForm>
  </Edit>
);

export const ConformiteCreate = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const vehiculeId = searchParams.get("vehiculeId");
  const { data: vehicule, isLoading } = useGetOne("vehicules", { id: vehiculeId });
  return (
    <Create
      redirect={(resource, id, data) => {
        return "/vehicules";
      }}
      actions={<CustomTopToolbar resource="vehicules" />}
    >
      <SimpleForm
        defaultValues={{ id: Number(vehiculeId) }}
        toolbar={<CustomToolbar />}
      >
        {vehicule && (
          <Box mb={2}>
            <Typography variant="h6">
              Véhicule : {vehicule.nom}
            </Typography>
          </Box>
        )}
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
        <BooleanInput source="dimension" />
        <BooleanInput source="topDepart" />
        <BooleanInput source="nonFurtif" />
        <BooleanInput source="marcheAvant" />
        <BooleanInput source="marcheArriere" />
      </SimpleForm>
    </Create>
  );
};

export const ConformiteShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <ReferenceField source="vehicule_id" reference="vehicules">
        <TextField source="nom" />
      </ReferenceField>
      <BooleanField source="dimension" />
      <BooleanField source="topDepart" />
      <BooleanField source="nonFurtif" />
      <BooleanField source="marcheAvant" />
      <BooleanField source="marcheArriere" />
    </SimpleShowLayout>
  </Show>
);
