import { Page } from "@/model/Page"
import type { ReplacementAlgorithm } from "@logic/Interface/ReplacementAlgorithm"

function selectReplacePage(
    currentFrame: Page,
    futurePageValues: number[]
): number {
    // filter out the pages that are not in the future
    const inFuture = []
    const notInFuture = currentFrame.pagesFrames.filter((page) => {
        if (futurePageValues.includes(page)) {
            inFuture.push(page)
            return false
        }
        return true
    })
    // if any of the pages are not in the future, return the first one
    if (notInFuture.length > 0) return notInFuture[0]

    // sort inFuture by the index of the page in futurePageValues
    inFuture.sort((a, b) => {
        const aIndex = futurePageValues.indexOf(a)
        const bIndex = futurePageValues.indexOf(b)
        return aIndex - bIndex
    })

    // return the last page in inFuture
    return inFuture[inFuture.length - 1]
}

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
                    // find the index of most optimal page to replace
                    const selectedIndex = selectReplacePage(
                        currentFrame,
                        pages.slice(i + 1)
                    )
                    // replace new page with the most optimal page
                    currentFrame.memoryFrames[
                        currentFrame.memoryFrames.indexOf(selectedIndex)
                    ] = pageValue

                    currentFrame.pagesFrames[
                        currentFrame.pagesFrames.indexOf(selectedIndex)
                    ] = pageValue
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
