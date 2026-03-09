import React from 'react';
import { Card, Badge, Button } from '@agriconnect/ui';
import { BrainCircuit, CloudLightning, Sprout, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const FarmIntelligencePage: React.FC = () => {
  return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-primary" />
              Autonomous Intelligence
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">AI-driven actionable insights for optimal yield and risk mitigation.</p>
          </div>
          <Button size="lg" className="rounded-xl font-bold gap-2">
            <TrendingUp className="w-4 h-4" />
            Generate Full Report
          </Button>
        </div>

        {/* Top Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Actionable Insight 1: Fertilizer */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-6 h-full border-primary/20 bg-linear-to-br from-card to-primary/5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Sprout className="w-24 h-24 text-primary" />
              </div>
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3 h-3" />
                Action Required
              </Badge>
              <h3 className="text-xl font-bold mb-2">Fertilizer Optimization</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Soil NPK depletion detected in <strong>Plot B</strong>. Based on predictive modeling, applying <strong>19:19:19</strong> mix in the next 48 hours will boost yield by 8%.
              </p>
              <div className="mt-auto">
                 <Button variant="outline" className="w-full justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                   Order Fertilizer Mix
                 </Button>
              </div>
            </Card>
          </motion.div>

          {/* Actionable Insight 2: Climate */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 h-full border-amber-500/20 bg-linear-to-br from-card to-amber-500/5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <CloudLightning className="w-24 h-24 text-amber-500" />
              </div>
              <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30 mb-4 items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <AlertTriangle className="w-3 h-3" />
                Climate Risk
              </Badge>
              <h3 className="text-xl font-bold mb-2">Heat Stress Alert</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Projected heatwave next week (38°C peak). Immediate preventative irrigation recommended for shallow-rooted crops in northern plots.
              </p>
              <div className="mt-auto">
                 <Button variant="outline" className="w-full justify-center group-hover:bg-amber-500 group-hover:text-amber-50 transition-colors border-amber-500/30 text-amber-600">
                   Schedule Irrigation
                 </Button>
              </div>
            </Card>
          </motion.div>

           {/* Actionable Insight 3: Disease */}
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6 h-full border-emerald-500/20 bg-linear-to-br from-card to-emerald-500/5 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <BrainCircuit className="w-24 h-24 text-emerald-500" />
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30 mb-4 items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3 h-3" />
                Clear
              </Badge>
              <h3 className="text-xl font-bold mb-2">Disease Sentinel</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                No active disease patterns detected across main wheat plots. Continue standard preventative fungicide regimen.
              </p>
              <div className="mt-auto">
                 <Button variant="outline" className="w-full justify-center border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700">
                   Open Image Scanner
                 </Button>
              </div>
            </Card>
          </motion.div>

        </div>

      </div>
  );
};
