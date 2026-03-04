import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AgrisCard } from '@/components/shared/AgrisCard';
import { Leaf, UserCircle2, ArrowRight, ShieldCheck, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'admin'>('farmer');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    await login(email, selectedRole);
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden p-4">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <AgrisCard glass className="p-8 border border-white/10 backdrop-blur-xl bg-card/40">
          
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-8 space-y-2">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 border border-primary/20 shadow-inner">
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">AgriConnect</h1>
            <p className="text-muted-foreground text-sm font-medium">Securing the Food Distribution Future</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            
            {/* Role Selection */}
            <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
              <button
                type="button"
                onClick={() => setSelectedRole('farmer')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  selectedRole === 'farmer' 
                    ? 'bg-background text-foreground shadow-sm ring-1 ring-border dropdown-shadow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <UserCircle2 className="w-4 h-4" /> Farmer
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  selectedRole === 'admin' 
                    ? 'bg-background text-foreground shadow-sm ring-1 ring-border dropdown-shadow' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Administrator
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={selectedRole === 'admin' ? "admin@agriconnect.gov" : "farmer@region.in"}
                    className="w-full bg-input/40 border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Password
                  </label>
                  <button type="button" className="text-xs text-primary font-medium hover:underline">Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-input/40 border border-border rounded-xl py-3 pl-10 pr-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl py-3.5 px-4 flex justify-between items-center transition-all disabled:opacity-70 group shadow-lg shadow-primary/20"
            >
              <span>{isLoading ? 'Authenticating...' : `Sign In as ${selectedRole === 'admin' ? 'Admin' : 'Farmer'}`}</span>
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center border-t border-border/50 pt-6">
            <p className="text-xs text-muted-foreground font-medium">
              Don't have an account? <button type="button" className="text-primary hover:underline">Register your farm</button>
            </p>
          </div>

        </AgrisCard>
      </motion.div>
    </div>
  );
}
