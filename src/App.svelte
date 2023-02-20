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
    $: faultCount = result.filter((p) => p.isFalut).length

    var fifo = new FirstInFirstOut()

    function copy(value: string) {
        navigator.clipboard.writeText(value)
    }
</script>

<div
    id="background"
    style="background-image: url(https://images.unsplash.com/photo-1516214104703-d870798883c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&q=80&w={window.innerWidth}&h={window.innerHeight});"
>
    <main>
        <div class="inputs">
            <p>Frames each page</p>
            <p>Pages</p>
            <div class="fault-column">
                <p>Faults</p>
                <button on:click={() => copy(faultCount.toString())}>
                    <i class="fa-solid fa-copy" />
                </button>
            </div>
            <input
                type="number"
                placeholder="Type in frames in each page"
                id="frames"
                bind:value={framesInput}
            />
            <input
                type="text"
                placeholder="Type in pages, separated by spaces"
                id="pages"
                bind:value={pagesInput}
            />
            <b>{faultCount}</b>
        </div>
        <div class="divider" />
        <!-- Table of result -->
        <!-- Each column is an element of result -->
        <table>
            <thead>
                <tr>
                    {#each result as page}
                        <th class="header">
                            {page.value}
                            <div
                                class="divider {!page.isFalut
                                    ? 'not-fault'
                                    : 'fault'}"
                            />
                        </th>
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

        border-radius: 10px;
        border: rgba($color: #fff, $alpha: 0.1) 1px solid;

        // drop shadow
        box-shadow: 0 0 10px rgba($color: #fff, $alpha: 0.2);

        // stretch items to fill container
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: center;

        .divider {
            height: 1px;
            width: 100%;

            margin: 1rem 0;

            background: rgba($color: #fff, $alpha: 0.1);
        }

        .inputs {
            display: grid;
            grid-template-columns: auto 1fr 150px;
            grid-template-rows: auto auto;

            padding: 1rem;

            p {
                opacity: 0.5;
            }

            .fault-column {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                gap: 0.5rem;
            }

            input {
                margin: 0 0.5rem;
            }
        }

        table {
            padding: 2rem 0;
        }
    }

    table {
        thead {
            th {
                padding: 0 1rem;
                text-align: center;

                $opacity: 0.5;

                .divider {
                    &.fault {
                        background-color: rgba($color: #fff, $alpha: $opacity);
                    }

                    &.not-fault {
                        background-color: rgba(
                            $color: #51ff25,
                            $alpha: $opacity
                        );
                        // glow effect
                        box-shadow: 0 0 5px
                            rgba($color: #51ff25, $alpha: $opacity);
                    }
                }
            }
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

    button {
        margin: 0;
        padding: 0;

        $button-size: 32px;

        color: rgba($color: white, $alpha: 0.5);
        border: rgba($color: #fff, $alpha: 0.1) 1px solid;
        background-color: transparent;

        border-radius: 5px;

        width: $button-size;
        height: $button-size;
        font-size: 1rem;

        // align icon to center
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        &:hover {
            border: rgba($color: #fff, $alpha: 0.5) 1px solid;
            color: rgba($color: white, $alpha: 1);
        }
    }
</style>
