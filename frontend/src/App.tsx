import { useState, useCallback } from "react";
import { connectWallet } from "./blockchain/wallet";
import { getAllAssets, getMyOwnedAssets, buyAsset, sellAsset } from "./blockchain/assets";
import type { Asset, OwnedAsset } from "./blockchain/assets";

// Shadcn UI Components
import { Button } from "./components/ui/button";

// Components
import { Navbar } from "./components/Navbar";
import { Layout } from "./components/Layout";
import { MarketView } from "./components/MarketView";
import { PortfolioView } from "./components/PortfolioView";
import { AboutView } from "./components/AboutView";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { BarChart3 } from "lucide-react";

export default function App() {
  const [currentTab, setCurrentTab] = useState("market");
  const [account, setAccount] = useState<string>("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [ownedAssets, setOwnedAssets] = useState<OwnedAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, string>>({});

  // 🔄 Cargar datos del mercado y del usuario
  const loadData = useCallback(async (userAccount: string) => {
    try {
      setLoading(true);
      const allAssets = await getAllAssets();
      setAssets(allAssets);

      if (userAccount) {
        const myOwned = await getMyOwnedAssets();
        setOwnedAssets(myOwned);
      }
    } catch (error: any) {
      console.error("Error loading data:", error);
      toast.error("Error al sincronizar con la blockchain");
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔌 Conectar Wallet
  const handleConnect = async () => {
    try {
      const acc = await connectWallet();
      setAccount(acc);
      toast.success("Wallet conectada correctamente");
      loadData(acc);
    } catch (error: any) {
      toast.error(error.message || "Error al conectar la wallet");
    }
  };

  // 🛒 Manejar Compra
  const handleBuy = async (asset: Asset) => {
    const qty = quantities[`buy-${asset.id}`] || "1";
    if (Number(qty) <= 0) return toast.error("Cantidad de inversión inválida");

    const id = `buy-${asset.id}`;
    setProcessingId(id);
    try {
      await buyAsset(Number(asset.id), Number(qty), asset.price);
      toast.success(`Inversión de ${qty} ${asset.symbol} completada con éxito`);
      setQuantities(prev => ({ ...prev, [id]: "1" }));
      await loadData(account);
    } catch (error: any) {
      toast.error(error.message || "Error al procesar la compra");
    } finally {
      setProcessingId(null);
    }
  };

  // 💰 Manejar Venta
  const handleSell = async (asset: OwnedAsset) => {
    const qty = quantities[`sell-${asset.id}`] || "1";
    if (Number(qty) <= 0) return toast.error("Cantidad de liquidación inválida");

    const id = `sell-${asset.id}`;
    setProcessingId(id);
    try {
      await sellAsset(Number(asset.id), Number(qty));
      toast.success(`Liquidación de ${qty} ${asset.symbol} ejecutada correctamente`);
      setQuantities(prev => ({ ...prev, [id]: "1" }));
      await loadData(account);
    } catch (error: any) {
      toast.error(error.message || "Error al procesar la venta");
    } finally {
      setProcessingId(null);
    }
  };

  const handleQuantityChange = (id: string, value: string) => {
    setQuantities(prev => ({ ...prev, [id]: value }));
  };

  // Determinar el contenido basado en la pestaña actual
  const renderContent = () => {
    switch (currentTab) {
      case "market":
        return (
          <MarketView
            assets={assets}
            loading={loading}
            processingId={processingId}
            quantities={quantities}
            onBuy={handleBuy}
            onQuantityChange={handleQuantityChange}
            onRefresh={() => loadData(account)}
          />
        );
      case "portfolio":
        return (
          <PortfolioView
            myAssets={ownedAssets}
            processingId={processingId}
            quantities={quantities}
            onSell={handleSell}
            onQuantityChange={handleQuantityChange}
          />
        );
      case "about":
        return <AboutView />;
      default:
        return null;
    }
  };

  // Títulos dinámicos según el tab
  const getLayoutTitle = () => {
    if (currentTab === "market") return "Terminal de Mercado";
    if (currentTab === "portfolio") return "Mi Cartera";
    return "Sobre el Proyecto";
  };

  const getLayoutSubtitle = () => {
    if (currentTab === "market") return "Ejecución de órdenes y monitorización de activos on-chain";
    if (currentTab === "portfolio") return "Análisis de posiciones y gestión de liquidez on-chain";
    return "Arquitectura y visión del ecosistema descentralizado";
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
      <Toaster position="bottom-right"/>

      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        account={account}
        onConnect={handleConnect}
        loading={loading}
      />

      {currentTab !== "about" ? (
        <Layout
          title={getLayoutTitle()}
          subtitle={getLayoutSubtitle()}
        >
          {!account ? (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-700">
              <div className="mb-10 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 relative">
                <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
                <BarChart3 className="h-20 w-20 text-primary relative z-10" />
              </div>
              <h2 className="text-5xl font-black mb-6 tracking-tighter uppercase italic">
                Acceso Restringido
              </h2>
              <p className="text-muted-foreground max-w-lg mb-10 text-lg font-medium leading-relaxed">
                Para interactuar con el mercado y gestionar sus activos, debe conectar su wallet de Ethereum (MetaMask).
              </p>
              <Button 
                onClick={handleConnect} 
                size="lg" 
                className="rounded-2xl px-16 h-16 font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/20 hover:scale-105 transition-all active:scale-95"
              >
                Conectar Ahora
              </Button>
            </div>
          ) : (
            renderContent()
          )}
        </Layout>
      ) : (
        <div className="py-12">
           <AboutView />
        </div>
      )}
    </div>
  );
}