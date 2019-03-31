import {Component, Event, EventEmitter, Listen, Prop} from '@stencil/core';

@Component({
  tag: 'cmp-keypad',
  styleUrl: 'keypad.css',
  shadow: true
})
export class Keypad {
  @Event() numInput: EventEmitter;
  @Prop() shuffle: boolean;
  @Prop() hideOk: boolean;

  private keyValues: string[] = [];

  componentWillLoad() {
    this.keyValues = [];
    for (let i = 1; i <= 10; i++) {
      this.keyValues.push((i % 10).toString());
    }

    if (this.shuffle) {
      let currentIndex: number = this.keyValues.length;
      while (0 !== currentIndex) {
        let randomIndex: number = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        let temp = this.keyValues[currentIndex];
        this.keyValues[currentIndex] = this.keyValues[randomIndex];
        this.keyValues[randomIndex] = temp;
      }
    }
  }

  output(val) {
    this.numInput.emit(val);
  }

  buttonInput(e) {
    this.output(e.detail);
  }

  @Listen('window:keydown')
  handleWindowKeydown(ev) {
    if (ev.key == 'Backspace') {
      this.output("<");
    } else if (ev.key == "Enter") {
      this.output("OK");
    } else if (parseInt(ev.key) >= 0 && parseInt(ev.key) <= 9) {
      this.output(ev.key);
    }
  }

  render() {
    return <div>
      <div class="row">
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[0]}>}</cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[1]}></cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[2]}></cmp-button>
      </div>
      <div class="row">
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[3]}></cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[4]}></cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[5]}></cmp-button>
      </div>
      <div class="row">
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[6]}></cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[7]}></cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[8]}></cmp-button>
      </div>
      <div class="row">
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.hideOk ? "" : "<"}></cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.keyValues[9]}></cmp-button>
        <cmp-button onButtonInput={(e) => this.buttonInput(e)} value={this.hideOk ? "<" : "OK"}></cmp-button>
      </div>
    </div>;
  }
}
