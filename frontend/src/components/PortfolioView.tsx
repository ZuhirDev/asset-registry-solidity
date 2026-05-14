import { formatEther } from "ethers";
import type { OwnedAsset } from "../blockchain/assets";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Package, Tag, RefreshCcw, TrendingUp, Landmark, Activity } from "lucide-react";

interface PortfolioViewProps {
  myAssets: OwnedAsset[];
  processingId: string | null;
  quantities: Record<string, string>;
  onSell: (asset: OwnedAsset) => void;
  onQuantityChange: (id: string, value: string) => void;
}

export function PortfolioView({
  myAssets,
  processingId,
  quantities,
  onSell,
  onQuantityChange
}: PortfolioViewProps) {
  // Calcular valor total de la cartera
  const totalValue = myAssets.reduce((acc, asset) => {
    return acc + (asset.price * asset.myBalance);
  }, 0n);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 📊 Resumen Ejecutivo del Broker */}
      <section className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white/[0.02] border-white/5 relative overflow-hidden group transition-all hover:bg-white/[0.04]">
          <div className="absolute -right-4 -top-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <TrendingUp size={100} />
          </div>
          <CardHeader className="pb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Valor Total Estimado</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter italic">{formatEther(totalValue)}</span>
              <span className="text-sm font-bold text-primary uppercase">ETH</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Calculado según precio de mercado actual</p>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/5 relative overflow-hidden group transition-all hover:bg-white/[0.04]">
          <div className="absolute -right-4 -top-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <Landmark size={100} />
          </div>
          <CardHeader className="pb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Activos en Cartera</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter italic">{myAssets.length}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Instrumentos</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 font-medium">Diversificación en tiempo real</p>
          </CardContent>
        </Card>

        <Card className="bg-white/[0.02] border-white/5 relative overflow-hidden group transition-all hover:bg-white/[0.04]">
          <div className="absolute -right-4 -top-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <Activity size={100} />
          </div>
          <CardHeader className="pb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Estado de Cuenta</p>
          </CardHeader>
          <CardContent>
            <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1 font-black uppercase tracking-widest text-[9px]">
              Verificado On-Chain
            </Badge>
            <p className="text-[10px] text-muted-foreground mt-4 font-medium italic">Sincronizado con Ethereum Network</p>
          </CardContent>
        </Card>
      </section>

      {/* 💼 Listado de Posiciones */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary/60">Posiciones Abiertas</h4>
          <div className="h-px flex-1 bg-white/5 mx-6 hidden md:block" />
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{myAssets.length} resultados</span>
        </div>

        {myAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center border-2 border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
            <div className="p-8 rounded-full bg-white/[0.02] border border-white/5 mb-8">
              <Package className="h-16 w-16 text-muted-foreground/30" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Sin Exposición al Mercado</h3>
            <p className="text-muted-foreground max-w-sm text-sm font-medium">
              Su cartera está actualmente vacía. Acceda al mercado para iniciar nuevas posiciones.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {myAssets.map(asset => {
              const assetTotalValue = asset.price * asset.myBalance;
              return (
                <Card key={asset.id.toString()} className="border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all overflow-hidden group">
                  <div className="flex flex-col lg:flex-row">
                    {/* Info del Activo */}
                    <div className="p-8 flex-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge variant="outline" className="mb-2 rounded-lg border-primary/20 text-primary uppercase text-[8px] font-black px-2 tracking-widest">
                            Instrumento Financerio
                          </Badge>
                          <CardTitle className="text-3xl font-black tracking-tighter uppercase italic">{asset.name}</CardTitle>
                          <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mt-1">{asset.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Precio Unitario</p>
                          <p className="text-xl font-black italic">{formatEther(asset.price)} ETH</p>
                        </div>
                      </div>
                    </div>

                    {/* Datos de Posesión */}
                    <div className="p-8 flex-1 flex items-center justify-around bg-black/20">
                      <div className="text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Cantidad</p>
                        <p className="text-3xl font-black text-primary tracking-tighter">{asset.myBalance.toString()}</p>
                      </div>
                      <div className="h-12 w-px bg-white/5" />
                      <div className="text-center">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">Valor Total</p>
                        <p className="text-3xl font-black tracking-tighter italic">{formatEther(assetTotalValue)} <span className="text-xs font-bold uppercase text-primary">ETH</span></p>
                      </div>
                    </div>

                    {/* Acciones de Liquidación */}
                    <div className="p-8 w-full lg:w-[350px] bg-white/[0.02] flex flex-col justify-center gap-4">
                      <div className="flex w-full items-center gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                        <Input 
                          type="number" 
                          min="1" 
                          max={asset.myBalance.toString()}
                          className="h-11 w-20 bg-transparent border-none text-xl font-black text-center focus-visible:ring-0"
                          value={quantities[`sell-${asset.id}`] || "1"}
                          onChange={(e) => onQuantityChange(`sell-${asset.id}`, e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          className="flex-1 h-11 rounded-xl border-white/10 hover:bg-white hover:text-black font-black uppercase tracking-widest text-[10px] transition-all group/btn" 
                          disabled={processingId === `sell-${asset.id}`}
                          onClick={() => onSell(asset)}
                        >
                          {processingId === `sell-${asset.id}` ? (
                            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Tag className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                          )}
                          {processingId === `sell-${asset.id}` ? "Procesando" : "Liquidar Posición"}
                        </Button>
                      </div>
                      <p className="text-[9px] text-center text-muted-foreground font-medium uppercase tracking-widest opacity-60">
                        La liquidación enviará ETH directamente a su wallet
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
