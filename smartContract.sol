// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AssetRegistry
 * @author Zuhir El Haouzy Amrani
 * @notice Sistema avanzado de gestión de activos financieros tokenizados.
 * Este contrato implementa lógica de negocio financiera eliminando intermediarios,
 * utilizando modificadores de seguridad, el patrón Checks-Effects-Interactions 
 * y validaciones de datos para garantizar la integridad del fondo.
 */
contract AssetRegistry {

    // ==========================================
    // VARIABLES GLOBALES
    // ==========================================
    
    address public owner; 
    uint256 public assetCount;
    
    /**
     * @notice Contador total de operaciones realizadas en la plataforma.
     * @dev Mejora Opcional 3: Tracking de volumen de trading.
     */
    uint256 public totalTrades;

    // ==========================================
    // STRUCTS
    // ==========================================

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

    // ==========================================
    // MAPPINGS
    // ==========================================

    mapping(uint256 => Asset) public assets;
    mapping(address => mapping(uint256 => uint256)) public portfolios;

    // ==========================================
    // EVENTOS
    // ==========================================

    event AssetAdded(uint256 indexed assetId, string name, uint256 price, uint256 timestamp);
    event AssetUpdated(uint256 indexed assetId, uint256 newStock, uint256 timestamp);
    event PriceUpdated(uint256 indexed assetId, uint256 newPrice, uint256 timestamp);
    event AssetStatusChanged(uint256 indexed assetId, bool isActive, uint256 timestamp);
    event TradeExecuted(address indexed user, uint256 indexed assetId, uint256 quantity, bool isBuy, uint256 timestamp);
    event FundsWithdrawn(address indexed admin, uint256 amount, uint256 timestamp);

    // ==========================================
    // MODIFIADORES
    // ==========================================

    /**
     * @dev Restringe el acceso al administrador.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Error: Solo el administrador puede ejecutar esta accion.");
        _;
    }

    /**
     * @dev Mejora Opcional 2: Verifica que el activo exista antes de operar.
     * @param _assetId ID del activo a verificar.
     */
    modifier assetExists(uint256 _assetId) {
        require(_assetId > 0 && _assetId <= assetCount, "Error: El activo especificado no existe.");
        require(assets[_assetId].id != 0, "Error: Datos de activo no encontrados.");
        _;
    }

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    constructor() {
        owner = msg.sender;
    }

    // ==========================================
    // FUNCIONES ADMINISTRATIVAS
    // ==========================================

    /**
     * @notice Registra un nuevo activo financiero.
     * @dev Mejora Opcional 1: Validacion de precio y stock > 0.
     * @param _name Nombre del activo.
     * @param _symbol Simbolo ticker.
     * @param _price Precio en Wei.
     * @param _initialStock Unidades iniciales.
     */
    function addAsset(string memory _name, string memory _symbol, uint256 _price, uint256 _initialStock) public onlyOwner {
        require(_price > 0, "Error: El precio debe ser mayor a 0.");
        require(_initialStock > 0, "Error: El stock inicial debe ser mayor a 0.");

        assetCount++;
        assets[assetCount] = Asset({
            id: assetCount,
            name: _name,
            symbol: _symbol,
            price: _price,
            stock: _initialStock,
            isActive: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            createdBy: msg.sender
        });

        emit AssetAdded(assetCount, _name, _price, block.timestamp);
    }

    /**
     * @notice Actualiza el precio de un activo.
     * @param _assetId ID del activo.
     * @param _newPrice Nuevo precio (debe ser > 0).
     */
    function updatePrice(uint256 _assetId, uint256 _newPrice) public onlyOwner assetExists(_assetId) {
        require(_newPrice > 0, "Error: El nuevo precio debe ser mayor a 0.");
        
        assets[_assetId].price = _newPrice;
        assets[_assetId].updatedAt = block.timestamp;

        emit PriceUpdated(_assetId, _newPrice, block.timestamp);
    }

    /**
     * @notice Modifica el stock disponible.
     * @param _assetId ID del activo.
     * @param _newStock Nueva cantidad disponible.
     */
    function updateStock(uint256 _assetId, uint256 _newStock) public onlyOwner assetExists(_assetId) {
        assets[_assetId].stock = _newStock;
        assets[_assetId].updatedAt = block.timestamp;

        emit AssetUpdated(_assetId, _newStock, block.timestamp);
    }

    /**
     * @notice Activa o pausa la negociacion de un activo.
     * @param _assetId ID del activo.
     */
    function toggleAssetStatus(uint256 _assetId) public onlyOwner assetExists(_assetId) {
        assets[_assetId].isActive = !assets[_assetId].isActive;
        assets[_assetId].updatedAt = block.timestamp;

        emit AssetStatusChanged(_assetId, assets[_assetId].isActive, block.timestamp);
    }

    /**
     * @notice Retira los fondos de Ether del contrato.
     */
    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Error: No hay fondos disponibles.");

        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Error: La transferencia ha fallado.");

        emit FundsWithdrawn(owner, balance, block.timestamp);
    }

    // ==========================================
    // FUNCIONES TRANSACCIONALES
    // ==========================================

    /**
     * @notice Compra unidades de un activo enviando Ether.
     * @dev Mejora Opcional 5: Validacion de cantidad > 0.
     * @param _assetId ID del activo.
     * @param _quantity Unidades a adquirir.
     */
    function buyAsset(uint256 _assetId, uint256 _quantity) public payable assetExists(_assetId) {
        require(_quantity > 0, "Error: La cantidad debe ser mayor a 0.");
        
        Asset storage asset = assets[_assetId];
        require(asset.isActive, "Error: Activo pausado.");
        require(asset.stock >= _quantity, "Error: Stock insuficiente.");
        require(msg.value == asset.price * _quantity, "Error: Pago incorrecto.");

        // Efectos
        asset.stock -= _quantity;
        portfolios[msg.sender][_assetId] += _quantity;
        totalTrades++; // Incremento de volumen global

        emit TradeExecuted(msg.sender, _assetId, _quantity, true, block.timestamp);
    }

    /**
     * @notice Vende unidades de un activo y recibe Ether.
     * @dev Aplica Checks-Effects-Interactions.
     * @param _assetId ID del activo.
     * @param _quantity Unidades a vender.
     */
    function sellAsset(uint256 _assetId, uint256 _quantity) public assetExists(_assetId) {
        require(_quantity > 0, "Error: La cantidad debe ser mayor a 0.");
        require(portfolios[msg.sender][_assetId] >= _quantity, "Error: Balance insuficiente.");
        
        uint256 payout = assets[_assetId].price * _quantity;
        require(address(this).balance >= payout, "Error: Liquidez insuficiente en el contrato.");

        // Efectos
        portfolios[msg.sender][_assetId] -= _quantity;
        assets[_assetId].stock += _quantity;
        totalTrades++;

        // Interaccion
        (bool success, ) = payable(msg.sender).call{value: payout}("");
        require(success, "Error: Fallo en el pago.");

        emit TradeExecuted(msg.sender, _assetId, _quantity, false, block.timestamp);
    }

    // ==========================================
    // FUNCIONES DE CONSULTA (VIEW)
    // ==========================================

    /**
     * @notice Consulta el balance del usuario para un activo.
     * @param _assetId ID del activo.
     * @return Cantidad de unidades en posesion.
     */
    function getMyBalance(uint256 _assetId) public view returns (uint256) {
        return portfolios[msg.sender][_assetId];
    }

    /**
     * @notice Retorna los datos completos de un activo.
     * @param _assetId ID del activo.
     * @return Estructura completa del activo.
     */
    function getAsset(uint256 _assetId) public view assetExists(_assetId) returns (Asset memory) {
        return assets[_assetId];
    }

    /**
     * @notice Consulta la liquidez total en Ether del contrato.
     * @return balance Balance total en Wei (Mejora Opcional 4).
     */
    function getContractBalance() public view returns (uint256 balance) {
        return address(this).balance;
    }

    /**
     * @notice Consulta balance de terceros (auditoria).
     */
    function getPortfolioBalance(address _user, uint256 _assetId) public view returns (uint256) {
        return portfolios[_user][_assetId];
    }

    // ==========================================
    // RECEPCIÓN DE ETHER
    // ==========================================

    receive() external payable {}
}
