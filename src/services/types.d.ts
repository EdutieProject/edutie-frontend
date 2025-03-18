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

