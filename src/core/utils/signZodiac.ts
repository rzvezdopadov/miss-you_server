export function getSignZodiac(dayOfBirth: number, monthOfBirth: number) {
    dayOfBirth = Number(dayOfBirth);
    monthOfBirth = Number(monthOfBirth);

    if (!dayOfBirth && !monthOfBirth) return 0;

    if (
        (dayOfBirth > 20 && monthOfBirth === 3) ||
        (dayOfBirth < 21 && monthOfBirth === 4)
    )
        return 1;
    if (
        (dayOfBirth > 20 && monthOfBirth === 4) ||
        (dayOfBirth < 22 && monthOfBirth === 5)
    )
        return 2;
    if (
        (dayOfBirth > 21 && monthOfBirth === 5) ||
        (dayOfBirth < 22 && monthOfBirth === 6)
    )
        return 3;
    if (
        (dayOfBirth > 21 && monthOfBirth === 6) ||
        (dayOfBirth < 23 && monthOfBirth === 7)
    )
        return 4;
    if (
        (dayOfBirth > 22 && monthOfBirth === 7) ||
        (dayOfBirth < 22 && monthOfBirth === 8)
    )
        return 5;
    if (
        (dayOfBirth > 21 && monthOfBirth === 8) ||
        (dayOfBirth < 24 && monthOfBirth === 9)
    )
        return 6;
    if (
        (dayOfBirth > 23 && monthOfBirth === 9) ||
        (dayOfBirth < 24 && monthOfBirth === 10)
    )
        return 7;
    if (
        (dayOfBirth > 23 && monthOfBirth === 10) ||
        (dayOfBirth < 23 && monthOfBirth === 11)
    )
        return 8;
    if (
        (dayOfBirth > 22 && monthOfBirth === 11) ||
        (dayOfBirth < 23 && monthOfBirth === 12)
    )
        return 9;
    if (
        (dayOfBirth > 22 && monthOfBirth === 12) ||
        (dayOfBirth < 21 && monthOfBirth === 1)
    )
        return 10;
    if (
        (dayOfBirth > 20 && monthOfBirth === 1) ||
        (dayOfBirth < 20 && monthOfBirth === 2)
    )
        return 11;
    if (
        (dayOfBirth > 19 && monthOfBirth === 2) ||
        (dayOfBirth < 21 && monthOfBirth === 3)
    )
        return 12;
}
