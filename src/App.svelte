<script lang="ts">
    import { FirstInFirstOut } from "@/logic/FirstInFirstOut"
    import type { ReplacementAlgorithm } from "@logic/ReplacementAlgorithm"

    let pagesInput: string = "1 3 5 2 0 2 6 2 3 0 4 0 2"
    $: pages = pagesInput
        .split(" ")
        .map((p) => parseInt(p))
        .filter((p) => !isNaN(p))

    let framesInput: string = "3"
    $: frames = parseInt(framesInput)

    let algo: ReplacementAlgorithm = new FirstInFirstOut()
    $: result = algo.run(pages, frames)

    var fifo = new FirstInFirstOut()
</script>

<div
    id="background"
    style="background-image: url(https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80&w={window.innerWidth}&h={window.innerHeight});"
>
    <main>
        <input
            type="text"
            placeholder="Type in pages, separated by spaces"
            id="pages"
            bind:value={pagesInput}
        />
        <input
            type="text"
            placeholder="Type in pages, separated by spaces"
            id="pages"
            bind:value={framesInput}
        />
        <p>
            Faults:
            {algo
                .run(pages, 3)
                .map((p) => p.isFalut)
                .filter((p) => p).length}
        </p>
        <!-- Table of result -->
        <!-- Each column is an element of result -->
        <table>
            <thead>
                <tr>
                    {#each result as page}
                        <th class="header">{page.value}</th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each Array(frames) as _, index}
                    <tr>
                        {#each result as page}
                            <td>
                                {page.memoryFrames[index] ?? "|"}
                            </td>
                        {/each}
                    </tr>
                {/each}
                <tr>
                    {#each result as page}
                        <td>
                            {#if page.isFalut}
                                <span class="fault"
                                    ><i
                                        class="fa-solid fa-star-of-life"
                                    /></span
                                >
                            {:else}
                                <span class="fault" />
                            {/if}
                        </td>
                    {/each}
                </tr>
            </tbody>
        </table>
    </main>
</div>

<style lang="scss">
    #background {
        min-width: 100vw;
        min-height: 100vh;

        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    main {
        min-width: 80%;
        min-height: 300px;

        // blur background
        background-color: rgba($color: #000, $alpha: 0.05);
        backdrop-filter: blur(30px);

        border-radius: 5px;
        border: rgba($color: #fff, $alpha: 0.1) 1px solid;

        // drop shadow
        box-shadow: 0 0 5px rgba($color: #fff, $alpha: 0.2);

        padding: 1rem;

        // stretch items to fill container
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;
    }

    .fault {
        color: rgba($color: #fff, $alpha: 0.5);
        i {
            font-size: 10px;
        }
    }

    input {
        padding: 0.5rem;
        color: white;

        margin: 0;

        background-color: rgba($color: #000, $alpha: 0);
        border: rgba($color: #fff, $alpha: 0.1) 1px solid;
        border-radius: 3px;

        &:hover {
            border: rgba($color: #fff, $alpha: 0.5) 1px solid;
        }

        &:focus {
            border: rgba($color: #fff, $alpha: 0.5) 1px solid;
            outline: none;
        }
    }
</style>
