export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date | null;
  reminder?: Date | null;
  isEditing?: boolean;
  category?: string;
  tags?: string[];
  recurrence?: 'daily' | 'weekly' | 'monthly';
  notes?: string;
}
