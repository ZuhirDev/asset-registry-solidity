import { useState, useEffect } from "react";
import type { Asset } from "../blockchain/assets";
import { getMyAssetBalance, buyAsset, sellAsset } from "../blockchain/assets";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { formatEther } from "ethers";
import { Coins, ShoppingCart, Tag, Package, User } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface AssetCardProps {
  asset: Asset;
  account: string;
  onActionComplete: () => void;
}

export function AssetCard({ asset, account, onActionComplete }: AssetCardProps) {
  const [userBalance, setUserBalance] = useState<bigint>(0n);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  useEffect(() => {
    if (account && asset.id) {
      loadUserBalance();
    }
  }, [account, asset.id]);

  const loadUserBalance = async () => {
    try {
      const balance = await getMyAssetBalance(Number(asset.id));
      setUserBalance(balance);
    } catch (error) {
      console.error("Error loading user balance:", error);
    }
  };

  const handleBuy = async () => {
    if (!quantity || Number(quantity) <= 0) {
      toast.error("Cantidad inválida");
      return;
    }

    setLoading(true);
    try {
      await buyAsset(Number(asset.id), Number(quantity), asset.price);
      toast.success("Compra exitosa");
      setIsBuyModalOpen(false);
      onActionComplete();
      loadUserBalance();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error en la compra");
    } finally {
      setLoading(false);
    }
  };

  const handleSell = async () => {
    if (!quantity || Number(quantity) <= 0) {
      toast.error("Cantidad inválida");
      return;
    }

    setLoading(true);
    try {
      await sellAsset(Number(asset.id), Number(quantity));
      toast.success("Venta exitosa");
      setIsSellModalOpen(false);
      onActionComplete();
      loadUserBalance();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Error en la venta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg border-muted/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{asset.name}</CardTitle>
            <CardDescription className="font-mono text-xs uppercase tracking-wider">{asset.symbol}</CardDescription>
          </div>
          <Badge variant={asset.isActive ? "default" : "secondary"}>
            {asset.isActive ? "Activo" : "Pausado"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Coins size={18} />
            <span className="text-sm">Precio</span>
          </div>
          <span className="font-bold text-primary">{formatEther(asset.price)} ETH</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package size={18} />
            <span className="text-sm">Stock Disponible</span>
          </div>
          <span className="font-medium">{asset.stock.toString()}</span>
        </div>

        <div className="pt-2 border-t border-muted/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={18} />
              <span className="text-sm font-semibold">Mis Holdings</span>
            </div>
            <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/20">
              {userBalance.toString()} unidades
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 pt-2">
        <Dialog open={isBuyModalOpen} onOpenChange={setIsBuyModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="default" disabled={!asset.isActive || asset.stock === 0n}>
              <ShoppingCart className="mr-2" size={16} />
              Comprar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comprar {asset.name}</DialogTitle>
              <DialogDescription>
                Ingresa la cantidad que deseas adquirir. El costo total se debitará de tu wallet.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="buy-quantity" className="text-sm font-medium">Cantidad</label>
                <Input
                  id="buy-quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  max={asset.stock.toString()}
                />
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                Total estimado: <span className="font-bold text-primary">{(Number(formatEther(asset.price)) * Number(quantity)).toFixed(4)} ETH</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBuyModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleBuy} disabled={loading}>
                {loading ? "Procesando..." : "Confirmar Compra"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isSellModalOpen} onOpenChange={setIsSellModalOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="outline" disabled={userBalance === 0n}>
              <Tag className="mr-2" size={16} />
              Vender
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Vender {asset.name}</DialogTitle>
              <DialogDescription>
                Ingresa la cantidad que deseas vender. Recibirás el pago en ETH.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="sell-quantity" className="text-sm font-medium">Cantidad</label>
                <Input
                  id="sell-quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  max={userBalance.toString()}
                />
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                Recibirás: <span className="font-bold text-green-600">{(Number(formatEther(asset.price)) * Number(quantity)).toFixed(4)} ETH</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSellModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSell} disabled={loading}>
                {loading ? "Procesando..." : "Confirmar Venta"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
