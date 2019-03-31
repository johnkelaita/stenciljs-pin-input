import {Component, Element, EventEmitter, Event, Prop, Watch} from '@stencil/core';

@Component({
  tag: 'cmp-display',
  styleUrl: 'display.css',
  shadow: true
})
export class Display {

  @Prop({mutable: true}) inp: string;
  @Prop() maxLen: number;
  @Prop() showLength: boolean;
  @Prop() hide: boolean;
  @Prop() autoSubmit: boolean;
  @Element() el!: HTMLStencilElement;
  @Event() pinDone: EventEmitter;

  private inputText: string = "";
  private displayText: string = "";

  @Watch('inp')
  watchHandler(newValue: string) {
    if (newValue == "OK") {
      if (this.showLength) {
        if (this.inputText.length == this.maxLen) {
          this.done();
        }
      }
      else {
        this.done();
      }
    } else if (newValue == "<") {
      if (this.inputText.length > 0) {
        this.inputText = this.inputText.substr(0, this.inputText.length - 1);
      }
    }
    else if (parseInt(newValue) >= 0 && parseInt(newValue) <= 9) {
      if (this.inputText.length < this.maxLen) {
        this.inputText += newValue;
      }
    }

    this.displayText = this.inputText;

    if (this.autoSubmit == true && this.inputText.length == this.maxLen) {
      this.done();
    }

    this.inp = "";
    this.el.forceUpdate();
  }

  done() {
    this.pinDone.emit(this.inputText);
    this.inputText = "";
    this.displayText = "";
  }

  render() {
    let renderText: string = this.displayText;

    if (this.showLength) {
      renderText = renderText.padEnd(this.maxLen , ' ');
      return renderText.padEnd(this.maxLen - this.displayText.length, ' ').split("").map((item) => {
        return <div class="item"><span>{(this.hide ? (parseInt(item) >= 0 ? '*' : '') : item)}</span></div>
      });
    } else {
      if (this.hide) {
        renderText = "".padEnd(this.displayText.length, '*');
      }
      return <span class="box">{renderText}</span>;
    }
  }
}
