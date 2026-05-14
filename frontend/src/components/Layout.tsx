import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Page Header (Title/Subtitle) */}
        {(title || subtitle) && (
          <div className="text-center space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
            {title && (
              <h2 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase italic">
                {title.split(' ').map((word, i) => (
                  <span key={i} className={i === title.split(' ').length - 1 ? "text-primary underline decoration-primary/30 underline-offset-8" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground font-medium tracking-wide">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
      
      <footer className="border-t border-white/5 py-10 bg-black/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">
            © 2026 AssetRegistry. Soluciones Financieras Seguras en Blockchain.
          </p>
        </div>
      </footer>
    </div>
  );
}