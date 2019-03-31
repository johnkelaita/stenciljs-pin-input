import {Component, Event, EventEmitter, Prop, Element} from '@stencil/core';

@Component({
  tag: 'cmp-button',
  styleUrl: 'button.css',
  shadow: true
})
export class Button {
  /**
   * The button text and value
   */
  @Prop() value: string;
  @Event() buttonInput: EventEmitter;
  @Element() elem: HTMLElement;

  getValue(): string {
    return this.value;
  }

  numClick(e) {
    e.path[0].blur();
    e.path[0].classList.add('fade');
    setTimeout(() => {
      e.path[0].classList.remove('fade');
    }, 200);
    this.buttonInput.emit(this.getValue());
  }

  render() {
    return <button onClick={(e) => this.numClick(e)}>{this.getValue()}</button>;
  }
}
