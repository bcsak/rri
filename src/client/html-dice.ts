import Dice, { DiceType } from "../dice.js";

import HTMLTile from "./html-tile.js";
import * as html from "./html.js";


export default class HTMLDice extends Dice {
	blocked!: boolean;
	pending!: boolean;
	disabled!: boolean;
	_tile: HTMLTile;
	node: HTMLElement = html.node("div", {className:"dice"});

	constructor(readonly _type: DiceType, readonly _sid: string) {
		super(_type, _sid);

		if (this._type == "lake") { this.node.classList.add("lake"); }
		if (this._type == "forest") { this.node.classList.add("forest"); }
		if (this._type == "river") { this.node.classList.add("river"); }

		this._tile = new HTMLTile(this._sid, "0");
		this.node.appendChild(this._tile.node);
	}

	get tile() { return this._tile; }
	get mandatory() { return this._type == "plain" || this._type == "forest"; }
}

["blocked", "pending", "disabled"].forEach(prop => {
	Object.defineProperty(Dice.prototype, prop, {
		get() { return this.node.classList.contains(prop); },
		set(flag) { this.node.classList.toggle(prop, flag); }
	});
});
