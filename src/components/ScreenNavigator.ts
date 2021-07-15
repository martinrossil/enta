import DisplayContainer from '../core/DisplayContainer';
import IScreenNavigator from '../interfaces/components/IScreenNavigator';
import IDisplayElement from '../interfaces/core/IDisplayElement';
import ISvgElement from '../interfaces/svg/ISvgElement';

export default class ScreenNavigator extends DisplayContainer implements IScreenNavigator {
    public constructor() {
        super();
        this.name = 'ScreenNavigator';
    }

    private updateScreens(): void {
        for (let i = 0; i < this.elements.length; i++) {
            const screen: IDisplayElement | ISvgElement = this.elements[i];
            screen.visible = this.screenIndex === i;
        }
    }

    private _screenIndex = NaN;

    public set screenIndex(value: number) {
        if (isNaN(this._screenIndex) && isNaN(value)) {
            return;
        }
        if (this._screenIndex === value) {
            return;
        }
        if (value < 0) {
            if (!isNaN(this._screenIndex)) {
                this._screenIndex = NaN;
                this.updateScreens();
            }
            return;
        }
        this._screenIndex = value;
        this.updateScreens();
    }

    public get screenIndex(): number {
        return this._screenIndex;
    }
}
