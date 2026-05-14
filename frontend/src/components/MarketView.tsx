import { formatEther } from "ethers";
import type { Asset } from "../blockchain/assets";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { 
  RefreshCcw, 
  ArrowUpRight,
  Globe, 
  ShieldCheck, 
  Zap,
} from "lucide-react";

interface MarketViewProps {
  assets: Asset[];
  loading: boolean;
  processingId: string | null;
  quantities: Record<string, string>;
  onBuy: (asset: Asset) => void;
  onQuantityChange: (id: string, value: string) => void;
  onRefresh: () => void;
}

export function MarketView({
  assets,
  loading,
  processingId,
  quantities,
  onBuy,
  onQuantityChange,
  onRefresh
}: MarketViewProps) {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 📊 Terminal de Estadísticas Globales */}
      <section className="grid gap-6 md:grid-cols-4">
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Estado de Red</p>
            <p className="text-sm font-black uppercase italic">Ethereum Mainnet</p>
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Activos Listados</p>
            <p className="text-sm font-black uppercase italic">{assets.length} Activos</p>
          </div>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Seguridad</p>
            <p className="text-sm font-black uppercase italic">Smart Contract Auditado</p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button 
            variant="outline" 
            onClick={onRefresh} 
            disabled={loading}
            className="rounded-full h-14 px-8 border-white/10 hover:bg-white hover:text-black font-black uppercase tracking-widest text-[11px] transition-all"
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar Terminal
          </Button>
        </div>
      </section>

      {/* 🏛️ Listado de Activos Estilo Terminal */}
      <div className="space-y-4">
        <div className="grid grid-cols-12 px-6 py-3 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] border-b border-white/5">
          <div className="col-span-4">Activo / Instrumento</div>
          <div className="col-span-2 text-center">Precio Actual</div>
          <div className="col-span-2 text-center">Disponibilidad</div>
          <div className="col-span-2 text-center">Tendencia (Sim)</div>
          <div className="col-span-2 text-right">Acción</div>
        </div>

        {loading && assets.length === 0 ? (
          Array.from({ length: 4 }).map((_, i) => <MarketRowSkeleton key={i} />)
        ) : (
          <div className="space-y-3">
            {assets.map((asset) => (
              <div 
                key={asset.id.toString()} 
                className="grid grid-cols-12 items-center px-6 py-6 rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-primary/40 hover:bg-white/[0.04] transition-all group"
              >
                {/* Info Activo */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center font-black text-primary text-xs shadow-inner">
                    {asset.symbol.slice(0, 3)}
                  </div>
                  <div>
                    <h4 className="text-lg font-black tracking-tighter uppercase italic">{asset.name}</h4>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{asset.symbol}</span>
                       <Badge variant="outline" className="text-[8px] h-4 border-primary/20 text-primary font-black uppercase px-1.5 tracking-tighter">Tokenizado</Badge>
                    </div>
                  </div>
                </div>

                {/* Precio */}
                <div className="col-span-2 text-center">
                   <p className="text-xl font-black tracking-tighter italic">{formatEther(asset.price)} <span className="text-[10px] not-italic text-primary ml-0.5">ETH</span></p>
                   <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">Por Unidad</p>
                </div>

                {/* Stock */}
                <div className="col-span-2 text-center">
                   <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                      <div className={`h-1.5 w-1.5 rounded-full ${asset.stock > 0n ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      <span className="text-xs font-black tracking-tight">{asset.stock.toString()} <span className="text-[10px] text-muted-foreground ml-0.5 uppercase">Uds</span></span>
                   </div>
                </div>

                {/* Tendencia (Mock) */}
                <div className="col-span-2 flex justify-center">
                   <div className="flex items-end gap-0.5 h-6 opacity-40 group-hover:opacity-100 transition-opacity">
                      {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="w-1 bg-primary/60 rounded-full" style={{ height: `${20 + Math.random() * 80}%` }} />
                      ))}
                      <ArrowUpRight className="h-4 w-4 text-primary ml-2 mb-1" />
                   </div>
                </div>

                {/* Acciones */}
                <div className="col-span-2 flex items-center justify-end gap-3">
                   <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/5">
                      <Input 
                        type="number" 
                        min="1" 
                        className="h-10 w-16 bg-transparent border-none text-lg font-black text-center focus-visible:ring-0"
                        value={quantities[`buy-${asset.id}`] || "1"}
                        onChange={(e) => onQuantityChange(`buy-${asset.id}`, e.target.value)}
                      />
                      <Button 
                        size="sm"
                        className="rounded-xl h-10 px-6 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/10 transition-all hover:scale-105"
                        disabled={!asset.isActive || asset.stock === 0n || processingId === `buy-${asset.id}`}
                        onClick={() => onBuy(asset)}
                      >
                        {processingId === `buy-${asset.id}` ? (
                          <RefreshCcw className="h-4 w-4 animate-spin" />
                        ) : (
                          "Invertir"
                        )}
                      </Button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MarketRowSkeleton() {
  return (
    <div className="grid grid-cols-12 items-center px-6 py-8 rounded-[32px] bg-white/[0.01] border border-white/5">
      <div className="col-span-4 flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-2xl bg-white/5" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32 bg-white/5" />
          <Skeleton className="h-3 w-16 bg-white/5" />
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-center gap-2">
        <Skeleton className="h-6 w-20 bg-white/5" />
        <Skeleton className="h-3 w-12 bg-white/5" />
      </div>
      <div className="col-span-2 flex justify-center">
        <Skeleton className="h-8 w-24 rounded-full bg-white/5" />
      </div>
      <div className="col-span-2 flex justify-center">
        <Skeleton className="h-6 w-20 bg-white/5" />
      </div>
      <div className="col-span-2 flex justify-end">
        <Skeleton className="h-12 w-32 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
