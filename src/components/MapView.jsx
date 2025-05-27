import { MapContainer, TileLayer } from 'react-leaflet';
import CountryLayer from './CountryLayer';

const MapView = ({ countryData, geoJson, selectedGroup }) => (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: "100vh", width: "100vw" }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CountryLayer countryData={countryData} geoJson={geoJson} selectedGroup={selectedGroup} />
    </MapContainer>
);

export default MapView;
