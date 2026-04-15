export function getAttendanceMessage(howManyAttendance: number) {
    if (howManyAttendance === 1) {
        return "Seja bem vindo ao grupo! Essa é a sua primeira vez conosco!"
    }
    return `Essa é o seu ${howManyAttendance}º encontro seguido, continue assim!`;
}