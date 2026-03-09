import React, { useState } from 'react';
import { Card, Button, Badge } from '@agriconnect/ui';
import { ScanLine, History, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { CropScanner } from '../../crops/components/CropScanner';

export const DiseaseScannerPage: React.FC = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Mock scan history
  const scanHistory = [
    { id: 1, crop: 'Wheat (Plot A)', date: 'Today, 09:41 AM', result: 'Healthy 98%', status: 'success' },
    { id: 2, crop: 'Mustard (Plot C)', date: 'Yesterday, 14:20 PM', result: 'Nutrient Deficiency 45%', status: 'warning' },
    { id: 3, crop: 'Rice (Plot B)', date: 'Mar 06, 11:15 AM', result: 'Leaf Rust Detected 85%', status: 'error' },
  ];

  return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <ScanLine className="w-8 h-8 text-primary" />
              Disease Scanner
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">AI-powered multi-spectral leaf analysis (MobileNetV2 CNN Engine).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-full">
          
          {/* Main Action Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <Card className="p-10 border-border/50 bg-linear-to-br from-card to-primary/5 flex flex-col items-center justify-center text-center relative overflow-hidden group min-h-[400px]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
              
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                <div className="w-24 h-24 rounded-full bg-background border border-primary/30 flex items-center justify-center mb-6 shadow-xl shadow-primary/20 relative z-10 group-hover:scale-110 transition-transform duration-500">
                  <ScanLine className="w-10 h-10 text-primary" />
                </div>
              </motion.div>

              <h2 className="text-2xl font-bold mb-3 relative z-10">Initiate Field Scan</h2>
              <p className="text-muted-foreground max-w-md mb-8 relative z-10">
                Upload leaf imagery or capture directly from your device camera. Our AI engine will run OpenCV checks and CNN inference to detect 40+ known pathogens.
              </p>

              <Button size="lg" className="rounded-xl px-10 h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all relative z-10" onClick={() => setIsScannerOpen(true)}>
                <Search className="w-5 h-5 mr-2" />
                Open Scanner Model
              </Button>
            </Card>
          </div>

          {/* History Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Card className="p-6 h-full flex flex-col border-border/50 bg-card/50 backdrop-blur-xl">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <History className="w-5 h-5 text-muted-foreground" />
                    Scan Log
                  </h3>
               </div>

               <div className="space-y-4 flex-1 overflow-y-auto">
                 {scanHistory.map((scan) => (
                   <div key={scan.id} className="p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-muted/30 transition-colors">
                     <p className="font-bold text-sm mb-1">{scan.crop}</p>
                     <p className="text-xs text-muted-foreground mb-3">{scan.date}</p>
                     <Badge 
                        variant="outline" 
                        className={`text-xs uppercase tracking-wider font-bold border-0 px-2 py-1 ${
                          scan.status === 'success' ? 'bg-emerald-500/10 text-emerald-600' :
                          scan.status === 'warning' ? 'bg-amber-500/10 text-amber-600' :
                          'bg-red-500/10 text-red-600'
                        }`}
                      >
                       {scan.result}
                     </Badge>
                   </div>
                 ))}
               </div>
               
               <Button variant="outline" className="w-full mt-4 text-muted-foreground font-bold">
                 View Full Database
               </Button>
            </Card>
          </div>

        </div>

        {/* Existing Scan Modal Re-use */}
        {isScannerOpen && (
          <CropScanner 
            cropName="Selected Field Sample" 
            onClose={() => setIsScannerOpen(false)} 
          />
        )}

      </div>
  );
};
