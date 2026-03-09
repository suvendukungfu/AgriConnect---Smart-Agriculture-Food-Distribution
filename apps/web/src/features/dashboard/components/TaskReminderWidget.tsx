import React from 'react';
import { Card, Badge, cn } from '@agriconnect/ui';
import { useTasks } from '@agriconnect/hooks';
import { CheckCircle2, Circle, Clock, Droplets, Bug, Sprout, Tractor } from 'lucide-react';
import { format, isToday, isTomorrow } from 'date-fns';

export const TaskReminderWidget: React.FC = () => {
  const { data, isLoading } = useTasks();

  if (isLoading || !data) {
    return (
      <Card className="p-6 h-full flex flex-col justify-center animate-pulse bg-muted/20">
        <div className="h-6 w-32 bg-muted rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-muted rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'irrigation': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'pest_control': return <Bug className="w-4 h-4 text-red-500" />;
      case 'fertilizer': return <Sprout className="w-4 h-4 text-emerald-500" />;
      case 'harvest': return <Tractor className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'low': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTaskDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  return (
    <Card className="p-6 h-full border-border/50 bg-card/50 backdrop-blur-xl hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          Scheduled Tasks
        </h3>
        <Badge variant="secondary" className="bg-primary/10 text-primary">{data.length}</Badge>
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
        {data.map((task) => (
          <div key={task.id} className="group flex gap-3 p-3 rounded-2xl border border-border/40 bg-background/50 hover:bg-muted/30 transition-colors cursor-pointer">
            <button className="mt-1 shrink-0 text-muted-foreground group-hover:text-primary transition-colors">
              {task.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Circle className="w-5 h-5" />}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className={cn("font-bold text-sm truncate", task.status === 'completed' && "line-through text-muted-foreground")}>
                  {task.title}
                </p>
                <Badge variant="outline" className={cn("px-2 py-0 h-5 text-[10px] uppercase tracking-wider font-bold", getPriorityColor(task.priority))}>
                  {task.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{task.description}</p>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold bg-muted/50 px-2 py-1 rounded-md">
                  {getCategoryIcon(task.category)}
                  {task.category.replace('_', ' ')}
                </span>
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  {formatTaskDate(task.dueDate)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Helper component since we already used Calendar name
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
  </svg>
);
