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
  ListBase,
} from "react-admin";

import { useState, useEffect } from "react";
import { useCompetition } from "./utils/CompetitionContext";
import { CustomTopToolbar } from "./utils/CustomTopToolbar";
import { useMediaQuery, Theme, Box } from "@mui/material";

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
import { CustomToolbar } from "./utils/CustomToolBar";
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
  const { competitionId } = useCompetition();
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  //const refresh = useRefresh();

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 10000); // 10 000 ms = 10 secondes

    return () => clearInterval(interval); // Nettoyage à la sortie
  }, [refresh]);
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
    <Box pt={5} px={2}>
    <ListBase perPage={25}
      disableAuthentication
      filter={competitionId ? { competitionId } : {}}
      // actions={<VehiculeListActions />}
    >
      {isSmall ? (
        <Datagrid
          bulkActionButtons={false}
          rowClick={false}
          rowStyle={(record, index) => ({
            backgroundColor: index % 2 === 0 ? "#D7BBF5" : "#EDE4FF", // bleu clair / rose clair
          })}
        >
          {/* <TextField source="id" /> */}
          <TextField
            source="numero"
            label="Num"
          ></TextField>
          {/* <TextField
            source="nom"
          /> */}
          <ReferenceOneField reference="conformite" target="id" label="Conf.">
            <span style={{ color: "#888" }}>
              <FunctionField
                label="Horaire"
                render={(record) => {
                  if (!record.horaire) return "";
                  return record.horaire.slice(0, 5); // "HH:mm:ss" → "HH:mm"
                }}
              />
            </span>
            <ConformiteCell label="Conformité" />
          </ReferenceOneField>

          {seances.map((seance: any) => (
            <QualificationCell
              label={`Q${seance.numero}`}
              key={seance.id}
              seanceId={seance.id}
              seanceLabel={`Q${seance.numero}`}
            />
          ))}
        </Datagrid>
      ) : (
        <Datagrid
          bulkActionButtons={false}
          rowStyle={(record, index) => ({
            backgroundColor: index % 2 === 0 ? "#D7BBF5" : "#EDE4FF", // bleu clair / rose clair
          })}
          rowClick={false}
        >
          {/* <TextField source="id" /> */}
          <TextField
            source="numero"
            label="Numéro"
          ></TextField>
          <TextField
            source="nom"
          />
          <ReferenceOneField
            reference="conformite"
            target="id"
            label="Conformité"
          >
            <span style={{ color: "#888" }}>
              <FunctionField
                label="Horaire"
                render={(record) => {
                  if (!record.horaire) return "";
                  return record.horaire.slice(0, 5); // "HH:mm:ss" → "HH:mm"
                }}
              />
            </span>
            <ConformiteCell label="Conformité" />
          </ReferenceOneField>
          <ReferenceOneField reference="conformite" target="id" label="Dim">
            <FunctionField              
              render={(record) => {
                if (record.dimension==null) return ""; 
                return (record?.dimension ? "✅" : "❌")
              }}
            />
          </ReferenceOneField>
          <ReferenceOneField reference="conformite" target="id" label="$GO;">
            <FunctionField
              render={(record) => {
                if (record.topDepart==null) return ""; 
                return (record?.topDepart ? "✅" : "❌")
              }}
            />
          </ReferenceOneField>
          <ReferenceOneField
            reference="conformite"
            target="id"
            label="N. Furtif"
          >
            <FunctionField
              render={(record) => {
                if (record.nonFurtif==null) return ""; 
                return (record?.nonFurtif ? "✅" : "❌")
              }}
            />
          </ReferenceOneField>
          <ReferenceOneField reference="conformite" target="id" label="M. AV">
            <FunctionField
              render={(record) => {
                if (record.marcheAvant==null) return ""; 
                return (record?.marcheAvant ? "✅" : "❌")
              }}
            />
          </ReferenceOneField>
          <ReferenceOneField reference="conformite" target="id" label="M. AR">
            <FunctionField
             render={(record) => {
              if (record.marcheArriere==null) return ""; 
              return (record?.marcheArriere ? "✅" : "❌")
            }}
            />
          </ReferenceOneField>

          {seances.map((seance: any) => (
            <QualificationCell
              label={`Qualif ${seance.numero}`}
              key={seance.id}
              seanceId={seance.id}
              seanceLabel={`Q${seance.numero}`}
            />
          ))}
        </Datagrid>
      )}
    </ListBase>
    </Box>
  );
};

export const VehiculeEdit = () => (
  <Edit
    redirect="list"
    actions={<CustomTopToolbar resource="vehicules" />}
    mutationMode="pessimistic" // demande confirmation à la suppression
  >
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="id" readOnly={true} />
      <NumberInput source="numero" />
      <TextInput source="nom" />
      {/* <ReferenceInput source="equipeId" reference="equipes">
        <SelectInput optionText="nom" />
      </ReferenceInput> */}
      <SelectEquipeWithLycee source="equipeId" label="Équipe" />
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
