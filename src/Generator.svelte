<script lang="ts">  
    import RollButton from "./RollButton.svelte";
    import generateSheetObjects from "./mixins/generateSheetObjects";
    import StatBox from "./StatBox.svelte";
    import PlainText from "./PlainText.svelte";

    const componentMap = {
      statBox: StatBox,
      plainText: PlainText,
      rollButton: RollButton,
    };

    let inputText = `Example Roll`;
  </script>
  
  <style>
    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 50px;
      margin-bottom: 50px;
    }
  
    div {
      float: left;
      width: 400px;
    }
  
    p {
      font-size: large;
      font-weight: 600;
      color: #C3073F;
    }
  
    textarea {
      height: 200px;
      width: 400px;
      background-color: #1A1A1D;
      color: white;
    }
  
    .static {
      color: gray;
    }
  </style>
  
  <span>
    <div>
      <p>Enter Stat Section here:</p>
      <textarea bind:value={inputText} />
    </div>
    
    <div>
      <p>Output:</p>
      <div class=static>
        {#each generateSheetObjects(inputText) as currentObject}
          <svelte:component  this={componentMap[currentObject?.type]} inputText={currentObject?.text}/>
        {/each}
      </div>
    </div>
  </span>
  