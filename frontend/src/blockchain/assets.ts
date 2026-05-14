// src/blockchain/assets.ts
import { getContract, getReadOnlyContract } from "./contract";

export interface Asset {
  id: bigint;
  name: string;
  symbol: string;
  price: bigint;
  stock: bigint;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
  createdBy: string;
}

export interface OwnedAsset extends Asset {
  myBalance: bigint;
}

// 🟡 LEER: Obtener todos los assets del mercado
export async function getAllAssets(): Promise<Asset[]> {
  const contract = await getReadOnlyContract();
  const count = await contract.assetCount();
  const assets: Asset[] = [];

  for (let i = 1; i <= Number(count); i++) {
    const asset = await contract.assets(i);
    assets.push({
      id: asset.id,
      name: asset.name,
      symbol: asset.symbol,
      price: asset.price,
      stock: asset.stock,
      isActive: asset.isActive,
      createdAt: asset.createdAt,
      updatedAt: asset.updatedAt,
      createdBy: asset.createdBy,
    });
  }
  return assets;
}

// 🔵 LEER: Obtener los activos que el usuario posee (CORREGIDO)
export async function getMyOwnedAssets(): Promise<OwnedAsset[]> {
  // USAMOS getContract() para que el contrato sepa quién es el msg.sender (TÚ)
  const contract = await getContract(); 
  const count = await contract.assetCount();
  const ownedAssets: OwnedAsset[] = [];

  for (let i = 1; i <= Number(count); i++) {
    // Ahora msg.sender será tu wallet de MetaMask
    const balance = await contract.getMyBalance(i);

    if (balance > 0n) { // Usamos 0n para comparar BigInt
      const asset = await contract.assets(i);
      ownedAssets.push({
        id: asset.id,
        name: asset.name,
        symbol: asset.symbol,
        price: asset.price,
        stock: asset.stock,
        isActive: asset.isActive,
        createdAt: asset.createdAt,
        updatedAt: asset.updatedAt,
        createdBy: asset.createdBy,
        myBalance: balance
      });
    }
  }
  return ownedAssets;
}

// 🔵 LEER: Balance individual (CORREGIDO)
export async function getMyAssetBalance(id: number): Promise<bigint> {
  const contract = await getContract(); // Usar Signer para reconocer al usuario
  return await contract.getMyBalance(id);
}

// 🟢 ESCRIBIR: Comprar un asset
export async function buyAsset(id: number, quantity: number, pricePerUnitWei: bigint) {
  const contract = await getContract();
  const totalPrice = pricePerUnitWei * BigInt(quantity);

  const tx = await contract.buyAsset(id, quantity, {
    value: totalPrice
  });

  return await tx.wait();
}

// 🔴 ESCRIBIR: Vender un asset
export async function sellAsset(id: number, quantity: number) {
  const contract = await getContract();
  const tx = await contract.sellAsset(id, quantity);

  return await tx.wait();
}