// blockchain/contract.ts
import { ethers } from "ethers";
import abi from "../../abi.json";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

/**
 * Obtiene el provider de ethers usando MetaMask
 * @throws {Error} Si MetaMask no está disponible
 */
export function getProvider(): ethers.BrowserProvider {
  if (!window.ethereum) {
    throw new Error("MetaMask no disponible. Por favor instálalo.");
  }

  return new ethers.BrowserProvider(window.ethereum);
}

/**
 * Obtiene el signer del usuario actual
 * @throws {Error} Si no hay proveedor disponible
 */
export async function getSigner(): Promise<ethers.Signer> {
  if (!contractAddress) {
    throw new Error("Dirección del contrato no configurada");
  }

  const provider = getProvider();
  const signer = await provider.getSigner();
  
  if (!signer) {
    throw new Error("No se pudo obtener el signer. Verifica tu conexión.");
  }

  return signer;
}

/**
 * Obtiene la instancia del contrato con el signer del usuario
 * @throws {Error} Si no hay signer disponible
 */
export async function getContract(): Promise<ethers.Contract> {
  if (!contractAddress) {
    throw new Error("Dirección del contrato no configurada");
  }

  const signer = await getSigner();

  return new ethers.Contract(
    contractAddress,
    abi,
    signer
  );
}

/**
 * Obtiene el provider para lecturas sin signer
 */
export async function getReadOnlyContract(): Promise<ethers.Contract> {
  if (!contractAddress) {
    throw new Error("Dirección del contrato no configurada");
  }

  const provider = getProvider();

  return new ethers.Contract(
    contractAddress,
    abi,
    provider
  );
}