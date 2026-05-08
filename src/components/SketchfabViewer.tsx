// Sketchfab embed — modelos 3D reais com 360° auto-rotativo nativo.
// Mapa: id do carro -> id do modelo Sketchfab correspondente.
export const SKETCHFAB_MODELS: Record<string, string> = {
  cc8s: "305fedf39446447fb2c6858904e503a3",         // CCR (irmão do CC8S — sem CC8S livre)
  ccr: "305fedf39446447fb2c6858904e503a3",          // Koenigsegg CCR
  ccx: "10efe5c94dd747b4a5157cfd229a8049",          // 2006 Koenigsegg CCX
  ccxr: "f52373e9d797466697666d7e88cc6128",         // 2010 CCXR Trevita
  agera: "696d7e9ace784192bdde34e874f4f047",        // 2011 Agera
  "agera-r": "41a90096ae5a4136a2a139d5ebd5849f",    // 2012 Agera R
  one1: "d21c0d3ee5094938889a26d7215b91e5",         // 2014 One:1
  "agera-rs": "1909b03f6f5041aba88426a4bde560b9",   // 2015 Agera RS
  regera: "da2a656bf0714c1caac0863786764729",       // 2015 Regera
  jesko: "c657f51fb0db43e38fea172dfa385287",        // 2020 Jesko
  "jesko-absolut": "f93822254a23482e9113df079b6d6475", // Jesko Absolut
  gemera: "d4cfb0e550e1495ba60c5275d3ce03d7",       // 2021 Gemera
  cc850: "c4f872da033944bfa3c4e44d07728806",        // 2023 CC850
};

export function SketchfabViewer({
  modelId,
  title,
  filter = "none",
}: {
  modelId: string;
  title: string;
  filter?: string;
}) {
  const params = new URLSearchParams({
    autostart: "1",
    autospin: "0.2",
    preload: "1",
    ui_infos: "0",
    ui_controls: "0",
    ui_stop: "0",
    ui_watermark: "0",
    ui_watermark_link: "0",
    ui_help: "0",
    ui_settings: "0",
    ui_inspector: "0",
    ui_annotations: "0",
    ui_fullscreen: "0",
    ui_vr: "0",
    ui_ar: "0",
    ui_hint: "0",
    ui_loading: "0",
    transparent: "1",
    dnt: "1",
  });
  const src = `https://sketchfab.com/models/${modelId}/embed?${params.toString()}`;
  return (
    <div className="absolute inset-0 overflow-hidden">
      <iframe
        title={`${title} — 360°`}
        src={src}
        className="absolute inset-0 w-full h-full"
        style={{ filter, transition: "filter 500ms ease-out" }}
        frameBorder={0}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
      {/* Máscara inferior: esconde apenas a barra de logo do Sketchfab */}
      <div className="absolute left-0 right-0 bottom-0 h-8 bg-card pointer-events-none" />
    </div>
  );
}
