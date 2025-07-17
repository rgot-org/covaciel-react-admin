// import { Toolbar, SaveButton, useUpdate } from "react-admin";
// import { useRedirect, useNotify } from "react-admin";
// import { useWatch } from "react-hook-form";

// export const CustomToolbar = () => {
//   const redirect = useRedirect();
//   const notify = useNotify();
//   const record = useWatch();
//   const [update, { isPending }] = useUpdate();
//   const handleSuccess = () => {
//     if (!record)
//       throw new Error("LikeButton must be called with a RecordContext");
//     update(
//       "conformite",
//       { id: record.id, data: record },
//       {
//         onSuccess: () => {
//           notify("Conformité mise à jour", { type: "success" });
//           redirect("/vehicules");
//         },
//         onError: (error) => {
//           notify("Error: like not updated", { type: "error" });
//         },
//       },
//     );
//   };
//   return (
//     <Toolbar>
//       <SaveButton onClick={handleSuccess} />
//     </Toolbar>
//   );
// };
import {
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect,
  useResourceContext,
  useRecordContext,
  useCreate,
  useUpdate,
} from "react-admin";
import { useWatch } from "react-hook-form";

export const CustomToolbar = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const resource = useResourceContext(); // ex: "conformite"
  const record = useRecordContext(); // utile pour édition
  const formValues = useWatch(); // contient tous les champs saisis

  const [create] = useCreate();
  const [update] = useUpdate();

  const isEdit = !!record?.id;

  const handleSave = () => {
    const id = record?.id;

    const onSuccess = () => {
      notify(`${resource} ${isEdit ? "mis à jour" : "créé"} avec succès`, {
        type: "success",
      });
      if (resource === "qualifications" || resource === "conformite") {
        redirect("/vehicules");
      } else {
        redirect(`/${resource}`);
      }
      //
    };

    const onError = (error: any) => {
      notify(`Erreur lors de la sauvegarde: ${error.message}`, {
        type: "error",
      });
      //redirect("/vehicules");
    };

    if (isEdit) {
      update(resource, { id, data: formValues }, { onSuccess, onError });
    } else {
      create(resource, { data: formValues }, { onSuccess, onError });
    }
  };

  return (
    <Toolbar>
      <SaveButton
        onClick={(e) => {
          e.preventDefault(); // ← empêche le comportement natif
          handleSave();
        }}
      />
    </Toolbar>
  );
};
