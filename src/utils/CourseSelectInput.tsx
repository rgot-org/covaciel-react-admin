import { useGetList, useNotify } from "react-admin";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useCompetition } from "./CompetitionContext";

interface Props {
  value: string | null;
  onChange: (value: string) => void;
  label?: string;
}

export const CourseSelectInput = ({
  value,
  onChange,
  label = "Course",
}: Props) => {
  const notify = useNotify();
  const [selected, setSelected] = useState<string | null>(value ?? null);
  const { competitionId } = useCompetition();

  const {
    data: allCourses = [],
    isLoading: loadingCourses,
    error: errorCourses,
  } = useGetList("courses", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "id", order: "ASC" },
    filter: { competitionId },
  });

  const {
    data: grilles = [],
    isLoading: loadingGrilles,
    error: errorGrilles,
  } = useGetList("grille_depart", {
    pagination: { page: 1, perPage: 1000 },
  });

  useEffect(() => {
    if (errorCourses || errorGrilles) {
      notify("Erreur lors du chargement des données", { type: "error" });
    }
  }, [errorCourses, errorGrilles, notify]);

  const usedCourseIds = useMemo(() => {
    return Array.from(new Set(grilles.map((g: any) => g.courseId)));
  }, [grilles]);

  const availableCourses = useMemo(() => {
    //return allCourses.filter((c: any) => !usedCourseIds.includes(c.id));
    return allCourses;
  }, [allCourses, usedCourseIds]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newValue = event.target.value as string;
    setSelected(newValue);
    onChange(newValue);
  };

  if (loadingCourses || loadingGrilles) {
    return <CircularProgress />;
  }

  return (
    <FormControl size="small" sx={{ width: 300 }}>
      <InputLabel id="course-select-label" >{label}</InputLabel>
      <Select
        labelId="course-select-label"
        value={selected ?? ""}
        onChange={handleChange}
        size="small"
      >
        {availableCourses.map((course: any) => (
          <MenuItem key={course.id} value={course.id}>
            {course.nom}
          </MenuItem>
        ))}
      </Select>
      {availableCourses.length === 0 && (
        <FormHelperText>Aucune course disponible</FormHelperText>
      )}
    </FormControl>
  );
};
