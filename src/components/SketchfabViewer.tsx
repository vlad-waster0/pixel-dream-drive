// Sketchfab embed — modelos 3D reais com 360° auto-rotativo nativo.
// Mapa: id do carro -> id do modelo no Sketchfab.
export const SKETCHFAB_MODELS: Record<string, string> = {
  jesko: "e742ec27ae034c3a83de6c53ae2a9051",
};

export function SketchfabViewer({ modelId, title }: { modelId: string; title: string }) {
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
    transparent: "1",
    dnt: "1",
  });
  const src = `https://sketchfab.com/models/${modelId}/embed?${params.toString()}`;
  return (
    <iframe
      title={`${title} — 360°`}
      src={src}
      className="absolute inset-0 w-full h-full"
      frameBorder={0}
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
    />
  );
}
