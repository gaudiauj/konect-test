type State = {
  numbers: string[];
  currentFocus: number;
};

type ChangeValueAction = {
  type: "changeValue";
  value: string;
  indexToChange: number;
};

type CopyAction = {
  type: "paste";
  value: string;
};

type Action = ChangeValueAction | CopyAction;

export const initialState = {
  numbers: ["", "", "", "", "", ""],
  currentFocus: 0,
};

function reducer(state: State, action: Action) {
  const getNextFocus = () => {
    const numbersLength = state.numbers.length;
    const currentFocus = state.currentFocus;
    const value = action.value;

    if (currentFocus === 0 && !value) {
      return 0;
    }
    if (currentFocus === numbersLength - 1 && !!value) {
      return currentFocus;
    }
    if (!value && !state.numbers[state.currentFocus]) {
      return currentFocus - 1;
    }
    if (!value && currentFocus === numbersLength - 1) {
      return currentFocus;
    }
    if (!!value) {
      return currentFocus + 1;
    }
    return currentFocus - 1;
  };
  switch (action.type) {
    case "changeValue":
      const newNumbers = [...state.numbers];
      newNumbers[action.indexToChange] = action.value;

      return {
        ...state,
        numbers: newNumbers,
        currentFocus: getNextFocus(),
      };
    case "paste":
      const copyValue = action.value;
      const copiedNumbers = [...state.numbers];
      for (var i = 0; i < copiedNumbers.length; i++) {
        copiedNumbers[i] = copyValue[i] || "";
      }
      return {
        ...state,
        numbers: copiedNumbers,
        currentFocus: Math.min(copiedNumbers.length, copyValue.length),
      };
    default:
      throw new Error();
  }
}

export default reducer;
