import { observable } from "mobx";

export const CounterStore = observable({
  value: 0,

  increment() {
    this.value += 1;
  },

  decrement() {
    this.value -= 1;
  },
});
