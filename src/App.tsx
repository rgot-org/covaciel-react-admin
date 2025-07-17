import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  CustomRoutes,
  Layout,
} from "react-admin";
import { customTheme } from "./utils/theme";
import treeqlProvider from "ra-data-treeql";
import { VehiculeList, VehiculeEdit, VehiculeCreate } from "./vehicules";
import { EquipeList, EquipeEdit, EquipeCreate } from "./equipes";
import { LyceeList, LyceeEdit, LyceeCreate } from "./lycee";

import {
  CompetitionList,
  CompetitionEdit,
  CompetitionCreate,
} from "./competition";

import {
  CommissaireList,
  CommissaireCreate,
  CommissaireEdit,
} from "./commissaires";

import {
  QualificationList,
  QualificationEdit,
  QualificationCreate,
  QualificationShow,
} from "./qualifications";

import {
  GrilleDepartList,
  GrilleDepartEdit,
  GrilleDepartCreate,
  GrilleDepartShow,
} from "./grilleDepart";
import { ConformiteEdit, ConformiteCreate, ConformiteList } from "./conformite";
import { CompetitionProvider } from "./utils/CompetitionContext";
import { CustomLayout } from "./utils/CustomLayout";
import { CustomMenu } from "./utils/CustomMenu";
import { Navigate } from "react-router-dom";
import { BestScoreList } from "./BestScoreList";
import { CourseCreate, CourseEdit, CourseList } from "./Courses";
import authProvider from "./utils/authprovider";
export const DashboardRedirect = () => {
  // redirection vers vehicules au démarrage 
  return <Navigate to="/vehicules" replace />;
};

export const App = () => (
  <CompetitionProvider>
    <Admin
      dataProvider={treeqlProvider(
         //"http://192.168.6.37:8080/dataprovider/api.php", // sur le NAS
        "/dataprovider/api.php"
      )}
      layout={CustomLayout}
      menu={CustomMenu}
      dashboard={DashboardRedirect} // ici !
      authProvider={authProvider}
      theme={customTheme}
    >
      <Resource
        name="vehicules"
        list={VehiculeList}
        edit={VehiculeEdit}
        create={VehiculeCreate}
        options={{ label: "Véhicules" }}
        //list={<UnprotectedList VehiculeList />}
      />
      <Resource
        name="courses"
        list={CourseList}
        edit={CourseEdit}
        create={CourseCreate}
        options={{ label: "Courses" }}
      />

      <Resource
        name="lycees"
        list={LyceeList}
        edit={LyceeEdit}
        create={LyceeCreate}
        options={{ label: "Lycées" }}
      />
      <Resource
        name="equipes"
        list={EquipeList}
        edit={EquipeEdit}
        create={EquipeCreate}
        options={{ label: "Équipes" }}
      />

      <Resource
        name="commissaires"
        list={CommissaireList}
        edit={CommissaireEdit}
        create={CommissaireCreate}
        options={{ label: "Commissaires" }}
      />
      <Resource
        name="competitions"
        list={CompetitionList}
        edit={CompetitionEdit}
        create={CompetitionCreate}
        options={{ label: "Compétitions" }}
      />
      <Resource
        name="qualifications"
        list={QualificationList}
         edit={QualificationEdit}
        create={QualificationCreate}
        options={{ label: "Qualifications" }}
        // show={QualificationShow}
      />
      <Resource
        name="grille_depart"
        list={GrilleDepartList}
        edit={GrilleDepartEdit}
        create={GrilleDepartCreate}
        show={GrilleDepartShow}
        options={{ label: "Grille de départ" }}
      />
      <Resource
        name="conformite"
        edit={ConformiteEdit}
        create={ConformiteCreate}
      />
      <Resource
        name="best_score"
        list={BestScoreList}
        options={{ label: "Classement qualifications" }}
      />
    </Admin>
  </CompetitionProvider>
);
