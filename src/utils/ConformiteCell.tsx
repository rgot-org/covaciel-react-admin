import { useEffect, useState } from "react";
import {
  IconButtonWithTooltip,
  useDataProvider,
  useNotify,
  useRecordContext,
} from "react-admin";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import AddIcon from "@mui/icons-material/Add";

export const ConformiteCell = () => {
  const record = useRecordContext();
  const navigate = useNavigate();
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const [hasConformite, setHasConformite] = useState<boolean | null>(null);

  useEffect(() => {
    if (!record) return;

    dataProvider
      .getOne("conformite", { id: record.id })
      .then(() => setHasConformite(true))
      .catch(() => setHasConformite(false));
  }, [record, dataProvider]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // éviter d'ouvrir la fiche véhicule
    if (!record) return;

    if (hasConformite) {
      navigate(`/conformite/${record.id}`);
    } else {
      navigate(`/conformite/create?vehiculeId=${record.id}`);
    }
  };

  if (hasConformite === null || !record) return null;

  return (
    <IconButtonWithTooltip label="Conformité" onClick={handleClick}>
      {hasConformite ? <ThumbUpIcon /> : <AddIcon />}
    </IconButtonWithTooltip>
  );
};
