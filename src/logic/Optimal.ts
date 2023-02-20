import { Page } from "../model/Page"
import type { ReplacementAlgorithm } from "./ReplacementAlgorithm"

// OPT
export class Optimal implements ReplacementAlgorithm {
    run(pages: number[], framesPerPage: number): Page[] {
        // create result 2D array pages x frames
        const fristPage = new Page()
        fristPage.isFalut = true
        fristPage.pagesFrames[0] = pages[0]
        fristPage.value = pages[0]
        fristPage.memoryFrames[0] = pages[0]

        const pageFrame: Page[] = [fristPage]
        for (let i = 1; i < pages.length; i++) {
            // Implementing
        }

        return pageFrame
    }

    name: string = "Least Recently Used"
    description: string =
        "The earliest page referenced, the first page to come out."
}
