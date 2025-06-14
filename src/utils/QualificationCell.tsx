// QualificationCell.tsx
import {
  useRecordContext,
  useDataProvider,
  useRefresh,
  useGetList,
} from "react-admin";
import { useGetListLive } from "@react-admin/ra-realtime";
import { useEffect, useState } from "react";
import { IconButton, Tooltip, Typography, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

type Props = {
  seanceId: number;
  seanceLabel: string;
};

export const QualificationCell = ({ seanceId, seanceLabel }: Props) => {
  const record = useRecordContext();
  const navigate = useNavigate();
  const [scoreData, setScoreData] = useState<any>(null);

  const { data, refetch } = useGetList("score", {
    filter: { vehiculeId: record.id, seanceId },
    pagination: { page: 1, perPage: 1 },
    sort: { field: "seanceId", order: "ASC" },
  });

  useEffect(() => {
    refetch();
    if (data && data.length > 0) {
      setScoreData(data[0]);
    } else {
      setScoreData(null);
    }
  }, [data]);

  if (!record) return null;

  const handleCreateClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // éviter d'ouvrir la fiche véhicule
    if (scoreData) {
      navigate(`/qualifications/${scoreData.id}`);
    } else {
      navigate(`/qualifications/create`, {
        state: {
          record: {
            vehiculeId: record.id,
            seance_qualifID: seanceId,
          },
        },
      });
    }
  };

  if (scoreData) {
    return (
      <Tooltip title={`Modifier qualification - ${seanceLabel}`}>
        <Link underline="hover" component="button" onClick={handleCreateClick}>
          <Typography variant="body2" align="center">
            {Number(scoreData.score).toFixed(2)}
          </Typography>
        </Link>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={`Créer qualification - ${seanceLabel}`}>
        <IconButton onClick={handleCreateClick} size="small">
          <AddIcon color="success" />
        </IconButton>
      </Tooltip>
    );
  }
};
