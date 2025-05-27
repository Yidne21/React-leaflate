export function filterCountryDataByGroup(countryData, selectedGroup) {
  if (selectedGroup === "All") return countryData;

  const normalizedGroup = selectedGroup.trim().toLowerCase();

  return new Map(
    Array.from(countryData.entries()).filter(([, value]) => {
      return value.group?.trim().toLowerCase() === normalizedGroup;
    })
  );
}
