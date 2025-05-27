import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import { getPrioritizedCountryData } from './utils/applyPrioritization';
import { groups } from './data/groups';
import worldGeoJSON from './assets/world-countries.json';
import Dropdown from './components/DropDown';
import { filterCountryDataByGroup } from './filter';

function App() {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [filteredCountryData, setFilteredCountryData] = useState(new Map());


  useEffect(() => {
    const prioritizedCountryData = getPrioritizedCountryData(groups);

    if (selectedGroup !== "All") {
      const filteredData = filterCountryDataByGroup(prioritizedCountryData, selectedGroup);
      setFilteredCountryData(filteredData);
    } else {
      setFilteredCountryData(prioritizedCountryData);
    }

  }, [selectedGroup]);



  const groupNames = [...new Set(groups.map(g => g.Group))];


  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <div style={{
        position: "absolute",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        overflow: "hidden",
      }}>
        <Dropdown
          groups={groupNames}
          selected={selectedGroup}
          onChange={setSelectedGroup}
        />
      </div>
      <MapView
        countryData={filteredCountryData}
        geoJson={worldGeoJSON}
        selectedGroup={selectedGroup}
      />
    </div>
  );
}

export default App;
