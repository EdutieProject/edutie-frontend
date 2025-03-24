interface ApiResponse<T> {
    data: T;
    error: { code: string; message: string };
    success: boolean;
}

export interface LearningSubjectManagementView {
    learningSubject: LearningSubject
    knowledgeSubjectDetails: KnowledgeSubjectDetails
}

export interface LearningSubjectLearningView {
    learningSubject: LearningSubject
    chosenRequirementId: any
    finishedActivitiesNumber: number
}

export interface LearningSubject {
    id: string
    createdOn: string
    updatedOn: string
    updatedBy: string
    createdBy: string
    authorEducator: AuthorEducator
    name: string
    requirements: Requirement[]
    knowledgeOrigin: KnowledgeOrigin
    knowledgeOriginEmpty: boolean
}

export interface AuthorEducator {
    id: string
    assignedOn: string
    ownerUserId: string
    assignedBy: AssignedBy
    type: string
}

export interface AssignedBy {
    id: string
    assignedOn: string
    ownerUserId: string
}

export interface Requirement {
    id: string
    studentObjective: string
    title: string
    ordinal: number
}

export interface KnowledgeOrigin {
    knowledgeSubjectId: string
    empty: boolean
}

export interface KnowledgeSubjectDetails {
    knowledgeSubjectReference: KnowledgeSubjectReference
    title: string
    description: string
}

export interface KnowledgeSubjectReference {
    id: string
}

export interface KnowledgeSubjectSearchView {
    knowledgeSubjectReference: KnowledgeSubjectReference
    title: string
    description: string
}

export interface KnowledgeSubjectReference {
    id: string
}

export interface LearningExperience<T> {
    id: string
    createdOn: string
    updatedOn: any
    updatedBy: any
    createdBy: string
    requirements: Requirement[]
    activity: T
    notes: Notes
    studentId: string
}

export interface Requirement {
    id: string
}

export interface SimpleProblemActivity {
    id: string
    introductionText: string
    problemText: string
    activityType: string
}

export interface Notes {
    id: string
    paragraphs: Paragraph[]
}

export interface Paragraph {
    id: string
    content: any
    ordinal: number
}

