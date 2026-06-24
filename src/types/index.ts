export interface UserStory {
  id: string;
  role: string;
  goal: string;
  benefit: string;
  acceptanceCriteria: string[];
  priority: "must-have" | "should-have" | "nice-to-have";
}

export interface MVPFeature {
  feature: string;
  reason: string;
}

export interface MVPScope {
  included: MVPFeature[];
  excluded: MVPFeature[];
}

export interface ArchComponent {
  name: string;
  type: string;
  description: string;
  communicatesWith: string[];
  techChoice: string;
}

export interface Architecture {
  overview: string;
  pattern: string;
  components: ArchComponent[];
  storageNote: string;
}

export interface DBField {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  foreignKey?: string;
  unique?: boolean;
  defaultValue?: string;
  notes?: string;
}

export interface DBTable {
  name: string;
  description: string;
  fields: DBField[];
  indexes?: string[];
}

export interface DBSchema {
  tables: DBTable[];
  relationships: string[];
}

export interface SprintTask {
  id: string;
  title: string;
  type: string;
  storyPoints: number;
  assignedTo: string;
  dependsOn?: string[];
}

export interface SprintEpic {
  epic: string;
  tasks: SprintTask[];
}

export interface Sprint {
  sprintNumber: number;
  goal: string;
  epics: SprintEpic[];
}

export interface SprintBoard {
  sprints: [Sprint, Sprint];
}

export interface GenerateResponse {
  sessionId: string;
  projectIdea: string;
  generatedAt: string;
  storageHash?: string;
  userStories: UserStory[];
  mvpScope: MVPScope;
  architecture: Architecture;
  dbSchema: DBSchema;
  sprintBoard: SprintBoard;
}

export interface ApiSuccess<T> {
  success: true;
  status: number;
  data: T;
}

export interface ApiError {
  success: false;
  status: number;
  message: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;