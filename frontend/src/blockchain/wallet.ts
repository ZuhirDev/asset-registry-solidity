// blockchain/wallet.ts

/**
 * Conecta la wallet del usuario usando MetaMask
 * @returns {Promise<string>} La dirección de la cuenta conectada
 * @throws {Error} Si MetaMask no está instalado o el usuario rechaza la conexión
 */
export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error(
      "MetaMask no está instalado. Por favor instala la extensión."
    );
  }

  try {
    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts",
    }) as string[];

    if (!accounts || accounts.length === 0) {
      throw new Error("No se pudo obtener ninguna cuenta.");
    }

    return accounts[0].toLowerCase();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("User rejected")) {
        throw new Error("El usuario rechazó la conexión.");
      }
    }
    throw error;
  }
}

/**
 * Obtiene la red actual del proveedor
 * @returns {Promise<string>} El nombre de la red
 */
export async function getCurrentNetwork(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask no está disponible.");
  }

  try {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    return chainId as string;
  } catch (error) {
    throw new Error("No se pudo obtener la red actual.");
  }
}