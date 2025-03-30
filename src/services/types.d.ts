interface ApiError {
    code: string;
    message: string;
}

interface ApiResponse<T> {
    data: T;
    error: ApiError;
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

export interface LearningExperience<T extends Activity> {
    id: string
    createdOn: string
    updatedOn: any
    updatedBy: any
    createdBy: string
    requirements: Requirement[]
    activity: T
    notes: LearningNotes
    studentId: string
}

export interface Requirement {
    id: string
}

export interface Activity {
    activityName: string
}

export interface SimpleProblemActivity extends Activity {
    id: string
    introductionText: string
    problemText: string
    activityType: string
}

export interface LearningNotes {
    id: string
    paragraphs: Paragraph[]
}

export interface Paragraph {
    id: string
    content: any
    ordinal: number
}


export interface LearningResult<T extends SolutionSubmission> {
    id: string
    createdOn: string
    updatedOn: any
    updatedBy: any
    createdBy: any
    learningEvaluation: LearningEvaluation
    solutionSubmission: T
    learningExperienceId: string
    studentId: string
}

export interface LearningEvaluation {
    id: string
    assessments: Assessment[]
}

export interface Assessment {
    id: string
    masteryPointsAmount: number
    elementalRequirementSnapshot: ElementalRequirementSnapshot
    feedback: Feedback
}

export interface ElementalRequirementSnapshot {
    elementalRequirementId: string
    title: string
}

export interface Feedback {
    text: string
}

export interface SimpleProblemActivitySolutionSubmission extends SolutionSubmission {
    solutionParagraphs: SolutionParagraph[]
}

export interface SolutionSubmission {
    id: string
    learningType: string
    solutionSubmissionType: string
}

export interface SolutionParagraph {
    id: string
    content: TextContent
    ordinal: number
}

export interface TextContent {
    textContentType: string
    text: string
}

