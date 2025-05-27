export function getPrioritizedCountryData(groups) {
  const now = new Date();

  const parseDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return null;
    const [day, month, year] = dateStr.split("/").map(Number);
    if (!day || !month || !year) return null;
    return new Date(year, month - 1, day);
  };

  // Step 1: Filter groups with active date range
  const activeGroups = groups.filter((group) => {
    const start = parseDate(group.Start_Date);
    const end = parseDate(group.End_Date);
    return start && end && now >= start && now <= end;
  });

  // Step 2: Sort groups by priority
  activeGroups.sort((a, b) => {
    // Higher up-votes first
    if (b.Up_Votes !== a.Up_Votes) {
      return b.Up_Votes - a.Up_Votes;
    }

    // "Threat" comes before "Opp"
    if (
      a.Threat_OR_Opportunity === "Threat" &&
      b.Threat_OR_Opportunity !== "Threat"
    ) {
      return -1;
    }
    if (
      a.Threat_OR_Opportunity !== "Threat" &&
      b.Threat_OR_Opportunity === "Threat"
    ) {
      return 1;
    }

    // Earlier time posted comes first
    if (a.Time_Posted !== b.Time_Posted) {
      return a.Time_Posted.localeCompare(b.Time_Posted);
    }

    // Earlier start date comes first
    const aStart = parseDate(a.Start_Date);
    const bStart = parseDate(b.Start_Date);
    if (aStart && bStart && aStart.getTime() !== bStart.getTime()) {
      return aStart.getTime() - bStart.getTime();
    }

    // Earlier end date comes first
    const aEnd = parseDate(a.End_Date);
    const bEnd = parseDate(b.End_Date);
    return (aEnd?.getTime() || 0) - (bEnd?.getTime() || 0);
  });

  // Step 3: Map countries to their highest-priority group
  const countryMap = new Map();

  for (const group of activeGroups) {
    const countries =
      group.Countries_in_Group?.split(":").map((c) => c.trim()) || [];
    for (const country of countries) {
      if (!countryMap.has(country)) {
        countryMap.set(country, {
          group: group.Group,
          color: group.Display_Colour,
          upVotes: group.Up_Votes,
          threatOrOpportunity: group.Threat_OR_Opportunity,
          startDate: group.Start_Date,
          endDate: group.End_Date,
        });
      }
    }
  }
  return countryMap;
}
