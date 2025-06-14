// CompetitionDashboard.tsx
import { useState, useEffect } from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  useDataProvider,
  useNotify,
  Title,
} from 'react-admin';
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
} from '@mui/material';

const CompetitionSelector = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const [competitions, setCompetitions] = useState([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const dataProvider = useDataProvider();
  const notify = useNotify();

  useEffect(() => {
    dataProvider
      .getList('competitions', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'annee', order: 'DESC' },
        filter: {},
      })
      .then(({ data }) => setCompetitions(data))
      .catch(() => notify('Erreur lors du chargement des compétitions', { type: 'warning' }));
  }, [dataProvider, notify]);

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSelectedId(value);
    onSelect(value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>Compétition</InputLabel>
      <Select value={selectedId} label="Compétition" onChange={handleChange}>
        {competitions.map((comp: any) => (
          <MenuItem key={comp.id} value={comp.id}>
            {comp.nom} - {new Date(comp.annee).getFullYear()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const VehiculesList = ({ competitionId }: { competitionId: number }) => (
  <Box mb={4}>
    <Typography variant="h6" gutterBottom>Véhicules inscrits</Typography>
    <List resource="vehicule_has_competition" filter={{ competitionId }} title="">
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <ReferenceField source="vehiculeId" reference="vehicules">
          <TextField source="nom" />
        </ReferenceField>
      </Datagrid>
    </List>
  </Box>
);

// const ConformiteList = ({ competitionId }: { competitionId: number }) => (
//   <Box mb={4}>
//     <Typography variant="h6" gutterBottom>Conformité</Typography>
//     <List resource="vehicule_has_competition" filter={{ competitionId }} title="">
//       <Datagrid rowClick="edit">
//         <TextField source="id" />
//         <ReferenceField source="conformiteId" reference="conformites">
//           <TextField source="id" />
//         </ReferenceField>
//       </Datagrid>
//     </List>
//   </Box>
// );

// const QualificationList = ({ competitionId }: { competitionId: number }) => (
//   <Box mb={4}>
//     <Typography variant="h6" gutterBottom>Qualifications</Typography>
//     <List resource="qualifications" filter={{ competitionId }} title="">
//       <Datagrid rowClick="edit">
//         <TextField source="id" />
//         <TextField source="numero" />
//         <TextField source="duree" />
//         <TextField source="qualifie" />
//         <TextField source="defaut" />
//       </Datagrid>
//     </List>
//   </Box>
// );

// const CourseList = ({ competitionId }: { competitionId: number }) => (
//   <Box mb={4}>
//     <Typography variant="h6" gutterBottom>Courses</Typography>
//     <List resource="courses" filter={{ competitionId }} title="">
//       <Datagrid rowClick="edit">
//         <TextField source="id" />
//         <TextField source="numero" />
//         <TextField source="temps" />
//         <TextField source="exclu" />
//         <TextField source="motif" />
//       </Datagrid>
//     </List>
//   </Box>
// );

export const CompetitionDashboard = () => {
  const [competitionId, setCompetitionId] = useState<number | null>(null);

  return (
    <Card>
      <Title title="Tableau de bord des compétitions" />
      <CardContent>
        <CompetitionSelector onSelect={setCompetitionId} />

        {competitionId && (
          <>
            <VehiculesList competitionId={competitionId} />
            {/* <ConformiteList competitionId={competitionId} />
            <QualificationList competitionId={competitionId} />
            <CourseList competitionId={competitionId} /> */}
          </>
        )}
      </CardContent>
    </Card>
  );
};
