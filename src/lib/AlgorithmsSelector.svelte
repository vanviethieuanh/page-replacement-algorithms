<script lang="ts">
    import { createEventDispatcher } from "svelte"

    import { FirstInFirstOut } from "@logic/Implement/FirstInFirstOut"
    import { Optimal } from "@logic/Implement/Optimal"
    import { LeastRecentlyUsed } from "@logic/Implement/LeastRecentlyUsed"

    const Algorithms: {
        name: string
        shorthand?: string
        algorithm: any
        disabled?: boolean
    }[] = [
        {
            name: "First In First Out",
            shorthand: "FIFO",
            algorithm: new FirstInFirstOut(),
        },
        {
            name: "Optimal",
            shorthand: "OPT",
            algorithm: new Optimal(),
        },
        {
            name: "Least Recently Used",
            shorthand: "LRU",
            algorithm: new LeastRecentlyUsed(),
        },
    ]

    let selectedIndex: number = 0

    const dispatch = createEventDispatcher()
</script>

<div class="algo">
    <ul>
        {#each Algorithms as algorithm, index}
            <li>
                <button
                    disabled={algorithm.disabled ?? false}
                    class={selectedIndex === index ? "item selected" : "item"}
                    on:click={() => {
                        selectedIndex = index
                        dispatch("change", Algorithms[selectedIndex].algorithm)
                    }}
                >
                    {#if algorithm.shorthand}
                        <b>{algorithm.shorthand}</b> -
                    {/if}
                    {algorithm.name}
                </button>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
    }
    b {
        font-weight: 700;
    }

    .item {
        width: 100%;
        height: 100%;

        padding: 0.5rem;
        color: white;

        background-color: rgba($color: #fff, $alpha: 0.1);
        border: rgba($color: #fff, $alpha: 0.1) 1px solid;

        &.selected {
            color: #222;

            background-color: rgba($color: #fff, $alpha: 1);
            border: rgba($color: #fff, $alpha: 0.5) 1px solid;

            &:hover {
                background-color: rgba($color: #fff, $alpha: 1);
                border: rgba($color: #fff, $alpha: 0.5) 1px solid;
            }
        }
        &:hover {
            background-color: rgba($color: #fff, $alpha: 0);
            border: rgba($color: #fff, $alpha: 0.5) 1px solid;
        }
    }

    button {
        font-size: 1rem;
    }
</style>
