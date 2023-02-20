import type { Page } from "@model/Page"

export interface ReplacementAlgorithm {
    readonly name: string
    readonly description: string
    readonly run: (pages: number[], framesPerPage: number) => Page[]
}
