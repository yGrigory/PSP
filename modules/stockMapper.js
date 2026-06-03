const DEFAULT_ZONE = "Акватория Северного морского пути";
const DEFAULT_ETA = "По данным диспетчера";
const DEFAULT_RISK = "Уточняется";

export function mapStockToService(stock) {
  return {
    id: stock.id,
    title: stock.title,
    short: stock.text,
    description: stock.text,
    eta: stock.eta || DEFAULT_ETA,
    zone: stock.zone || DEFAULT_ZONE,
    risk: stock.risk || DEFAULT_RISK,
    image: stock.src
  };
}

