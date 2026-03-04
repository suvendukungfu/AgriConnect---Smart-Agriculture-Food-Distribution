import React from 'react';
import { AgrisCard } from '@/components/shared/AgrisCard';
import { ShieldCheck, Users, TreeDeciduous, Activity, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-foreground">
            System Administration
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Monitor regional analytics, PDS distribution, and farmer telemetry.
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard label="Registered Farmers" value="12,483" trend="+14% this month" icon={<Users className="w-5 h-5 text-blue-500" />} />
        <MetricCard label="Active Farmland (Hectares)" value="340,920" trend="Stable" icon={<TreeDeciduous className="w-5 h-5 text-emerald-500" />} />
        <MetricCard label="Predicted Gross Yield" value="42.8M Tons" trend="+5.2% YoY" icon={<TrendingUp className="w-5 h-5 text-primary" />} />
        <MetricCard label="System Health" value="99.9% API" trend="All ML models active" icon={<Activity className="w-5 h-5 text-success" />} />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Alerts / Activity */}
        <AgrisCard glass className="p-6 lg:col-span-2 min-h-[400px]">
          <h2 className="text-base font-semibold mb-6 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
            Recent Security & Distribution Alerts
          </h2>
          <div className="space-y-4">
            {[
              { id: 1, type: 'warning', msg: 'PDS Supply anomaly detected in Region 4.', time: '10m ago' },
              { id: 2, type: 'success', msg: 'ML Model "Yield_Predict_v2" successfully retrained.', time: '1h ago' },
              { id: 3, type: 'info', msg: '64 new farmers registered from Punjab district.', time: '3h ago' },
            ].map(alert => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-${alert.type}`} />
                  <span className="text-sm font-medium">{alert.msg}</span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            ))}
          </div>
        </AgrisCard>

        {/* Quick Actions */}
        <AgrisCard className="p-6 bg-secondary/5 border-secondary/20 min-h-[400px]">
          <h2 className="text-base font-semibold mb-6 text-secondary-foreground">Administrative Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-muted border border-border transition-colors text-sm font-medium">
              Manage PDS Allocations
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-muted border border-border transition-colors text-sm font-medium">
              Review Flagged Marketplace Listings
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-muted border border-border transition-colors text-sm font-medium">
              Trigger ML Batch Inference
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-muted border border-border transition-colors text-sm font-medium text-destructive mt-8">
              System Quarantine
            </button>
          </div>
        </AgrisCard>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <AgrisCard glass hoverLogic className="p-5 flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</h3>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground mt-2 font-heading tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground mt-1 font-medium">{trend}</p>
      </div>
    </AgrisCard>
  );
}
