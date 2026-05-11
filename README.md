# 📘 AssetRegistry Smart Contract  
### Sistema de gestión de activos financieros tokenizados en Solidity

---

## 🧾 1. Información General

| Campo | Valor |
|------|------|
| **Nombre del Contrato** | AssetRegistry |
| **Versión Solidity** | ^0.8.20 |
| **Licencia** | MIT |
| **Autor** | [NOMBRE DEL ALUMNO] |
| **Entorno** | Remix IDE / Remix VM / Sepolia Testnet |

---

## 🎯 2. Objetivo del Proyecto

Este proyecto consiste en un Smart Contract en Solidity que simula una plataforma de inversión descentralizada donde los usuarios pueden comprar y vender activos utilizando Ether (ETH).

### 🧠 Objetivo académico

Demostrar conocimientos en:

- Solidity y Smart Contracts  
- Blockchain y almacenamiento on-chain  
- Gestión de activos digitales  
- Transacciones con Ether  
- Eventos y trazabilidad  
- Seguridad básica  

---

## ⚙️ 3. Características del Sistema

✔ Registro de activos financieros  
✔ Compra/venta con ETH  
✔ Gestión de carteras  
✔ Actualización de precios  
✔ Control administrativo (owner)  
✔ Eventos en blockchain  
✔ Trazabilidad con timestamps  

---

## 🏗️ 4. Arquitectura del Smart Contract

---

## 👤 4.1 Variables Globales

"address public owner;  
uint256 public assetCount;"

📌 Descripción:
- owner → administrador del contrato  
- assetCount → contador de activos  

---

## 📦 4.2 Struct: Asset

"  
struct Asset {
    uint256 id;
    string name;
    string symbol;
    uint256 price;
    uint256 stock;
    bool isActive;
    uint256 createdAt;
    uint256 updatedAt;
    address createdBy;
}
"

📌 Representa cada activo financiero dentro del sistema.

---

## 🗂️ 4.3 Mappings

### 📊 Activos

"mapping(uint256 => Asset) public assets;"

---

### 💼 Carteras de usuarios

"mapping(address => mapping(uint256 => uint256)) public portfolios;"

📌 Estructura lógica:

usuario → activo → cantidad

---

## 📡 5. Eventos

"
event AssetAdded(...);
event AssetUpdated(...);
event PriceUpdated(...);
event AssetStatusChanged(...);
event TradeExecuted(...);
event FundsWithdrawn(...);
"

📌 Permiten registrar acciones en blockchain para auditoría.

---

## 🔐 6. Seguridad

### Modifier onlyOwner

"modifier onlyOwner()"

✔ Control de acceso administrativo  
✔ require(msg.sender == owner)

---

### Buenas prácticas

- Uso de require()  
- Checks-Effects-Interactions  
- Validación de liquidez  
- Uso de block.timestamp  
- Control de acceso  

---

## 🏁 7. Constructor

"
constructor()
"

📌 Inicializa el contrato:

- owner = msg.sender  

---

## 🏛️ 8. Funciones Administrativas

---

### ➕ addAsset()

📌 Crea un nuevo activo  
✔ Solo owner  
✔ Incrementa assetCount  
✔ Emite evento AssetAdded  

---

### 💰 updatePrice()

📌 Actualiza precio del activo  
✔ Solo owner  
✔ Emite PriceUpdated  

---

### 📦 updateStock()

📌 Modifica stock disponible  
✔ Solo owner  

---

### ⏯️ toggleAssetStatus()

📌 Activa o pausa un activo  

---

### 🏦 withdrawFunds()

📌 Retira todo el ETH del contrato  
✔ Solo owner  

---

## 💱 9. Funciones Transaccionales

---

### 🛒 buyAsset()

📌 Compra activos con ETH  

✔ payable  
✔ msg.value == price * quantity  

Flujo:

Validación → Pago → Actualización → Evento

---

### 💸 sellAsset()

📌 Venta de activos al contrato  

✔ Checks-Effects-Interactions  
✔ Verificación de saldo usuario  
✔ Transferencia de ETH  

---

## 📊 10. Funciones View

---

### 👤 getMyBalance()

Devuelve activos del usuario

---

### 📦 getAsset()

Devuelve información completa del activo

---

### 🏦 getContractBalance()

Devuelve ETH almacenado

---

### 📊 getPortfolioBalance()

Devuelve balance por activo y usuario

---

## ⚡ 11. Receive Function

"
receive() external payable {}
"

📌 Permite recibir ETH directamente

---

## ⏱️ 12. Timestamps

Se utiliza:

"block.timestamp"

Aplicado en:

- Creación de activos  
- Actualización de precios  
- Transacciones  
- Eventos  

---

## 📡 13. Seguridad General

✔ Validación de inputs  
✔ Control de acceso  
✔ Liquidez del contrato  
✔ Orden correcto de ejecución  
✔ Prevención de reentrancy básica  

---

## 🧠 14. Conceptos de Solidity utilizados

- contract  
- struct  
- mapping  
- modifier  
- constructor  
- events  
- payable  
- require  
- msg.sender  
- msg.value  
- address(this).balance  
- view  
- block.timestamp  
- receive  

---

## 🧪 15. Entorno de desarrollo

- Remix IDE  
- Solidity ^0.8.20  
- Remix VM / Sepolia Testnet  

---

## 🎓 16. Conclusión

Este Smart Contract simula una plataforma financiera descentralizada que permite gestionar activos, operar con Ether y automatizar transacciones sin intermediarios.

El sistema garantiza:

✔ Transparencia  
✔ Trazabilidad  
✔ Automatización  
✔ Seguridad básica  
✔ Gestión descentralizada  





---

DESARROLLAR UN SMART CONTRACT EN SOLIDITY PARA REMIX IDE

OBJETIVO GENERAL

Desarrollar un Smart Contract en Solidity orientado a la gestión de activos financieros tokenizados, utilizando Remix IDE como entorno de desarrollo. El contrato debe simular una plataforma básica de inversión donde los usuarios puedan comprar y vender activos utilizando Ether.

El proyecto NO está orientado a producción real ni a despliegues comerciales. Se trata de una práctica académica cuyo objetivo es demostrar conocimientos sobre:

* Solidity
* Smart Contracts
* Blockchain
* Gestión de datos on-chain
* Transacciones con Ether
* Seguridad básica
* Eventos y almacenamiento

---

## REQUISITOS GENERALES

El contrato debe:

1. Almacenar datos complejos y modificables.
2. Permitir consultas públicas.
3. Incluir transacciones monetarias usando Ether.
4. Tener lógica de negocio realista.
5. Estar completamente comentado.
6. Seguir buenas prácticas básicas de Solidity.
7. Incluir timestamps y trazabilidad temporal.
8. Estar organizado por secciones.
9. Utilizar eventos para registrar acciones importantes.
10. Implementarse en Solidity 0.8.x.

---

## NOMBRE DEL CONTRATO

AssetRegistry

---

## CABECERA OBLIGATORIA

El contrato debe comenzar con:

1. SPDX License Identifier
2. pragma solidity
3. Comentario general NatSpec

Ejemplo esperado:

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**

* @title AssetRegistry
* @author NOMBRE DEL ALUMNO
* @notice Sistema de gestión de activos financieros tokenizados.
*
* OBJETIVOS:
* * Permitir registrar activos financieros.
* * Permitir compra y venta usando Ether.
* * Registrar balances de usuarios.
* * Simular operaciones de inversión en blockchain.
*
* JUSTIFICACIÓN:
* Este contrato demuestra cómo los Smart Contracts permiten automatizar
* operaciones financieras sin intermediarios, garantizando transparencia,
* trazabilidad y ejecución automática.
  */

---

## ESTRUCTURA GENERAL DEL CONTRATO

El contrato debe dividirse claramente en secciones comentadas:

1. Variables globales
2. Structs
3. Mappings
4. Eventos
5. Modifiers
6. Constructor
7. Funciones administrativas
8. Funciones transaccionales
9. Funciones de consulta
10. Funciones auxiliares
11. Recepción de Ether

Cada sección debe estar claramente separada mediante comentarios.

---

## VARIABLES GLOBALES

Debe existir una variable owner:

address public owner;

Descripción:

* Representa el administrador del contrato.
* Debe asignarse automáticamente al desplegar el contrato.
* Solo el owner podrá ejecutar funciones administrativas.

También debe existir:

uint256 public assetCount;

Descripción:

* Contador total de activos registrados.
* Se incrementa automáticamente al crear nuevos activos.

---

## STRUCT PRINCIPAL: Asset

Debe existir un struct llamado Asset.

Campos obligatorios:

1. uint256 id

   * Identificador único del activo.

2. string name

   * Nombre del activo.

3. string symbol

   * Símbolo financiero.

4. uint256 price

   * Precio del activo en Wei.

5. uint256 stock

   * Cantidad disponible para compra.

6. bool isActive

   * Indica si el activo puede comercializarse.

7. uint256 createdAt

   * Timestamp de creación del activo.

8. uint256 updatedAt

   * Timestamp de última modificación.

9. address createdBy

   * Dirección que creó el activo.

---

## MAPPINGS

1. Mapping principal de activos

mapping(uint256 => Asset) public assets;

Función:

* Relaciona IDs con estructuras Asset.

2. Mapping de carteras

mapping(address => mapping(uint256 => uint256)) public portfolios;

Función:

* Guarda la cantidad de activos que posee cada usuario.

Estructura conceptual:

usuario -> activo -> cantidad

---

## EVENTOS

El contrato debe registrar eventos relevantes.

Eventos obligatorios:

1. AssetAdded
2. AssetUpdated
3. PriceUpdated
4. AssetStatusChanged
5. TradeExecuted
6. FundsWithdrawn

Ejemplo conceptual:

event AssetAdded(
uint256 indexed assetId,
string name,
uint256 price,
uint256 timestamp
);

Todos los eventos deben incluir timestamp.

---

## MODIFIER

Debe existir:

modifier onlyOwner()

Función:

* Restringe acceso administrativo.
* Verifica que msg.sender == owner.

Debe utilizar require() con mensaje de error personalizado.

---

## CONSTRUCTOR

El constructor debe:

1. Asignar owner = msg.sender
2. Inicializar configuraciones básicas si fueran necesarias.

---

## FUNCIONES ADMINISTRATIVAS

1. addAsset()

Permite crear nuevos activos.

Parámetros:

* nombre
* símbolo
* precio
* stock inicial

Debe:

* Incrementar assetCount
* Crear el struct
* Guardar timestamps
* Guardar creador
* Emitir evento

Restricción:

* Solo owner

---

2. updatePrice()

Permite actualizar el precio.

Debe:

* Validar existencia del activo
* Actualizar updatedAt
* Emitir evento

Restricción:

* Solo owner

---

3. updateStock()

Permite modificar stock manualmente.

Debe:

* Validar activo
* Actualizar timestamp
* Emitir evento

Restricción:

* Solo owner

---

4. toggleAssetStatus()

Activa o pausa un activo.

Debe:

* Invertir booleano isActive
* Emitir evento

Restricción:

* Solo owner

---

5. withdrawFunds()

Permite retirar Ether acumulado.

Debe:

* Transferir balance completo al owner
* Emitir evento

Restricción:

* Solo owner

---

## FUNCIONES TRANSACCIONALES

1. buyAsset()

Debe ser payable.

Parámetros:

* assetId
* quantity

Debe:

1. Verificar que el activo exista.
2. Verificar que esté activo.
3. Verificar stock suficiente.
4. Verificar que msg.value coincida exactamente con:
   price * quantity
5. Reducir stock.
6. Aumentar balance del usuario.
7. Emitir evento.
8. Registrar timestamp.

Conceptos obligatorios:

* msg.sender
* msg.value
* payable
* require()

---

2. sellAsset()

Permite vender activos al contrato.

Debe:

1. Verificar que el usuario posea suficientes unidades.
2. Calcular payout.
3. Verificar liquidez suficiente del contrato.
4. Actualizar balances antes de transferir Ether.
5. Enviar Ether al usuario.
6. Emitir evento.

Debe seguir patrón:
Checks -> Effects -> Interactions

---

## FUNCIONES VIEW

1. getMyBalance()

Devuelve:

* cantidad de activos que posee msg.sender.

---

2. getAsset()

Devuelve:

* todos los datos relevantes de un activo.

---

3. getContractBalance()

Devuelve:

* Ether almacenado en el contrato.

---

4. getPortfolioBalance()

Devuelve:

* balance de un usuario para un activo específico.

---

## FUNCIÓN RECEIVE

Debe existir:

receive() external payable {}

Objetivo:

* Permitir que el contrato reciba Ether directamente.

---

## TIMESTAMPS

El contrato debe usar block.timestamp.

Debe registrarse:

1. Fecha de creación de activos.
2. Fecha de modificación.
3. Fecha de operaciones.
4. Fecha en eventos importantes.

---

## SEGURIDAD

El contrato debe incluir medidas básicas:

1. Validaciones require().
2. Restricción de acceso.
3. Verificación de liquidez.
4. Actualización de estado antes de transferencias.
5. Prevención básica de reentrancy mediante:
   Checks-Effects-Interactions.

---

## COMENTARIOS

TODO el contrato debe estar comentado.

Deben utilizarse:

1. Comentarios normales:
   //
   /* */

2. Comentarios NatSpec:
   /**

   * @notice
   * @dev
   * @param
   * @return
     */

Cada función importante debe tener explicación.

---

## ESTILO Y ORGANIZACIÓN

El código debe:

* Estar correctamente indentado.
* Usar nombres descriptivos.
* Tener secciones separadas.
* Ser legible.
* Mantener coherencia de nombres.
* Utilizar inglés técnico en variables y funciones.

---

## CONCEPTOS DE SOLIDITY QUE DEBEN APARECER

El contrato debe demostrar uso de:

* contract
* struct
* mapping
* modifier
* constructor
* events
* payable
* transfer o call
* require
* msg.sender
* msg.value
* address(this).balance
* view
* storage
* memory
* block.timestamp

---

## ENTORNO DE DESARROLLO

El contrato debe desarrollarse y probarse en:

Remix IDE

Compilador recomendado:
0.8.20

Entorno de pruebas:
Remix VM

---

## OBJETIVO ACADÉMICO FINAL

El resultado final debe demostrar comprensión de:

* Programación en Solidity
* Gestión de estado blockchain
* Interacción con Ether
* Modelado de datos
* Seguridad básica
* Eventos blockchain
* Arquitectura de Smart Contracts
* Automatización financiera simple
