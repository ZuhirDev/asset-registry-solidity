import { getReadOnlyContract } from "./contract";

export async function getAllAssets() {
  const contract = await getReadOnlyContract();

  const count = await contract.assetCount();

  console.log("Counts", count)

  const assets = [];

  for (let i = 1; i <= Number(count); i++) {
    const asset = await contract.getAsset(i);
    assets.push(asset);
  }

  return assets;
}