import React, { useState } from 'react';
import Map, { Source, Layer, NavigationControl, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface FarmMapProps {
  farmCoordinates: number[][][]; // GeoJSON Polygon coordinates
  ndviData?: number[][]; // 2D array of NDVI values for heatmap
  showNDVI: boolean;
}

export const FarmMap: React.FC<FarmMapProps> = ({ farmCoordinates, ndviData, showNDVI }) => {
  // Center of the farm (mocked fallback)
  const initialViewState = {
    longitude: farmCoordinates[0]?.[0]?.[0] || -121.9,
    latitude: farmCoordinates[0]?.[0]?.[1] || 37.3,
    zoom: 14,
    pitch: 45,
    bearing: -17.6
  };

  const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWdyaWNvbm5lY3QiLCJhIjoiY2x4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCJ9.xxxxxxxxxx'; // Replace with real token

  const farmGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: farmCoordinates
        },
        properties: {}
      }
    ]
  };

  // Create a minimal mock heatmap GeoJSON if NDVI data exists
  const ndviGeoJSON = ndviData ? {
    type: 'FeatureCollection',
    features: ndviData.flatMap((row, y) => 
      row.map((val, x) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            initialViewState.longitude + (x - 5) * 0.001, 
            initialViewState.latitude + (y - 5) * 0.001
          ]
        },
        properties: { ndvi: val }
      }))
    )
  } : null;

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner border border-border/50 bg-muted relative">
      <Map
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
      >
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="top-right" />

        {/* Farm Boundary Layer */}
        <Source id="farm-boundary" type="geojson" data={farmGeoJSON as any}>
          <Layer
            id="farm-outline"
            type="line"
            paint={{
              'line-color': '#22c55e',
              'line-width': 3,
              'line-dasharray': [2, 1]
            }}
          />
          <Layer
            id="farm-fill"
            type="fill"
            paint={{
              'fill-color': '#22c55e',
              'fill-opacity': showNDVI ? 0.0 : 0.1
            }}
          />
        </Source>

        {/* NDVI Heatmap Layer */}
        {showNDVI && ndviGeoJSON && (
           <Source id="ndvi-heatmap" type="geojson" data={ndviGeoJSON as any}>
            <Layer
              id="ndvi-heat"
              type="heatmap"
              paint={{
                'heatmap-weight': ['interpolate', ['linear'], ['get', 'ndvi'], 0, 0, 1, 1],
                'heatmap-intensity': 1.5,
                // Color ramp from red (low NDVI/stress) to green (high NDVI/healthy)
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(0,0,0,0)',
                  0.2, '#ef4444', // Red
                  0.5, '#eab308', // Yellow
                  0.8, '#22c55e', // Green
                  1, '#15803d'    // Dark Green
                ],
                'heatmap-radius': 30,
                'heatmap-opacity': 0.7
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};
