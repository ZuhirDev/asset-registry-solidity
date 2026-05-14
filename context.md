# Arquitectura y Funcionamiento de la DApp

Este documento resume los pilares técnicos que permiten la interacción entre una interfaz web y un Contrato Inteligente en la red de pruebas de Ethereum.

---

## 1. MetaMask: El Puente Web3

MetaMask actúa como un monedero (wallet) y un proveedor de identidad. Sus funciones principales en este proyecto son:

- **Gestión de Claves:**  
  Almacena la clave privada del usuario de forma segura para firmar transacciones.

- **Proveedor de Inyección:**  
  Inyecta un objeto `window.ethereum` en el navegador, permitiendo que el frontend "hable" con la blockchain.

- **Gestor de Redes:**  
  Permite al usuario conectarse específicamente a la red **Sepolia**, gestionando el saldo de ETH necesario para pagar el "Gas" (coste de computación).

---

## 2. Smart Contract y Deploy (Remix)

El corazón de la lógica de negocio reside en el contrato escrito en Solidity.

- **Entorno (Remix):**  
  Se utilizó para compilar el código a bytecode (entendible por la red) y generar el ABI (interfaz necesaria para el frontend).

- **Red Sepolia:**  
  Es una red de prueba (Testnet) de Ethereum. El despliegue aquí garantiza que el contrato es público y permanente, pero sin coste de dinero real.

- **Estructura de Datos:**  
  El contrato utiliza un `mapping` para los activos y otro para los balances de los usuarios.  
  > Es fundamental recordar que los `mapping` no son iterables; no se puede pedir una lista de claves, solo consultar un valor si conoces la clave.

---

## 3. Conexión Backend/Frontend (Ethers.js)

La comunicación se realiza mediante la librería **Ethers.js**, que utiliza dos conceptos críticos:

### A. Provider vs. Signer

- **Provider (Solo lectura):**  
  Se utiliza para consultar datos que no cambian el estado de la blockchain (como `assetCount` o detalles de un activo).  
  Es rápido y **no requiere permiso del usuario**.

- **Signer (Escritura):**  
  Se obtiene a través de MetaMask.  
  Obligatorio para funciones que modifican datos o mueven fondos (`buyAsset`, `sellAsset`).  
  Cada vez que se usa el Signer, MetaMask pide una firma al usuario.

### B. ABI y Contract Address

Para conectar con el contrato desde el frontend necesitamos:

- **Contract Address:**  
  La dirección física donde reside el contrato en Sepolia.

- **ABI (Application Binary Interface):**  
  Archivo JSON que sirve de "manual de instrucciones", indicando a Ethers qué funciones existen y qué parámetros reciben.

---

## 4. Flujo de Consulta de Activos (Lógica de Usuario)

Dado que la blockchain no permite consultar directamente "qué activos posee un usuario", implementamos este flujo:

1. **Contar:**  
   Consultamos `assetCount` para saber cuántos activos existen en total.

2. **Iterar:**  
   Ejecutamos un bucle en JavaScript que recorre cada ID (del 1 al N).

3. **Filtrar:**  
   Para cada ID, llamamos a la función `getMyBalance(id)`:
   - Si el resultado es `0`, el usuario no posee ese activo.  
   - Si es `> 0`, descargamos los detalles del activo y los añadimos a la lista del portfolio.

---

## 5. Ciclo de Vida de una Transacción (`buyAsset`)

1. **Cálculo:**  
   El frontend calcula el precio total en Wei (`1 ETH = 10^{18} Wei`).

2. **Envío:**  
   Se llama a la función `payable` del contrato pasando `msg.value`.

3. **Firma:**  
   MetaMask solicita al usuario autorizar el gasto.

4. **Espera (wait):**  
   El código espera a que la transacción sea incluida en un bloque (minada).

5. **Refresco:**  
   Una vez confirmado el recibo (`receipt`), se vuelve a ejecutar la lógica de consulta para actualizar el balance en pantalla.