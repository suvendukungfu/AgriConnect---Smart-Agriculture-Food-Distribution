import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  ScanLine,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button, Card, Badge, cn } from "@agriconnect/ui";

interface CropScannerProps {
  onClose: () => void;
  cropName: string;
}

type ScanStatus = "idle" | "uploading" | "scanning" | "analyzing" | "complete";

export const CropScanner: React.FC<CropScannerProps> = ({
  onClose,
  cropName,
}) => {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [healthScore, setHealthScore] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate OpenCV Processing Pipeline
  useEffect(() => {
    if (status === "scanning") {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("analyzing");
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }

    if (status === "analyzing") {
      const timeout = setTimeout(() => {
        setStatus("complete");
        // Animate count up score
        let score = 0;
        const scoreInterval = setInterval(() => {
          score += 2;
          setHealthScore(score);
          if (score >= 88) clearInterval(scoreInterval);
        }, 20);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStatus("uploading");
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStatus("scanning");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStatus("scanning");
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScanner = () => {
    setImagePreview(null);
    setStatus("idle");
    setScanProgress(0);
    setHealthScore(0);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-2xl"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-5xl h-full max-h-[90vh] flex flex-col bg-card border border-border/50 rounded-3xl shadow-2xl overflow-hidden relative"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border/50 bg-muted/10 backdrop-blur-md relative z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <ScanLine className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
                  OpenCV Health Scanner
                  <Badge
                    variant="secondary"
                    className="bg-blue-500/10 text-blue-500 uppercase tracking-widest text-[10px] py-0 h-5"
                  >
                    Core Engine
                  </Badge>
                </h2>
                <p className="text-sm font-medium text-muted-foreground mt-0.5">
                  Analyzing {cropName} using multi-spectral simulation
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full w-10 h-10 p-0 hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Image/Scanner Viewport */}
            <div className="flex-1 bg-black/5 relative overflow-hidden flex items-center justify-center border-r border-border/20">
              {/* Idle Upload State */}
              {status === "idle" && (
                <div
                  className="w-full h-full p-8 flex flex-col items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <label
                    htmlFor="crop-image"
                    className="group w-full max-w-lg cursor-pointer"
                  >
                    <div className="border-2 border-dashed border-border/60 hover:border-primary/50 hover:bg-primary/5 rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-card rounded-2xl shadow-sm border border-border/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-primary/20 transition-all duration-500">
                        <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Upload or drop image
                      </h3>
                      <p className="text-muted-foreground font-medium mb-6">
                        High resolution JPEG/PNG recommended for accurate OpenCV
                        analysis.
                      </p>
                      <span className="inline-flex items-center justify-center rounded-md text-sm font-bold bg-primary text-primary-foreground h-11 px-8 shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-shadow">
                        Select File
                      </span>
                    </div>
                  </label>
                  <input
                    id="crop-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                  />
                </div>
              )}

              {/* Scanning / Result State */}
              {imagePreview && (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={imagePreview}
                      alt="Crop Scan"
                      className="w-full h-full object-cover rounded-xl opacity-80"
                    />
                  </div>

                  {/* OpenCV Scanning Simulation Overlay */}
                  {(status === "scanning" || status === "analyzing") && (
                    <motion.div
                      className="absolute inset-x-0 h-1 bg-primary shadow-[0_0_20px_4px_rgba(34,197,94,0.7)] z-10"
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  {/* OpenCV Bounding Boxes Overlay (Simulated Detection) */}
                  {status === "complete" && (
                    <div className="absolute inset-0 pointer-events-none p-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-emerald-400 bg-emerald-400/10 rounded-lg flex items-start p-1"
                      >
                        <span className="bg-emerald-400 text-emerald-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                          HEALTHY 98%
                        </span>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", damping: 15, delay: 0.2 }}
                        className="absolute bottom-1/3 right-1/4 w-40 h-24 border-2 border-amber-400 bg-amber-400/10 rounded-lg flex items-start p-1"
                      >
                        <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
                          DEFICIENCY 45%
                        </span>
                      </motion.div>
                    </div>
                  )}

                  {/* Scanning Status Bar overlay */}
                  {(status === "scanning" || status === "analyzing") && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 p-4 shadow-2xl flex items-center gap-4 min-w-[300px]">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-primary animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs font-bold text-white mb-2 uppercase tracking-wider">
                          <span>
                            {status === "scanning"
                              ? "Processing Matrix..."
                              : "Analyzing Features..."}
                          </span>
                          <span>{scanProgress}%</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            style={{ width: `${scanProgress}%` }}
                            transition={{ ease: "linear" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Results Panel */}
            <div className="w-full md:w-96 bg-card flex flex-col border-l border-border/10 relative overflow-hidden">
              <div className="p-6 border-b border-border/50">
                <h3 className="font-bold uppercase tracking-widest text-muted-foreground text-xs flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Analysis Report
                </h3>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                {status === "idle" || status === "uploading" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                    <ScanLine className="w-12 h-12 text-muted-foreground" />
                    <p className="font-medium">
                      Upload an image to generate a health report.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Realtime Stats Box */}
                    <Card className="p-5 border-border shadow-sm bg-linear-to-br from-card to-muted/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-2 h-full bg-primary" />
                      <div className="text-sm font-bold text-muted-foreground mb-2">
                        Overall Health Score
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-foreground">
                          {healthScore}
                        </span>
                        <span className="text-lg font-bold text-muted-foreground">
                          /100
                        </span>
                      </div>
                      {status === "complete" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-lg w-fit"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Condition is
                          Optimal
                        </motion.div>
                      )}
                    </Card>

                    {/* Detected Features skeleton/list */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        Detected Features
                      </h4>

                      {[
                        {
                          label: "Leaf Discoloration",
                          val: "Low Risk",
                          color: "text-emerald-600",
                          bg: "bg-emerald-500/10",
                        },
                        {
                          label: "Pest Damage",
                          val: "Minimal",
                          color: "text-emerald-600",
                          bg: "bg-emerald-500/10",
                        },
                        {
                          label: "Nutrient Deficiency",
                          val: "Observation",
                          color: "text-amber-600",
                          bg: "bg-amber-500/10",
                          warning: true,
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-card"
                        >
                          <span className="text-sm font-semibold">
                            {item.label}
                          </span>
                          {status === "complete" ? (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className={cn(
                                "text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1.5",
                                item.color,
                                item.bg,
                              )}
                            >
                              {item.warning && (
                                <AlertTriangle className="w-3 h-3" />
                              )}
                              {item.val}
                            </motion.div>
                          ) : (
                            <div className="w-16 h-6 rounded-md bg-muted animate-pulse" />
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-border/50 bg-muted/20">
                <Button
                  className="w-full h-12 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30"
                  disabled={status !== "complete"}
                  onClick={() => {
                    // Logic to save scan result
                    onClose();
                  }}
                >
                  Save Analysis to Log
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
                {status === "complete" && (
                  <Button
                    variant="ghost"
                    className="w-full mt-2 font-bold text-muted-foreground"
                    onClick={resetScanner}
                  >
                    Scan Another Image
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
