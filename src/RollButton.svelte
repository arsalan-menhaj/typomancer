<script lang="ts">    
    import Button from '@smui/button';

    export let inputText;

    let error: string; // TODO - better way to do this

    const processMultiplications: (inputText: string) =>  string[] = function (inputText: string): string[] { 
        const finalElements: string[] = [];
        let skipNext = 0;

        let product: number;
        let finalBonus: number = 0;

        for (let i = 0; i < inputText.length; i++) {
            if (skipNext) {
                skipNext--;
                continue;
            } 
            
            let lastFinalElement = finalElements[finalElements.length - 1];

            if (inputText.charAt(i) === '*') {
                if (parseInt(lastFinalElement)) {
                    skipNext++;

                    // if followed by a dice type, add that that many of that dice type to finalElements
                    if (inputText.charAt(i + 1)  === 'd' && parseInt(inputText.charAt(i + 2))) {
                        // get mutiple digit integer using regexp matcher - get first matching element
                        let remainingSubstring = inputText.slice(i);
                        let currentDiceString = 'd' + remainingSubstring.match(/\d+/)[0];
                        skipNext += currentDiceString.length;

                        let diceMultiplier = parseInt(lastFinalElement);
                        finalElements.pop();
                        for (let i = 0; i < diceMultiplier - 1; i++) {
                            finalElements.push(currentDiceString);
                        }
                        continue;
                    }

                    // if followed by a number, simply multiply with previous number
                    if (parseInt(inputText.charAt(i + 1)))  {
                        // get mutiple digit integer using regexp matcher - get first matching element
                        let remainingSubstring = inputText.slice(i + 1);
                        let nextNumberString = remainingSubstring.match(/\d+/)[0];
                        skipNext += nextNumberString.length;

                        finalElements[finalElements.length - 1] = (parseInt(lastFinalElement) * parseInt(nextNumberString)).toString();
                        continue;
                    }
                } else {
                    error = 'Need left-side number for multiplication.';
                    break;
                }
            };

            if (parseInt(inputText.charAt(i)) &&  finalElements.length > 0) {
                if (parseInt(lastFinalElement) || lastFinalElement  ===  'd') {
                    finalElements[finalElements.length - 1] = lastFinalElement + inputText.charAt(i);
                } else if (lastFinalElement === '+' || lastFinalElement === '*') {
                    // get mutiple digit integer using regexp matcher - get first matching element
                    let remainingSubstring = inputText.slice(i);
                    let currentNumberString = remainingSubstring.match(/\d+/)[0];
                    skipNext = currentNumberString.length - 1;
                }

            }
        }

        return finalElements;
    }

    const simplifyExpression: (inputText: string) => string = function (inputText: string): string {
        let finalExpression = "";

        // process multiplications first
        const finalElements: string[] = processMultiplications(inputText);
        let skipNext = 0;

        

        if (error) {
            return error;
        }

        return finalExpression;
    }
</script>

<Button>
    {inputText}
</Button>

