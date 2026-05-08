// Sketchfab embed — modelos 3D reais com 360° auto-rotativo nativo.
// Mapa: id do carro -> id do modelo no Sketchfab.
// (Modelo único livre por enquanto; reutilizado para todos até termos um por carro.)
const JESKO = "e742ec27ae034c3a83de6c53ae2a9051";
export const SKETCHFAB_MODELS: Record<string, string> = {
  cc8s: JESKO, ccr: JESKO, ccx: JESKO, ccxr: JESKO,
  agera: JESKO, "agera-r": JESKO, one1: JESKO, "agera-rs": JESKO,
  regera: JESKO, jesko: JESKO, "jesko-absolut": JESKO,
  gemera: JESKO, cc850: JESKO,
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
      {/* Carro um pouco menor: scale + recuo do iframe */}
      <iframe
        title={`${title} — 360°`}
        src={src}
        className="absolute left-1/2 top-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2"
        style={{ transform: "translate(-50%, -50%) scale(0.78)", filter, transition: "filter 500ms ease-out" }}
        frameBorder={0}
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
      />
      {/* Máscara inferior: esconde botões e logo do Sketchfab */}
      <div className="absolute left-0 right-0 bottom-0 h-20 bg-card pointer-events-none" />
      {/* Máscara lateral superior: esconde botão de share */}
      <div className="absolute right-0 top-0 w-16 h-16 bg-card pointer-events-none" />
    </div>
  );
}
