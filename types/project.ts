export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  tags: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}
