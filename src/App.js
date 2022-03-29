import React, { useState, useMemo, useEffect } from 'react'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import { useDispatch, useSelector } from "react-redux";
import 'mapbox-gl/dist/mapbox-gl.css';
import CITIES from './cities.json'
import { fetchData } from './redux/actions/dataAction';


export default function App() {
  const dispatch = useDispatch();
  const [popupInfo, setPopupInfo] = useState(null);
  const data = useSelector((state) => state.data);
  const TOKEN = "pk.eyJ1Ijoicm9oZXIiLCJhIjoiY2wxY2hkODB2MDIwbDNqbnh5dnJ2NGJ3MiJ9.rMXAfTkGCYmd5e36GChUwA"
  const STYLE = "https://api.maptiler.com/maps/basic/style.json?key=7zS0XPhY84Ps2yhgaGcS"

  const handlePopup = (item) => {
    dispatch(fetchData())
    setPopupInfo(item)
  }

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
        >
          <Pin onClick={() => handlePopup(city)} />
        </Marker>
      )),
    []
  );
  return (
    <div>
      <Map
        style={{ height: '100vh', width: '100vw' }}
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,

        }}
        mapStyle={STYLE}
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              <h1 className='font-bold'>Title from API : <span className='text-red-500 capitalize'>{data.data?.title}</span> </h1>
              {popupInfo.city + ", " + popupInfo.state}
            </div>
            <img alt='' className='w-full' src={popupInfo.image} />
          </Popup>
        )}
      </Map>


    </div>
  )
}



const Pin = ({ onClick }) => {
  return (
    <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}
