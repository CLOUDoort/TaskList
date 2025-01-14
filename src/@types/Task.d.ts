declare module 'Task' {
  export interface SubtaskItem {
    id: string;
    taskId: string;
    title: string;
    details: string;
    difficulty: string;
    priority: string;
    complete: boolean;
  }

  export interface Subtask {
    [key: string]: SubtaskItem[];
  }

  export interface Task {
    id: string;
    userId: string;
    title: string;
    details: string;
    priority: string;
    progress: number;
    difficulty?: string;
    subtask?: Subtask;
    subtaskNum?: number;
    completedSubtaskNum?: number;
    createdAt: string;
    updatedAt: string;
  }

  export interface Focus {
    id: string;
    taskId: string;
    title: string;
    details: string;
    priority: string;
    difficulty: string;
  }
}
