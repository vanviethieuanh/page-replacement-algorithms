import { Page } from "../model/Page"
import type { ReplacementAlgorithm } from "./ReplacementAlgorithm"

export class FirstInFirstOut implements ReplacementAlgorithm {
    run(pages: number[], framesPerPage: number): Page[] {
        // create result 2D array pages x frames
        const fristPage = new Page()
        fristPage.isFalut = true
        fristPage.pagesFrames[0] = pages[0]
        fristPage.value = pages[0]
        fristPage.memoryFrames[0] = pages[0]

        const pageFrame: Page[] = [fristPage]
        for (let i = 1; i < pages.length; i++) {
            const pageValue = pages[i]
            const currentFrame = structuredClone(
                pageFrame[pageFrame.length - 1]
            )

            // check if frame is full
            if (currentFrame.pagesFrames.length < framesPerPage) {
                // check if page is already in frame
                if (currentFrame.pagesFrames.includes(pageValue)) {
                    currentFrame.isFalut = false
                } else {
                    currentFrame.isFalut = true
                    currentFrame.pagesFrames.push(pageValue)
                    currentFrame.memoryFrames.push(pageValue)
                }
            }
            // frame is full
            else {
                // check if page is already in frame
                if (currentFrame.pagesFrames.includes(pageValue)) {
                    currentFrame.isFalut = false
                } else {
                    currentFrame.isFalut = true
                    const lastPop = currentFrame.pagesFrames.shift()
                    currentFrame.pagesFrames.push(pageValue)

                    // replace lastPop with pageValue in memoryFrames
                    const index = currentFrame.memoryFrames.indexOf(lastPop)
                    currentFrame.memoryFrames[index] = pageValue
                }
            }

            currentFrame.value = pageValue
            pageFrame.push(currentFrame)
            console.log(currentFrame)
        }

        return pageFrame
    }

    name: string = "First In First Out"
    description: string =
        "The first page that enters the memory is the first page to be removed from the memory."
}
