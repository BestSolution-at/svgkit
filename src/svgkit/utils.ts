export function nonNull<T>( o : T, defaultVal : T) : T {
    return o === undefined ? defaultVal : o;
}

export function nonNullCompute<O,T>(o : O, defaultVal : T, f : ( o : O ) => T ) {
    return o === undefined ? defaultVal : f.call(null, o);
}