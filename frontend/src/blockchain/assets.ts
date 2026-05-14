// src/blockchain/assets.ts
import { getContract, getReadOnlyContract } from "./contract";

// 🟡 LEER: Obtener todos los assets (Gratis, no requiere firma)
export async function getAllAssets() {
  const contract = await getReadOnlyContract();
  const count = await contract.assetCount();
  
  const assets = [];

  for (let i = 1; i <= Number(count); i++) {
    const asset = await contract.assets(i);
    assets.push(asset);
  }

  return assets;
}

// 🟢 ESCRIBIR: Comprar un asset (Requiere firma, gas y enviar ETH)
export async function buyAsset(id: number, quantity: number, pricePerUnitWei: string) {
  const contract = await getContract();

  // Calculamos el precio total en Wei (Precio unitario * Cantidad)
  // Usamos BigInt porque los números en Wei son demasiado grandes para JavaScript normal
  const totalPrice = BigInt(pricePerUnitWei) * BigInt(quantity);

  // Llamamos a la función del Smart Contract (asumo que se llama 'buyAsset')
  // El último parámetro { value: ... } es el msg.value en Solidity (los ETH que envías)
  const tx = await contract.buyAsset(id, quantity, {
    value: totalPrice
  });

  console.log("Transacción de compra enviada. Esperando confirmación...", tx.hash);

  // Esperamos a que la transacción se mine en la blockchain
  const receipt = await tx.wait();
  console.log("¡Compra confirmada!", receipt);
  
  return receipt;
}

// 🔴 ESCRIBIR: Vender un asset (Requiere firma y gas, pero no envías ETH, los recibes)
export async function sellAsset(id: number, quantity: number) {
  const contract = await getContract();

  // Llamamos a la función del Smart Contract (asumo que se llama 'sellAsset')
  const tx = await contract.sellAsset(id, quantity);

  console.log("Transacción de venta enviada. Esperando confirmación...", tx.hash);

  // Esperamos a que la transacción se mine en la blockchain
  const receipt = await tx.wait();
  console.log("¡Venta confirmada!", receipt);
  
  return receipt;
}