// CustomTopToolbar.tsx
import { TopToolbar} from "react-admin";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRedirect } from "react-admin";

export const CustomTopToolbar = ({ resource }: { resource: string }) => {
  const redirect = useRedirect();

  return (
    <TopToolbar>
      {/* <SaveButton /> */}
      <Button
        onClick={() => redirect(`/${resource}`)}
        startIcon={<CloseIcon />}
        color="secondary"
        sx={{ marginLeft: 2 }}
      >
        Fermer
      </Button>
    </TopToolbar>
  );
};
