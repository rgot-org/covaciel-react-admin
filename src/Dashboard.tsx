// src/Dashboard.tsx
import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Title, useGetList, Loading, Error } from 'react-admin';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const Dashboard = () => {
  // Récupération des données
  const { data: vehicules } = useGetList('vehicules');
  const { data: competitions } = useGetList('competitions');
  const { data: lycees } = useGetList('lycees');
  const { data: courses } = useGetList('courses');

  // Calculs des statistiques
  const stats = {
    totalVehicules: vehicules?.length || 0,
    totalLycees: lycees?.length || 0,
    totalCourses: courses?.length || 0,
    currentCompetition: competitions?.find(c => c.annee === 2025)?.nom || 'N/A'
  };

  // Données pour les graphiques
  const vehiculesParLycee = lycees?.map(lycee => ({
    nom: lycee.nom,
    count: vehicules?.filter(v => v.equipe?.lyceeId === lycee.id)?.length || 0
  })) || [];

  return (
    <div style={{ margin: 20 }}>
      <Title title="Tableau de bord Covaciel 2025" />
      
      <Grid container spacing={3}>
        {/* Statistiques principales */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Véhicules inscrits
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalVehicules}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Lycées participants
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalLycees}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Courses programmées
              </Typography>
              <Typography variant="h4" component="div">
                {stats.totalCourses}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Compétition actuelle
              </Typography>
              <Typography variant="h6" component="div">
                {stats.currentCompetition}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique véhicules par lycée */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Véhicules par lycée
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vehiculesParLycee}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nom" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions rapides */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actions rapides
              </Typography>
              {/* Ajouter des boutons d'actions rapides */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};