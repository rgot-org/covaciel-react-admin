import {
  useRecordContext,
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  DeleteButton,
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  Create,
  BooleanField,
  ReferenceOneField,
  InfiniteList,
  useRedirect,
  Button,
  useGetOne,
  useNotify,
  useDataProvider,
  IconButtonWithTooltip,
  useGetList,
  Loading,
  Error,
  useRefresh,
  useListContext,
  CreateButton,
  ExportButton,
  TopToolbar,
  FunctionField,
  NumberInput,
} from "react-admin";

import { useState, useEffect } from "react";
import { useCompetition } from "./utils/CompetitionContext";
import { CustomTopToolbar } from "./utils/CustomTopToolbar";

import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Link,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { QualificationCell } from "./utils/QualificationCell";
import { ConformiteCell } from "./utils/ConformiteCell";
import { useLocation } from "react-router";
import { SelectEquipeWithLycee } from "./utils/SelectEquipeWithLycee";
const ManualRefreshButton = () => {
  const { setFilters, filterValues } = useListContext();

  const handleRefresh = () => {
    // Choisir un filtre existant (par exemple 'nom')
    const fakeValue =
      filterValues.nom === "__refresh__" ? "__refresh2__" : "__refresh__";

    // Appliquer un filtre temporaire
    setFilters({ ...filterValues, nom: fakeValue }, null);

    // Rétablir les filtres d’origine juste après (très court délai)
    setTimeout(() => {
      const restoredFilters = { ...filterValues };
      setFilters(restoredFilters, null);
    }, 100);
  };

  return (
    <Button
      onClick={handleRefresh}
      startIcon={<RefreshIcon />}
      label="Rafraîchir"
    >
      Rafraîchir
    </Button>
  );
};

const VehiculeListActions = () => (
  <TopToolbar>
    <ManualRefreshButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const VehiculeList = () => {
  const location = useLocation();
  const refresh = useRefresh();

  // useEffect(() => {
  //   if (location.state?.refreshKey) {
  //     refresh();
  //   }
  // }, [location.state, refresh]);

  const { competitionId } = useCompetition();

  const {
    data: seances,
    isLoading,
    error,
  } = useGetList("seance_qualif", {
    sort: { field: "seanceId", order: "ASC" },
  });

  if (competitionId === undefined || competitionId === null) {
    return <CircularProgress />;
  }

  if (isLoading) return <Loading />;
  if (error || !seances) return <Error />;

  return (
    <InfiniteList
      disableAuthentication
      filter={competitionId ? { competitionId } : {}}
      actions={<VehiculeListActions />}
    >
      <Datagrid bulkActionButtons={false}>
        {/* <TextField source="id" /> */}
        <TextField source="numero"></TextField>
        <TextField source="nom" />
        {/* <ReferenceField source="equipeId" reference="equipes" link="edit">
          <TextField source="nom" />
          <ReferenceField source="lyceeId" reference="lycees">
            <span> - </span>
            <TextField source="nom" />
            <span> (</span>
            <TextField source="academie" />
            <span>)</span>
          </ReferenceField>
        </ReferenceField> */}
        <ReferenceOneField reference="conformite" target="id" label="Conformité">
          <FunctionField
            label="Horaire"
            render={(record) => {
              if (!record.horaire) return "";
              return record.horaire.slice(0, 5); // "HH:mm:ss" → "HH:mm"
            }}
          />
 <ConformiteCell label="Conformité" />
        </ReferenceOneField>
        {/* <ReferenceOneField reference="conformite" target="id" label="Dim">
          <BooleanField source="dimension" />
        </ReferenceOneField>
        <ReferenceOneField reference="conformite" target="id" label="$GO;">
          <BooleanField source="topDepart" />
        </ReferenceOneField>
        <ReferenceOneField reference="conformite" target="id" label="N. Furtif">
          <BooleanField source="nonFurtif" />
        </ReferenceOneField>
        <ReferenceOneField reference="conformite" target="id" label="M. AV">
          <BooleanField source="marcheAvant" />
        </ReferenceOneField>
        <ReferenceOneField reference="conformite" target="id" label="M. AR">
          <BooleanField source="marcheArriere" />
        </ReferenceOneField> */}
       

        {seances.map((seance: any) => (
          <QualificationCell
            label={`Q${seance.numero}`}
            key={seance.id}
            seanceId={seance.id}
            seanceLabel={`Q${seance.numero}`}
          />
        ))}
        {/* <QualificationCell label="Q1" key="1" seanceId={1} seanceLabel="Q1" />
        <QualificationCell label="Q2" key="2" seanceId={2} seanceLabel="Q2" /> */}
      </Datagrid>
    </InfiniteList>
  );
};

export const VehiculeEdit = () => (
  <Edit
    redirect="list"
    actions={<CustomTopToolbar resource="vehicules" />}
    mutationMode="pessimistic" // demande confirmation à la suppression
  >
    <SimpleForm>
      <TextInput source="id" readOnly={true} />
      <NumberInput source="numero"/>
      <TextInput source="nom" />
      <ReferenceInput source="equipeId" reference="equipes">
        <SelectInput optionText="nom" />
      </ReferenceInput>
      <ReferenceInput source="competitionId" reference="competitions">
        <SelectInput optionText="nom" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export const VehiculeCreate = () => {
  const { competitionId } = useCompetition();
  const { data: competition, isLoading } = useGetOne("competitions", {
    id: competitionId,
  });

  if (isLoading || !competitionId) return null;

  return (
    <Create actions={<CustomTopToolbar resource="vehicules" />} redirect="list">
      <SimpleForm
        defaultValues={{
          competitionId: competition.id, // pré-remplit le champ competitionId si tu l’utilises
          annee: competition.annee, // extrait l’année depuis le champ datetime
        }}
      >
        <NumberInput source="numero" />
        <TextInput source="nom" />
        {/* <ReferenceInput source="equipeId" reference="equipes">
          <SelectEquipeWithLycee />
        </ReferenceInput> */}
        <SelectEquipeWithLycee source="equipeId" label="Équipe" />
        <ReferenceInput source="competitionId" reference="competitions">
          <SelectInput optionText="nom" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};
