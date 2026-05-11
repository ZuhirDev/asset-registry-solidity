# 📖 Documentación Técnica: AssetRegistry

Esta documentación proporciona un análisis detallado del Smart Contract `AssetRegistry`, diseñado para la gestión de activos financieros tokenizados en la red Ethereum.

---

## 🏗️ 1. Arquitectura de Datos

### 1.1 Variables de Estado
*   `owner`: Dirección del administrador con privilegios elevados.
*   `assetCount`: Contador incremental que actúa como generador de IDs para nuevos activos.
*   `totalTrades`: Contador global de operaciones (compras y ventas) realizadas.

### 1.2 Estructura `Asset`
Representa un activo financiero único en la plataforma.
| Atributo | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `uint256` | Identificador único autoincremental. |
| `name` | `string` | Nombre legal o comercial del activo. |
| `symbol` | `string` | Ticker o símbolo financiero (ej: GOLD, APPL). |
| `price` | `uint256` | Precio por unidad expresado en **Wei**. |
| `stock` | `uint256` | Cantidad de unidades disponibles para la venta. |
| `isActive` | `bool` | Interruptor de operatividad del activo. |
| `createdAt` | `uint256` | Timestamp del bloque de creación. |
| `updatedAt` | `uint256` | Timestamp de la última modificación de estado. |
| `createdBy` | `address` | Dirección del administrador que registró el activo. |

---

## 🛡️ 2. Modificadores (Modifiers)

### `onlyOwner`
Restringe la ejecución de una función únicamente a la dirección almacenada en `owner`.
*   **Error**: "Error: Solo el administrador puede ejecutar esta accion."

### `assetExists(uint256 _assetId)`
Verifica que el ID proporcionado corresponda a un activo existente en el mapping.
*   **Error**: "Error: El activo especificado no existe."

---

## ⚙️ 3. Funciones del Contrato

### 3.1 Funciones Administrativas (Solo Owner)

#### `addAsset(string _name, string _symbol, uint256 _price, uint256 _initialStock)`
Registra un nuevo activo.
*   **Validaciones**: El precio y el stock inicial deben ser mayores a cero.
*   **Efecto**: Incrementa `assetCount` y emite `AssetAdded`.

#### `updatePrice(uint256 _assetId, uint256 _newPrice)`
Modifica el valor de mercado de un activo.
*   **Validaciones**: El nuevo precio debe ser mayor a cero.
*   **Efecto**: Actualiza `price` y `updatedAt`. Emite `PriceUpdated`.

#### `updateStock(uint256 _assetId, uint256 _newStock)`
Ajusta manualmente el inventario disponible.
*   **Efecto**: Emite `AssetUpdated`.

#### `toggleAssetStatus(uint256 _assetId)`
Cambia el estado de `isActive` (booleano inverso). Permite pausar el trading de un activo en caso de emergencia o mantenimiento.

#### `withdrawFunds()`
Transfiere todo el Ether acumulado en el contrato a la dirección del `owner`.
*   **Seguridad**: Utiliza `call` con verificación de éxito para evitar pérdida de fondos.

---

### 3.2 Funciones Transaccionales (Públicas)

#### `buyAsset(uint256 _assetId, uint256 _quantity) payable`
Permite a un usuario adquirir unidades de un activo enviando Ether.
*   **Requisitos**:
    1. Activo debe estar activo (`isActive`).
    2. Stock suficiente.
    3. `msg.value` debe ser exactamente igual a `price * _quantity`.
*   **Efectos**: Reduce stock del activo y aumenta el balance del usuario en el mapping `portfolios`.

#### `sellAsset(uint256 _assetId, uint256 _quantity)`
Permite a un usuario devolver activos al contrato y recibir el pago en Ether.
*   **Requisitos**:
    1. El usuario debe poseer al menos la cantidad de unidades indicadas.
    2. El contrato debe tener liquidez suficiente para cubrir el `payout`.
*   **Seguridad**: Aplica **Checks-Effects-Interactions**. Primero actualiza los balances internos y luego realiza la transferencia externa de Ether.

---

### 3.3 Funciones de Consulta (View)

*   `getMyBalance(uint256 _assetId)`: Retorna el balance del llamador (`msg.sender`) para un activo.
*   `getAsset(uint256 _assetId)`: Retorna la estructura completa del activo.
*   `getContractBalance()`: Retorna el balance total de ETH en el contrato.
*   `getPortfolioBalance(address _user, uint256 _assetId)`: Permite consultar el balance de cualquier dirección (útil para auditorías externas).

---

## 🔔 4. Eventos (Trazabilidad)

El contrato emite eventos para cada cambio de estado significativo, facilitando la integración con aplicaciones frontend:
1.  `AssetAdded`: Registro de nuevo activo.
2.  `AssetUpdated`: Cambio en stock.
3.  `PriceUpdated`: Cambio en precio.
4.  `AssetStatusChanged`: Cambio en disponibilidad.
5.  `TradeExecuted`: Registro de compra/venta (incluye `isBuy` como booleano).
6.  `FundsWithdrawn`: Retiro de fondos por el administrador.

---

## 🔒 5. Seguridad Implementada

1.  **Validación de Entrada**: Uso intensivo de `require` para filtrar transacciones inválidas.
2.  **Control de Acceso**: Modificadores para proteger funciones críticas.
3.  **Lógica de Pagos**: Uso de `payable` y `address(this).balance` para una gestión precisa del Ether.
4.  **Patrón CEI**: Los efectos sobre el estado ocurren *antes* de las interacciones externas (transferencias) para mitigar riesgos de reentrancia.
5.  **Fallback**: Función `receive()` habilitada para aceptar donaciones o depósitos directos de liquidez.

---
© 2026 AssetRegistry System - Documentación para Entorno Académico.
