export interface LearningSubject {
    id: string
    createdOn: string
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

export interface KnowledgeSubjectSearchView {
    knowledgeSubjectReference: KnowledgeSubjectReference
    title: string
    description: string
}

export interface KnowledgeSubjectReference {
    id: string
}

