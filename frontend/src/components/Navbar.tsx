import { LayoutDashboard, Wallet as WalletIcon, BarChart3, Info, Wallet } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

interface NavbarProps {
  currentTab: string;
  onTabChange: (value: string) => void;
  account: string;
  onConnect: () => void;
  loading: boolean;
}

export function Navbar({ currentTab, onTabChange, account, onConnect, loading }: NavbarProps) {
  return (
    <div className="w-full border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 h-16">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2 flex-1">
          <div className="rounded-lg bg-primary p-1.5 text-primary-foreground shadow-lg shadow-primary/20">
            <BarChart3 className="h-5 w-5" />
          </div>
          <span className="text-sm font-black tracking-tighter hidden sm:inline-block uppercase italic">ASSET REGISTRY</span>
        </div>

        {/* Centered Navigation Tabs */}
        <nav className="flex items-center justify-center flex-1">
          <Tabs value={currentTab} onValueChange={onTabChange} className="w-fit">
            <TabsList className="bg-white/5 rounded-full h-11 p-1.5 border border-white/10 shadow-2xl">
              <TabsTrigger 
                value="market" 
                className="rounded-full px-5 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <LayoutDashboard className="h-3.5 w-3.5 mr-2" />
                Mercado
              </TabsTrigger>
              <TabsTrigger 
                value="portfolio" 
                className="rounded-full px-5 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <WalletIcon className="h-3.5 w-3.5 mr-2" />
                Mis Activos
              </TabsTrigger>
              <TabsTrigger 
                value="about" 
                className="rounded-full px-5 font-black uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <Info className="h-3.5 w-3.5 mr-2" />
                Proyecto
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </nav>

        {/* Wallet Connection */}
        <div className="flex items-center justify-end gap-4 flex-1">
          {account ? (
            <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-black tracking-widest uppercase text-primary">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="font-mono">{account.slice(0, 6)}...{account.slice(-4)}</span>
            </div>
          ) : (
            <Button 
              onClick={onConnect} 
              disabled={loading} 
              size="sm"
              className="rounded-full font-black uppercase tracking-widest text-[10px] h-10 px-6 shadow-xl shadow-primary/10 transition-transform hover:scale-105"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Conectar Wallet
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}