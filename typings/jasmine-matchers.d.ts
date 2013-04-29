// Type definitions for jasmine-matchers v0.2.1 API
// Project: https://github.com/uxebu/jasmine-matchers
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module jasmine {
    interface Matchers {

        //toBe
        toBeArray(): bool;
        toBeCloseToOneOf(values: any[], isCloseToFunction: (actual: number, expected: number) => bool): bool;
        toBeInstanceOf(Constructor: Function): bool;
        toBeInRange(min: number, max: number): bool;
        toBeNan(): bool;
        toBeNumber(): bool;
        toBeOfType(type: string): bool;
        toBeOneOf(values: any[]): bool;

        //toContain
        toContainOnce(value: any): bool;

        //toHave
        toHaveBeenCalledXTimes(count:number): bool;
        toHaveLength(length:number): bool;
        toHaveOwnProperties(...names:string[]): bool;
        toHaveOwnPropertiesWithValues(obj:Object): bool;
        toHaveProperties(...names:string[]): bool;
        toHavePropertiesWithValues(obj:Object): bool;
        toExactlyHaveProperties(...names:string[]): bool;

        //toStartEndWith
        toStartWith(value:string): bool;
        toStartWith(value:any[]): bool;

        toEndWith(value:string): bool;
        toEndWith(values:any[]): bool;

        toEachStartWith(searchString:string): bool;
        toSomeStartWith(searchString:string): bool;

        toEachEndWith(searchString:string): bool;
        toSomeEndWith(searchString:string): bool;

        toStartWithEither(...searchString:any[]): bool;

        //toThrow
        toThrowInstanceOf(klass:Function): bool;
        toThrowStartsWith(text:string): bool;
    }
}
