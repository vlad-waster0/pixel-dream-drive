import cc8s from "@/assets/cars/cc8s.jpg";
import ccr from "@/assets/cars/ccr.jpg";
import ccx from "@/assets/cars/ccx.jpg";
import ccxr from "@/assets/cars/ccxr.jpg";
import agera from "@/assets/cars/agera.jpg";
import ageraR from "@/assets/cars/agera-r.jpg";
import one1 from "@/assets/cars/one1.jpg";
import ageraRS from "@/assets/cars/agera-rs.jpg";
import regera from "@/assets/cars/regera.jpg";
import jesko from "@/assets/cars/jesko.jpg";
import jeskoAbsolut from "@/assets/cars/jesko-absolut.jpg";
import gemera from "@/assets/cars/gemera.jpg";
import cc850 from "@/assets/cars/cc850.jpg";

export interface Car {
  id: string;
  name: string;
  fullName: string;
  year: number;
  yearsProduced: string;
  image: string;
  tagline: string;
  origin: string;
  factory: string;
  units: string;
  specs: {
    engine: string;
    power: string;
    torque: string;
    weight: string;
    topSpeed: string;
    acceleration: string;
    transmission: string;
    drivetrain: string;
    length: string;
    width: string;
    height: string;
    wheelbase: string;
  };
  description: string;
  history: string;
}

export const cars: Car[] = [
  {
    id: "cc8s", name: "CC8S", fullName: "Koenigsegg CC8S", year: 2002, yearsProduced: "2002–2003",
    image: cc8s, tagline: "O início de uma lenda",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "6 unidades",
    specs: { engine: "V8 4.7L Supercharged", power: "655 hp", torque: "750 Nm", weight: "1175 kg",
      topSpeed: "390 km/h", acceleration: "3.5 s", transmission: "Manual 6 marchas", drivetrain: "RWD",
      length: "4190 mm", width: "1990 mm", height: "1070 mm", wheelbase: "2660 mm" },
    description: "O primeiro carro de produção da Koenigsegg. Definiu a linguagem de design que duraria décadas.",
    history: "Lançado oficialmente no Salão de Genebra de 2002, o CC8S foi a concretização do sonho de Christian von Koenigsegg. Bateu o recorde do Guinness para o motor de produção mais potente."
  },
  {
    id: "ccr", name: "CCR", fullName: "Koenigsegg CCR", year: 2004, yearsProduced: "2004–2006",
    image: ccr, tagline: "Quebrador de recordes",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "14 unidades",
    specs: { engine: "V8 4.7L Twin-Supercharged", power: "806 hp", torque: "920 Nm", weight: "1180 kg",
      topSpeed: "395 km/h", acceleration: "3.2 s", transmission: "Manual 6 marchas", drivetrain: "RWD",
      length: "4293 mm", width: "1996 mm", height: "1070 mm", wheelbase: "2660 mm" },
    description: "Em 2005 quebrou o recorde mundial do McLaren F1 atingindo 387,87 km/h em Nardò.",
    history: "O CCR foi o carro que colocou a Koenigsegg no topo absoluto do mundo dos hipercarros, quebrando o recorde de velocidade que pertencia ao McLaren F1 desde 1993."
  },
  {
    id: "ccx", name: "CCX", fullName: "Koenigsegg CCX", year: 2006, yearsProduced: "2006–2010",
    image: ccx, tagline: "Conformidade global",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "29 unidades",
    specs: { engine: "V8 4.7L Twin-Supercharged", power: "806 hp", torque: "920 Nm", weight: "1180 kg",
      topSpeed: "395 km/h", acceleration: "3.2 s", transmission: "Manual 6 marchas", drivetrain: "RWD",
      length: "4293 mm", width: "1996 mm", height: "1120 mm", wheelbase: "2660 mm" },
    description: "Primeiro Koenigsegg homologado para o mercado americano. Motor inteiramente próprio.",
    history: "O CCX (Competition Coupé X) celebrou o 10º aniversário do primeiro protótipo CC. Foi o primeiro a usar um motor totalmente desenvolvido in-house pela Koenigsegg."
  },
  {
    id: "ccxr", name: "CCXR", fullName: "Koenigsegg CCXR", year: 2007, yearsProduced: "2007–2010",
    image: ccxr, tagline: "Hipercarro ecológico",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "6 unidades",
    specs: { engine: "V8 4.8L Bi-Turbo Flex E85", power: "1018 hp", torque: "1060 Nm", weight: "1280 kg",
      topSpeed: "402 km/h", acceleration: "2.9 s", transmission: "Manual 6 marchas", drivetrain: "RWD",
      length: "4293 mm", width: "1996 mm", height: "1120 mm", wheelbase: "2660 mm" },
    description: "Roda com etanol E85 ou gasolina. Forbes elegeu como um dos carros mais bonitos da história.",
    history: "Ao funcionar com biocombustível E85, o CCXR pioneerou a ideia de hipercarro sustentável muito antes da hibridização ser tendência."
  },
  {
    id: "agera", name: "Agera", fullName: "Koenigsegg Agera", year: 2011, yearsProduced: "2011–2014",
    image: agera, tagline: "Avante",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "7 unidades",
    specs: { engine: "V8 5.0L Twin-Turbo", power: "947 hp", torque: "1100 Nm", weight: "1330 kg",
      topSpeed: "415 km/h", acceleration: "2.9 s", transmission: "Sequencial 7 marchas", drivetrain: "RWD",
      length: "4293 mm", width: "1996 mm", height: "1120 mm", wheelbase: "2662 mm" },
    description: "Agera significa 'agir' em sueco antigo. Um salto absoluto em design e tecnologia.",
    history: "Eleito Hipercarro do Ano pela Top Gear em 2010, o Agera introduziu o sistema de aileron triplet e novas rodas Aircore em fibra de carbono oca."
  },
  {
    id: "agera-r", name: "Agera R", fullName: "Koenigsegg Agera R", year: 2011, yearsProduced: "2011–2014",
    image: ageraR, tagline: "Recorde sobre recorde",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "18 unidades",
    specs: { engine: "V8 5.0L Twin-Turbo", power: "1140 hp", torque: "1200 Nm", weight: "1330 kg",
      topSpeed: "440 km/h", acceleration: "2.8 s", transmission: "Sequencial 7 marchas", drivetrain: "RWD",
      length: "4293 mm", width: "1996 mm", height: "1120 mm", wheelbase: "2662 mm" },
    description: "Em 2011 quebrou seis recordes Guinness em um único dia, incluindo 0–300 km/h em 14.53s.",
    history: "O Agera R foi a versão racing do Agera, com 1140 cv quando abastecido com E85. Quebrou inúmeros recordes de aceleração e foi peça central na ascensão da marca."
  },
  {
    id: "one1", name: "One:1", fullName: "Koenigsegg One:1", year: 2014, yearsProduced: "2014–2015",
    image: one1, tagline: "O primeiro Megacar",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "7 unidades",
    specs: { engine: "V8 5.0L Twin-Turbo", power: "1360 hp (1 megawatt)", torque: "1371 Nm", weight: "1360 kg",
      topSpeed: "440 km/h", acceleration: "2.8 s", transmission: "Sequencial 7 marchas", drivetrain: "RWD",
      length: "4500 mm", width: "2060 mm", height: "1145 mm", wheelbase: "2662 mm" },
    description: "Relação peso/potência 1:1 — 1360 kg para 1360 cv. Cunhou o termo 'Megacar'.",
    history: "Com exatamente 1 megawatt de potência por 1360 kg de peso, o One:1 redefiniu o que era possível em um carro de rua. Detém o recorde do circuito Suzuka."
  },
  {
    id: "agera-rs", name: "Agera RS", fullName: "Koenigsegg Agera RS", year: 2015, yearsProduced: "2015–2018",
    image: ageraRS, tagline: "O carro mais rápido do mundo",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "25 unidades",
    specs: { engine: "V8 5.0L Twin-Turbo", power: "1160 hp", torque: "1280 Nm", weight: "1395 kg",
      topSpeed: "447,19 km/h (média)", acceleration: "2.8 s", transmission: "Sequencial 7 marchas", drivetrain: "RWD",
      length: "4293 mm", width: "2050 mm", height: "1120 mm", wheelbase: "2662 mm" },
    description: "Em 4 de novembro de 2017 atingiu 457,49 km/h em Nevada, tornando-se o carro de produção mais rápido.",
    history: "Pilotado por Niklas Lilja em uma estrada pública fechada de Nevada, o Agera RS bateu o recorde mundial de velocidade média de duas direções a 447,19 km/h."
  },
  {
    id: "regera", name: "Regera", fullName: "Koenigsegg Regera", year: 2016, yearsProduced: "2016–2022",
    image: regera, tagline: "Reinar — em sueco",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "80 unidades",
    specs: { engine: "V8 5.0L Twin-Turbo + 3 motores elétricos", power: "1500 hp combinados", torque: "2000+ Nm", weight: "1590 kg",
      topSpeed: "410 km/h", acceleration: "2.8 s", transmission: "Direct Drive (sem caixa)", drivetrain: "RWD híbrido",
      length: "4560 mm", width: "2050 mm", height: "1110 mm", wheelbase: "2662 mm" },
    description: "Primeiro hipercarro híbrido da Koenigsegg. Sistema KDD elimina a transmissão tradicional.",
    history: "O Regera introduziu o revolucionário Koenigsegg Direct Drive — uma transmissão de marcha única assistida por motores elétricos, eliminando a perda de potência da caixa de câmbio convencional."
  },
  {
    id: "jesko", name: "Jesko", fullName: "Koenigsegg Jesko", year: 2020, yearsProduced: "2020–presente",
    image: jesko, tagline: "Em homenagem ao pai",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "125 unidades",
    specs: { engine: "V8 5.0L Twin-Turbo", power: "1280 hp (gasolina) / 1600 hp (E85)", torque: "1500 Nm", weight: "1420 kg",
      topSpeed: "+480 km/h (estimado)", acceleration: "2.5 s", transmission: "LST 9 marchas", drivetrain: "RWD",
      length: "4610 mm", width: "2030 mm", height: "1210 mm", wheelbase: "2700 mm" },
    description: "Nomeado em homenagem a Jesko von Koenigsegg, pai do fundador. Foco em pista.",
    history: "O Jesko apresenta a transmissão Light Speed (LST) com 9 marchas e múltiplas embreagens, permitindo trocas instantâneas. Equipado com aerodinâmica ativa avançada."
  },
  {
    id: "jesko-absolut", name: "Jesko Absolut", fullName: "Koenigsegg Jesko Absolut", year: 2020, yearsProduced: "2020–presente",
    image: jeskoAbsolut, tagline: "O Koenigsegg mais rápido de todos os tempos",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "produção limitada",
    specs: { engine: "V8 5.0L Twin-Turbo", power: "1600 hp (E85)", torque: "1500 Nm", weight: "1320 kg",
      topSpeed: "532 km/h (estimado teórico)", acceleration: "2.5 s", transmission: "LST 9 marchas", drivetrain: "RWD",
      length: "4610 mm", width: "2030 mm", height: "1210 mm", wheelbase: "2700 mm" },
    description: "Versão otimizada para velocidade máxima. Coeficiente de arrasto de apenas 0.278.",
    history: "A Koenigsegg afirma que nunca construirá um carro de rua mais rápido. O Jesko Absolut foi projetado pura e simplesmente para a velocidade máxima absoluta."
  },
  {
    id: "gemera", name: "Gemera", fullName: "Koenigsegg Gemera", year: 2020, yearsProduced: "2020–presente",
    image: gemera, tagline: "Hyper-GT de quatro lugares",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "300 unidades",
    specs: { engine: "TFG 3-cilindros 2.0L Twin-Turbo + 3 motores elétricos", power: "1700 hp combinados", torque: "2750 Nm", weight: "1850 kg",
      topSpeed: "400 km/h", acceleration: "1.9 s", transmission: "KDD Direct Drive", drivetrain: "AWD híbrido",
      length: "4975 mm", width: "1988 mm", height: "1295 mm", wheelbase: "3000 mm" },
    description: "Primeiro Mega-GT de quatro lugares do mundo. Motor TFG sem árvore de cames.",
    history: "Apresentado virtualmente em 2020 (Genebra cancelado), o Gemera prova que família e velocidade extrema podem coexistir. Pode rodar 50 km apenas em modo elétrico."
  },
  {
    id: "cc850", name: "CC850", fullName: "Koenigsegg CC850", year: 2022, yearsProduced: "2022–presente",
    image: cc850, tagline: "Tributo aos 50 anos de Christian",
    origin: "Ängelholm, Suécia", factory: "Koenigsegg Automotive AB", units: "70 unidades",
    specs: { engine: "V8 5.0L Twin-Turbo", power: "1185 hp (E85)", torque: "1385 Nm", weight: "1385 kg",
      topSpeed: "+400 km/h", acceleration: "2.5 s", transmission: "Engage Shift System (manual+automático)", drivetrain: "RWD",
      length: "4310 mm", width: "1996 mm", height: "1120 mm", wheelbase: "2662 mm" },
    description: "Reinterpretação moderna do CC8S em homenagem ao 50º aniversário de Christian von Koenigsegg.",
    history: "O CC850 combina design retrô do CC8S original com tecnologia Jesko. Sua transmissão revolucionária ESS pode operar como manual de 6 marchas ou automática de 9."
  },
];
