import React, { ReactNode } from 'react';
import { Leaf } from 'lucide-react';
import { Card } from '@agriconnect/ui';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8 flex flex-col items-center">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center space-y-4">
          <div className="p-3 bg-primary rounded-2xl shadow-lg ring-4 ring-primary/20">
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold font-heading tracking-tight text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground text-balanced">{subtitle}</p>}
          </div>
        </div>

        <Card className="w-full p-8 shadow-glass border-border/50 bg-card/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
           {children}
        </Card>

        {/* Footer info or Link */}
        <p className="text-center text-xs text-muted-foreground px-8 leading-relaxed">
          By continuing, you agree to AgriConnect's Terms of Service and Privacy Policy. Securely managed by our platform team.
        </p>
      </div>
    </div>
  );
};
