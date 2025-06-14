import { useDataProvider } from 'react-admin';
import { useEffect, useState } from 'react';
import { useCompetition } from './CompetitionContext';

export const SelectCompetition = () => {
  const dataProvider = useDataProvider();
  const { competitionId, setCompetitionId } = useCompetition();
  const [competitions, setCompetitions] = useState<any[]>([]);

  useEffect(() => {
    dataProvider.getList('competitions', {
      pagination: { page: 1, perPage: 100 },
      sort: { field: 'annee', order: 'DESC' },
      filter: {},
    }).then(({ data }) => setCompetitions(data));
  }, [dataProvider]);

  return (
    <div style={{ padding: '1rem' }}>
      <label>Compétition sélectionnée : </label>
      <select value={competitionId ?? ''} onChange={(e) => setCompetitionId(Number(e.target.value))}>
        <option value="">-- Choisir --</option>
        {competitions.map(comp => (
          <option key={comp.id} value={comp.id}>{comp.nom} - {new Date(comp.annee).getFullYear()}</option>
        ))}
      </select>
    </div>
  );
};
