export interface Questionnaire {
    _id: string,
    creator: string,
    title: string,
    questions: Question[],
}

export interface Question {
    _id: string,
    question: string,
    choices: string[],
    answer: string,
    weight: number,
}