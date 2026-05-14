import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ShieldCheck, Zap, Globe, BarChart3, Lock, Users, Code2, Database } from "lucide-react";

export function AboutView() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <Badge variant="outline" className="rounded-full border-primary/20 text-primary px-4 py-1 font-bold tracking-widest uppercase text-[10px]">
          Protocolo v1.0.0
        </Badge>
        <h3 className="text-4xl font-black tracking-tighter uppercase italic">
          Sobre <span className="text-primary underline underline-offset-8 decoration-primary/30">AssetRegistry</span>
        </h3>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Un ecosistema de inversión descentralizado diseñado para la tokenización, compra y venta de activos financieros con transparencia absoluta.
        </p>
      </section>

      {/* Core Features Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe size={80} />
          </div>
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-black uppercase tracking-tight">Tokenización Real</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Permite la representación digital de fondos, acciones y bonos directamente en la red Ethereum, eliminando la necesidad de intermediarios tradicionales.
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Lock size={80} />
          </div>
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-black uppercase tracking-tight">Seguridad Bancaria</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Implementa el patrón de diseño <strong>Checks-Effects-Interactions</strong> para prevenir ataques de reentrada y garantizar que los fondos estén siempre seguros.
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <BarChart3 size={80} />
          </div>
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-black uppercase tracking-tight">Auditoría On-Chain</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Cada operación genera un evento inmutable en la blockchain, permitiendo una trazabilidad total y auditoría en tiempo real para todos los participantes.
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={80} />
          </div>
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Code2 className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-black uppercase tracking-tight">Trading Directo</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground text-sm leading-relaxed">
            Motor de intercambio directo mediante Ether. Los usuarios pueden comprar activos al contrato y liquidarlos instantáneamente según el precio de mercado.
          </CardContent>
        </Card>
      </div>

      {/* Technical Specs */}
      <section className="space-y-6 pt-6">
        <h4 className="text-sm font-black uppercase tracking-[0.3em] text-primary/60 text-center">Especificaciones Técnicas</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2">
            <Database className="h-5 w-5 text-primary/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Solidity</span>
            <span className="text-xs font-black">v0.8.20</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Seguridad</span>
            <span className="text-xs font-black italic uppercase">Patrón CEI</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2">
            <Code2 className="h-5 w-5 text-primary/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Network</span>
            <span className="text-xs font-black uppercase italic">Ethereum VM</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center gap-2">
            <Lock className="h-5 w-5 text-primary/40" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Licencia</span>
            <span className="text-xs font-black uppercase italic">MIT</span>
          </div>
        </div>
      </section>

      {/* Academic Warning */}
      <footer className="p-6 rounded-[32px] bg-primary/5 border border-primary/10 text-center">
        <p className="text-xs font-bold text-primary italic uppercase tracking-wider">
          ⚠️ Este proyecto es de carácter académico y no está destinado a producción ni uso financiero real.
        </p>
      </footer>
    </div>
  );
}
