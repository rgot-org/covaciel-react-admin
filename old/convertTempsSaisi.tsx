// utils/convertTempsSaisi.ts

// export function prepareQualificationData(data: any) {
//   if (data.tempsSaisi) {
//     // Remplacer "." par ":"
//     const cleanedInput = data.tempsSaisi.replace(".", ":");
//     const [minStr, secStr] = cleanedInput.split(":");

//     const minutes = parseInt(minStr, 10) || 0;
//     const secondes = parseInt(secStr, 10) || 0;

//     const totalSeconds = minutes * 60 + secondes;

//     // Format HH:MM:SS
//     const tempsFormatted = new Date(totalSeconds * 1000)
//       .toISOString()
//       .substring(11, 19);

//     return {
//       ...data,
//       temps: tempsFormatted,
//       tempsSaisi: undefined, // On enlève le champ temporaire avant envoi
//     };
//   }

//   return data;
// }
export const prepareQualificationData = (data: any) => {
  const { tempsSaisi, ...rest } = data;

  let temps = null;

  if (typeof tempsSaisi === "string" && tempsSaisi.trim() !== "") {
    // Remplacer '.' par ':' pour uniformiser
    const normalized = tempsSaisi.replace(".", ":").trim();
    const parts = normalized.split(":").map((part) => parseInt(part, 10));

    if (parts.length === 2 && parts.every((n) => !isNaN(n))) {
      const [min, sec] = parts;
      const totalSeconds = min * 60 + sec;
      const hh = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, "0");
      const mm = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const ss = (totalSeconds % 60).toString().padStart(2, "0");
      temps = `${hh}:${mm}:${ss}`;
    }
  }

  return {
    ...rest,
    temps,
  };
};
