import {
  useDataProvider,
  useGetList,
  useGetMany,
  SelectInput,
} from "react-admin";
import { useEffect, useState } from "react";

export const SelectEquipeWithLycee = (props: any) => {
  const { data: equipes, isLoading } = useGetList("equipes", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "nom", order: "ASC" },
  });

  const lyceeIds = equipes?.map((eq: any) => eq.lyceeId) || [];
  const { data: lycees } = useGetMany("lycees", { ids: lyceeIds });

  const [choices, setChoices] = useState([]);

  useEffect(() => {
    if (equipes && lycees) {
      const lyceeMap = Object.fromEntries(
        lycees.map((lycee: any) => [lycee.id, lycee.nom]),
      );
      const combined = equipes.map((eq: any) => ({
        id: eq.id,
        name: `${eq.nom} - ${lyceeMap[eq.lyceeId] || "?"}`,
      }));
      setChoices(combined);
    }
  }, [equipes, lycees]);

  return (
    <SelectInput
    source={props.source} // <-- obligatoire !
      {...props}
      choices={choices}
      optionText="name"
      optionValue="id"
      isLoading={isLoading}
    />
  );
};
