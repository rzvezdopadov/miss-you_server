const alphabet = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';

export const Random = {
    getRandomString(count: number): string {
        let str = '';

        if (!count || count > 50) return str;

        for (let i = 0; i < count; i++) {
            const pos = Math.floor(Math.random() * alphabet.length);
            str += alphabet[pos];
        }

        return str;
    },
    getRandomInteger(min: number, max: number): number {
        let difference = max - min + 1;

        if (min > max) difference = min - max + 1;

        const mul = Math.random() * difference;
        const conv = Math.floor(mul);
        const add = min + conv;

        return add;
    },
    getUniqueIntegerArr(min: number, max: number, count: number): number[] {
        const arr: number[] = [];
        const difference = max - min + 1;

        if (count > difference) return arr;

        function genUnicueInteger(arr: number[]) {
            const value = Random.getRandomInteger(min, max);

            if (arr.includes(value)) {
                genUnicueInteger(arr);
            } else {
                arr.push(value);
            }
        }

        for (let i = 0; i < count; i++) {
            genUnicueInteger(arr);
        }

        return arr;
    },
};
