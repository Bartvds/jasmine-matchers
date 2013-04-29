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
        toEndWith(value:string): bool;
        toEndWith(values:string[]): bool;

        toEachEndWith(searchString:string): bool;
        toStartWithEither(...searchString:string[]): bool;
        toSomeEndWith(searchString:string) : bool;

        toStartWith(value:string) : bool;
        toStartWith(values:string[]): bool;

        toEachStartWith(searchString:string): bool;
        toSomeStartWith(searchString:string): bool;

        //toThrow
        toThrowInstanceOf(klass:Function): bool;
        toThrowStartsWith(text:string) :bool;
    }
}
