interface generatePasswordProps {
    length: number,
    selectedSet: {
        setNumber: boolean
        setUppercase: boolean
        setLowercase: boolean
        setMinus: boolean
        setUnderline: boolean
        setSpecial: boolean
        setBrackets: boolean
    }
}

export function generatePassword(params: generatePasswordProps){
    if(params.length <= 5){ alert('Password length is too low.'); return; }
    if(params.length > 40){ alert('Password length is too high.'); return; }

    // Charsets
    const NUMBERS = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    const UPPERCASE = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
    const LOWERCASE = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
    const MINUS = [45];
    const UNDERLINE = [95];
    const SPECIAL = [33, 35, 36, 37, 38, 64, 163];
    const BRACKETS = [40, 41, 60, 62, 91, 93, 123, 125];

    // Charset and validation regex Generation
    const charSets = [];
    let generateRegex = '';
    if(params.selectedSet.setNumber) { charSets.push(NUMBERS); generateRegex += "(?=.*\\d)"; }
    if(params.selectedSet.setUppercase) { charSets.push(UPPERCASE); generateRegex += "(?=.*[A-Z])"; }
    if(params.selectedSet.setLowercase) { charSets.push(LOWERCASE); generateRegex += "(?=.*[a-z])"; }
    if(params.selectedSet.setMinus) { charSets.push(MINUS); generateRegex += "(?=.*[-])"; }
    if(params.selectedSet.setUnderline) { charSets.push(UNDERLINE); generateRegex += "(?=.*[_])"; }
    if(params.selectedSet.setSpecial) { charSets.push(SPECIAL); generateRegex += "(?=.*[!#$%&@£])"; }
    if(params.selectedSet.setBrackets) { charSets.push(BRACKETS); generateRegex += "(?=.*[<>()\\[\\]{}])"; }

    if(charSets.length === 0){ alert('No password generation options selected.'); return; }
    
    const finalCheckRegex = new RegExp(generateRegex);
    let password;

    //generate until regex is passed
    do{
        password = '';
        for(let i = 0; i < params.length; i++){
            // Select a random charset
            const selectedCharSet = charSets[Math.floor(Math.random() * charSets.length)];
            // Random characted from that set
            const charCode = selectedCharSet[Math.floor(Math.random() * selectedCharSet.length)];
            // Convert and add to password
            password += String.fromCodePoint(charCode);
        }
    }while(!finalCheckRegex.test(password));

    return password
}