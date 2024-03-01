<script>
    import { getContext } from "svelte";

    let displayque = false;
    function toggleque(){
        displayque = !displayque;
    }
    const removeQue = getContext("remove");
</script>

<div class="h-screen w-full bg-amber-500">
    <h1>Hi delete me<button>Delete</button></h1>
    <h1>Hi delete me<button>Delete</button></h1>
    <h1>Hi delete me<button>Delete</button></h1>
    <h1>Hi delete me<button>Delete</button></h1>
    <h1>Hi delete me<button>Delete</button></h1>
</div>