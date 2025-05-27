import { GeoJSON } from 'react-leaflet';

const CountryLayer = ({ countryData, geoJson, selectedGroup }) => {
    const onEachCountry = (feature, layer) => {
        const countryName = feature.properties.name;
        const formattedCountryName = countryName === 'United States of America' ? 'USA' : countryName;
        const data = countryData.get(formattedCountryName);

        if (!data) return;

        layer.setStyle({
            fillColor: data.color?.toLowerCase() || 'gray',
            fillOpacity: 0.6,
            weight: 1
        });

        layer.on({
            click: () => {
                layer.bindPopup(`
          <strong>${formattedCountryName}</strong><br/>
          Group: ${data.group}<br/>
          Votes: ${data.upVotes}<br/>
          Status: ${data.threatOrOpportunity}<br/>
          Duration: ${data.startDate || 'N/A'} to ${data.endDate || 'N/A'}
        `).openPopup();
            }
        });
    };

    return <GeoJSON key={selectedGroup + '-' + [...countryData.keys()].join('-')} data={geoJson} onEachFeature={onEachCountry} />;
};

export default CountryLayer;
