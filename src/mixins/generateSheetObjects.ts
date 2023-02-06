import SheetObject from "./SheetObject";

const statsObject = {};

const getButtonElement: (inputText: string) => string | null = function(inputText: string): string {
  if (inputText ===  '+' || inputText === '*' || parseInt(inputText)
    || inputText?.match(/^[0-9]+[d][0-9]+/g) || inputText?.match(/^[d][0-9]+/g)) {
    return  inputText;
  }
  
  if (Object.keys(statsObject).includes(inputText)) { 
    return statsObject[inputText];
  }

  return null;
}

const generateSheetObjects: (inputText: string) => Array<SheetObject | undefined> = function (
    inputText: string
  ): Array<SheetObject | undefined> {
    const elements = inputText.match(/\w+|\s+|[^\s\w]+/g);

    let skipNext = 0;

    if (elements?.length > 0) {
      return elements.map(function (element, index) {
        if (skipNext) {
          skipNext--;
        } else {

          // Stat Box
          if (element !== ':' && elements[index + 1] === ':') {
            let value: number;
  
            if (parseInt(elements[index + 2]))  {
              value = +elements[index + 2];
              skipNext = 2;
            } else if (parseInt(elements[index + 3])) { 
              value = +elements[index + 3];
              skipNext = 3;
            }
  
            if (value) {
              statsObject[element] = value;
              return new SheetObject('statBox', `${element}: ${value}`);
            }
          }
          
          // Dice Roll Button
          let currentOffset = 0;
          let expression = "";
          while (true) {
            let buttonText = getButtonElement(elements[index + currentOffset]);
            
            if (buttonText === null) {
              break;
            }

            expression += buttonText;
            skipNext++;
            currentOffset++;
          }

          if (expression) {
            return new SheetObject('rollButton', expression);
          }
        
          return new SheetObject('plainText', element);
        }
      });
    }

    return [];
  };

export default generateSheetObjects;