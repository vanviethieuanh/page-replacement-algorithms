import { Page } from "@model/Page"
import type { ReplacementAlgorithm } from "@logic/Interface/ReplacementAlgorithm"

export class LeastRecentlyUsed implements ReplacementAlgorithm {
    run(pages: number[], framesPerPage: number): Page[] {
        // create result 2D array pages x frames
        const fristPage = new Page()
        fristPage.isFalut = true
        fristPage.pagesFrames[0] = pages[0]
        fristPage.value = pages[0]
        fristPage.memoryFrames[0] = pages[0]
        fristPage.referenceTimes[0] = 0

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
                    // set reference time for existing page
                    const index = currentFrame.memoryFrames.indexOf(pageValue)
                    currentFrame.referenceTimes[index] = i
                } else {
                    currentFrame.isFalut = true
                    currentFrame.pagesFrames.push(pageValue)
                    currentFrame.memoryFrames.push(pageValue)
                    currentFrame.referenceTimes.push(i)
                }
            }
            // frame is full
            else {
                // check if page is already in frame
                if (currentFrame.pagesFrames.includes(pageValue)) {
                    currentFrame.isFalut = false
                    // set reference time for existing page
                    const index = currentFrame.memoryFrames.indexOf(pageValue)
                    currentFrame.referenceTimes[index] = i
                } else {
                    currentFrame.isFalut = true
                    // find the index of page that have lowest reference time
                    const minReferenceTime =
                        currentFrame.referenceTimes.indexOf(
                            Math.min(...currentFrame.referenceTimes)
                        )

                    // replace the page have lowest reference time with pageValue
                    currentFrame.pagesFrames[minReferenceTime] = pageValue
                    currentFrame.memoryFrames[minReferenceTime] = pageValue
                    currentFrame.referenceTimes[minReferenceTime] = i
                }
            }

            currentFrame.value = pageValue
            pageFrame.push(currentFrame)
        }

        return pageFrame
    }

    name: string = "Least Recently Used"
    description: string =
        "The earliest page referenced, the first page to come out."
}
