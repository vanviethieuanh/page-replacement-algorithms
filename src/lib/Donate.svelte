<script lang="ts">
    let dialogOpen = false

    function copy(value: string) {
        navigator.clipboard.writeText(value)
    }
</script>

<div class="main">
    <button
        id="github"
        on:click={() =>
            window.open(
                "https://github.com/vanviethieuanh/page-replacement-algorithms/tree/main"
            )}
    >
        <i class="fa-brands fa-github-alt" />
        <p>Source</p>
    </button>
    <button
        id="donate"
        on:click={() => {
            dialogOpen = true
        }}
    >
        <i class="fa-solid fa-heart" />
        <p>Hảo tâm</p>
    </button>
</div>
<div class={dialogOpen ? "donate" : "donate close"}>
    <div class="donate-dialog">
        <p id="title">Hảo tâm</p>
        <button
            id="close"
            class="icon-button"
            on:click={() => {
                dialogOpen = false
            }}
        >
            <i class="fa-solid fa-xmark" />
        </button>
        <div class="momo method">
            <div class="numbers">
                <b>Momo</b>
                <p>0946 378 852</p>
            </div>
            <p>Văn Viết Hiếu Anh</p>
        </div>
        <button
            class="icon-button"
            on:click={() => copy("0946378852")}
        >
            <i class="fa-solid fa-copy" />
        </button>
        <div class="momo method">
            <div class="numbers">
                <b>TP Bank</b>
                <p>0323 731 6401</p>
            </div>
            <p>Văn Viết Hiếu Anh</p>
        </div>
        <button
            class="icon-button"
            on:click={() => copy("03237316401")}
        >
            <i class="fa-solid fa-copy" />
        </button>
    </div>
</div>
<svelte:window
    on:keydown={(event) => {
        if (event.key === "Escape") {
            dialogOpen = false
        }
    }}
/>

<style lang="scss">
    .main {
        display: flex;
        justify-content: center;
        gap: 1rem;
    }

    #close {
        margin-left: auto;
    }

    #title {
        opacity: 0.8;
    }

    .donate {
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
        backdrop-filter: blur(10px);

        display: grid;
        place-items: center;

        &.close {
            display: none;
        }
    }

    .donate-dialog {
        padding: 2rem;

        border-radius: 10px;

        background-color: rgba($color: #000, $alpha: 0.2);
        border: rgba($color: #fff, $alpha: 0.2) 1px solid;

        display: grid;
        grid-template-columns: 1fr auto;

        align-items: center;
        justify-items: start;

        gap: 1.5rem;
    }

    .icon-button {
        margin: 0;

        $button-size: 32px;

        color: rgba($color: #fff, $alpha: 0.4);
        background-color: rgba($color: #fff, $alpha: 0);
        border: rgba($color: #fff, $alpha: 0) 1px solid;

        border-radius: 5px;

        width: $button-size;
        height: $button-size;

        cursor: pointer;

        display: grid;
        place-content: center;

        &:hover {
            color: rgba($color: #fff, $alpha: 0.8);
            border: rgba($color: #fff, $alpha: 0) 1px solid;
            background-color: rgba($color: #fff, $alpha: 0);
        }
    }

    .method {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        p {
            padding: 0;
            margin: 0;
        }
    }

    .numbers {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    b {
        font-weight: 600;
    }

    button {
        $height: 34px;

        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0 1rem;

        height: $height;
        border-radius: $height;

        background-color: rgba($color: #000, $alpha: 0.1);
        border: rgba($color: #fff, $alpha: 0.1) 1px solid;
        color: rgba($color: #fff, $alpha: 0.6);

        backdrop-filter: blur(10px);

        user-select: none;
        cursor: pointer;

        &:hover {
            background-color: rgba($color: #000, $alpha: 0.2);
            border: rgba($color: #fff, $alpha: 0.5) 1px solid;

            color: white;
        }
    }
</style>
