'use babel';

import SlotHabaneroView from './slot-habanero-view';
import { CompositeDisposable } from 'atom';

export default {

  slotHabaneroView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotHabaneroView = new SlotHabaneroView(state.slotHabaneroViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotHabaneroView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-habanero:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotHabaneroView.destroy();
  },

  serialize() {
    return {
      slotHabaneroViewState: this.slotHabaneroView.serialize()
    };
  },

  toggle() {
    console.log('SlotHabanero was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
