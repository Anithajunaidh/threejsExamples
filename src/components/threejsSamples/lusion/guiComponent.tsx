import React from 'react';
import DatGui, { DatNumber, DatBoolean, DatFolder } from 'react-dat-gui';

const GUI = ({ config, onChange }) => {
  const handleUpdate = (newConfig) => {
    onChange(newConfig);
  };

  return (
    <DatGui data={config} onUpdate={handleUpdate}>
      <DatFolder title="Resolution">
        <DatNumber path="SIM_RESOLUTION" label="Simulation Resolution" min={32} max={256} step={32} />
        <DatNumber path="DYE_RESOLUTION" label="Dye Resolution" min={256} max={1024} step={128} />
      </DatFolder>
      <DatFolder title="Settings">
        <DatNumber path="DENSITY_DISSIPATION" label="Density Dissipation" min={0} max={4} step={0.1} />
        <DatNumber path="VELOCITY_DISSIPATION" label="Velocity Dissipation" min={0} max={4} step={0.1} />
        <DatNumber path="PRESSURE" label="Pressure" min={0} max={1} step={0.1} />
        <DatNumber path="CURL" label="Curl" min={0} max={50} step={1} />
        <DatNumber path="SPLAT_RADIUS" label="Splat Radius" min={0.01} max={1} step={0.01} />
        <DatBoolean path="SHADING" label="Shading" />
        <DatBoolean path="COLORFUL" label="Colorful" />
        <DatBoolean path="PAUSED" label="Paused" />
      </DatFolder>
      <DatFolder title="Bloom">
        <DatBoolean path="BLOOM" label="Enabled" />
        <DatNumber path="BLOOM_INTENSITY" label="Intensity" min={0.1} max={2.0} step={0.1} />
        <DatNumber path="BLOOM_THRESHOLD" label="Threshold" min={0.0} max={1.0} step={0.1} />
      </DatFolder>
      <DatFolder title="Sunrays">
        <DatBoolean path="SUNRAYS" label="Enabled" />
        <DatNumber path="SUNRAYS_WEIGHT" label="Weight" min={0.3} max={1.0} step={0.1} />
      </DatFolder>
    </DatGui>
  );
};

export default GUI;
