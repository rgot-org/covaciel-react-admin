import { Resource, usePermissions } from 'react-admin';
import React from 'react';

export const AppResources: React.FC = () => {
  const { permissions } = usePermissions();

  return (
    <>
      <Resource name="competitions" list={CompetitionList} edit={CompetitionEdit} create={CompetitionCreate} options={{ label: "Compétitions" }} />
      <Resource name="vehicules" list={VehiculeList} edit={VehiculeEdit} create={VehiculeCreate} options={{ label: "Véhicules" }} />
      <Resource name="qualifications" list={QualificationList} edit={QualificationEdit} create={QualificationCreate} />
      <Resource name="grille_depart" list={GrilleDepartList} edit={GrilleDepartEdit} create={GrilleDepartCreate} show={GrilleDepartShow} />
      <Resource name="conformite" edit={ConformiteEdit} create={ConformiteCreate} />
      <Resource name="best_score" list={BestScoreList} options={{ label: "Classement qualifications" }} />

      {permissions === 'admin' && (
        <>
          <Resource name="courses" list={CourseList} edit={CourseEdit} create={CourseCreate} options={{ label: "Courses" }} />
          <Resource name="lycees" list={LyceeList} edit={LyceeEdit} create={LyceeCreate} options={{ label: "Lycées" }} />
          <Resource name="equipes" list={EquipeList} edit={EquipeEdit} create={EquipeCreate} options={{ label: "Équipes" }} />
          <Resource name="commissaires" list={CommissaireList} edit={CommissaireEdit} create={CommissaireCreate} options={{ label: "Commissaires" }} />
        </>
      )}
    </>
  );
};
