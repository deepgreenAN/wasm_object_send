export type SomeObjectSerde = {
    num: number;
    str: string;
    list: number[];
}

export class SomeObjectClass {
    private _num: number
    private _str: string
    private _list: number[]

    constructor(num: number, str: string, list: number[]) {
        this._num = num;
        this._str = str;
        this._list = list;
    }
    get num():number {
        return this._num
    }
    get str():string {
        return this._str
    }
    get list():number[] {
        return this._list
    }
    toJSON(): Record<string, any> {
        return {
            num: this._num,
            str: this._str,
            list: this._list
        }
    } 
}