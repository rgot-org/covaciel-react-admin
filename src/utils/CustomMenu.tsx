// CustomMenu.tsx
import { Menu, useResourceDefinitions, useSidebarState } from "react-admin";
import { Collapse, ListItemIcon, ListItemText, List } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PeopleIcon from "@mui/icons-material/People";
// import CarIcon from "@mui/icons-material/DirectionsCar";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import ScoreboardSharpIcon from "@mui/icons-material/ScoreboardSharp";
import MilitaryTechSharpIcon from "@mui/icons-material/MilitaryTechSharp";
import SportsIcon from "@mui/icons-material/Sports";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { TiArrowLoop } from "react-icons/ti";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { useState, useEffect } from "react";
import { DirectionsCar } from "@mui/icons-material";

export const CustomMenu = () => {
  const resources = useResourceDefinitions();
  // const [open, setOpen] = useState(false) || false;
  // // const [sidebarOpen, setSidebarOpen] = useSidebarState();

  // // useEffect(() => {
  // //   if (sidebarOpen) {
  // //     setSidebarOpen(false); // Force la sidebar repliée
  // //   }
  // // }, [sidebarOpen, setSidebarOpen]);

  const toggleConfig = () => setOpen(!open);
  const [open, setOpen] = useSidebarState();

  // Replie le menu au démarrage
  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [open, setOpen]);
  return (
    <Menu>
      <Menu.Item
        to="#"
        onClick={toggleConfig}
        primaryText="Configuration"
        leftIcon={<SettingsIcon />}
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Menu.Item
            to="/competitions"
            primaryText="Compétitions"
            leftIcon={<EmojiEventsIcon />}
          />
          <Menu.Item
            to="/lycees"
            primaryText="Lycées"
            leftIcon={<SchoolIcon />}
          />
          <Menu.Item
            to="/equipes"
            primaryText="Équipes"
            leftIcon={<GroupIcon />}
          />
          <Menu.Item
            to="/courses"
            primaryText="Courses"
            leftIcon={<TiArrowLoop />}
          />
          <Menu.Item
            to="/commissaires"
            primaryText="Commissaires"
            leftIcon={<SportsIcon />}
          />
        </List>
      </Collapse>
      <Menu.Item
        to="/vehicules"
        primaryText="Véhicules"
        leftIcon={<DirectionsCar />}
      />
      {/* <Menu.Item to="/qualifications" primaryText="Qualifications" leftIcon={<SportsScoreIcon/>}/> */}
      <Menu.Item
        to="/best_score"
        primaryText="résultat Qualif"
        leftIcon={<ScoreboardSharpIcon />}
      />
      <Menu.Item
        to="/grille_depart"
        primaryText="Grille départ"
        leftIcon={<SportsScoreIcon />}
      />
    </Menu>
  );
};
