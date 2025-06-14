import { regex, required, TextInput } from "react-admin";

export const CustomTimeInput = () => {
  const validateTime = [
    required("Champ requis"),
    regex(/^00:[0-5]\d:[0-5]\d$/, "Format invalide. Utilisez m:ss (ex: 1:30)"),
  ];

  return (
    <TextInput
      validate={validateTime}
      source="temps"
      label="Temps (min:sec ou min.sec)"
      helperText="Ex: 1:30 pour 1 min 30 sec"
      parse={(value) => {
        if (!value || typeof value !== "string") return null;
        const match = value.match(/^(\d+)[.:](\d{2})$/);
        if (!match) return value;
        const [_, min, sec] = match;
        const mm = String(parseInt(min, 10)).padStart(2, "0");
        const ss = String(parseInt(sec, 10)).padStart(2, "0");
        return `00:${mm}:${ss}`;
      }}
      format={(value) => {
        if (!value || typeof value !== "string") return "";
        const parts = value.split(":");
        if (parts.length !== 3) return value;
        const [hh, mm, ss] = parts;
        const min = parseInt(hh || "0", 10) * 60 + parseInt(mm || "0", 10);
        return `${min}:${ss}`;
      }}
      placeholder="mm:ss ou mm.ss"
    />
  );
};
