import {Component, Element, EventEmitter, Event, Prop} from '@stencil/core';

@Component({
  tag: 'pin-panel',
  styleUrl: 'pin-panel.css',
  shadow: true
})
export class PinPanel {

  @Prop() shuffleKeypad: boolean = true;
  @Prop() maxPinLength: number = 6;
  @Prop() hideDigitDisplay: boolean = true;
  @Prop() showPinLength: boolean = true;
  @Prop() autoSubmit: boolean = true;
  @Event() pinDone: EventEmitter;
  @Element() el!: HTMLStencilElement;

  private nextInput: string;

  getNextinput() {
    return this.nextInput;
  }

  doInput(num) {
    if (num && num.detail) {
      num = num.detail;
    }
    this.nextInput = num;
    this.el.forceUpdate();
    setTimeout(() => {
      this.nextInput = "";
      this.el.forceUpdate();
    }, 100);
  }

  done(e) {
    this.pinDone.emit(e.detail);
  }


  render() {
    return <div class="pin-panel-container">
        <div class="box box-1">
          <h1>Enter your pin</h1>
          <cmp-display showLength={this.showPinLength} maxLen={this.maxPinLength} hide={this.hideDigitDisplay} inp={this.getNextinput()} auto-submit={this.autoSubmit} pin-done={this.done}></cmp-display>
        </div>
        <cmp-keypad shuffle={this.shuffleKeypad} onNumInput={(num) => this.doInput(num)} class="box box-2" hide-ok={this.autoSubmit === true}></cmp-keypad>
      </div>;
  }
}
