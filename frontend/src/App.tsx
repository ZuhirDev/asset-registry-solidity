import { useState } from "react";
import { connectWallet } from "./blockchain/wallet";
import { getAllAssets } from "./blockchain/assets";

function App() {
  const [account, setAccount] = useState<string>("");
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clear = () => {
    setError("");
  };

  // 🟢 Conectar wallet
  const connect = async () => {
    try {
      clear();
      setLoading(true);

      const acc = await connectWallet();
      setAccount(acc);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error conectando wallet");
    } finally {
      setLoading(false);
    }
  };

  // 🟡 Cargar assets
  const loadAssets = async () => {
    try {
      clear();
      setLoading(true);

      const data = await getAllAssets();
      setAssets(data);

    } catch (err) {
      setError("Error cargando assets");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Asset Registry</h1>

      {/* WALLET */}
      <section style={{ marginBottom: "20px" }}>
        <button onClick={connect} disabled={loading}>
          {account ? "Wallet conectada" : "Conectar Wallet"}
        </button>

        {account && (
          <p>
            <b>Cuenta:</b> {account}
          </p>
        )}
      </section>

      {/* ASSETS */}
      <section style={{ marginBottom: "20px" }}>
        <button onClick={loadAssets} disabled={loading || !account}>
          {loading ? "Cargando..." : "Ver Assets"}
        </button>
      </section>

      {/* ERROR */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* LISTA DE ASSETS */}
      <section>
        {assets.length === 0 ? (
          <p>No hay assets cargados</p>
        ) : (
          <ul>
            {assets.map((asset, i) => (
              <li key={i} style={{ marginBottom: "10px" }}>
                <div><b>ID:</b> {asset.id?.toString()}</div>
                <div><b>Nombre:</b> {asset.name}</div>
                <div><b>Símbolo:</b> {asset.symbol}</div>
                <div><b>Precio:</b> {asset.price?.toString()}</div>
                <div><b>Stock:</b> {asset.stock?.toString()}</div>
                <div><b>Activo:</b> {asset.isActive ? "Sí" : "No"}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;