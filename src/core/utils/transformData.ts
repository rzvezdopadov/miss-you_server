export const TransformData = {
    NumericEnumToArr<T>(payload: T): number[] {
        return Object.values(payload)
            .filter((value) => typeof value !== 'string')
            .map((value) => value as number);
    },
    NumericEnumToArrSrtWithKey<T>(payload: T): string[] {
        return Object.entries(payload)
            .filter((value) => typeof value[1] !== 'string')
            .map((value) => `${value[1]} - ${value[0]}`);
    },
};
