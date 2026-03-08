import React from 'react';
import { Card, Button } from '@agriconnect/ui';
import { Calendar, Bell, Clock, ArrowRight } from 'lucide-react';
import { Task } from '@agriconnect/types';

interface TaskReminderProps {
  tasks: Task[];
}

export const TaskReminderWidget: React.FC<TaskReminderProps> = ({ tasks }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold font-heading">Upcoming Tasks</h3>
        <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex gap-4 items-start p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-border transition-all cursor-pointer group">
            <div className={`p-3 rounded-xl ${task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
               {task.category === 'irrigation' ? <Bell className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
               <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">{task.title}</h4>
               <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{task.description}</p>
               <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] font-bold text-muted-foreground">{new Date(task.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</span>
               </div>
            </div>
            <div className="self-center">
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:text-primary transition-all" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
