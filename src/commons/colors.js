export const GRIS_TEXT = '#9d9d9d';
export const GRIS_BACKGROUND = '#222';
export const GRIS_BACKGROUND_ACTIVE = '#080808';

export const bgColor =  (lettre) => {
    let bgColor = "";
    switch (lettre) {
        case "A": bgColor = "rgb(255, 64, 129)"; break; 
        case "B": bgColor = "rgb(156, 39, 176)"; break;
        case "C": bgColor = "rgb(103, 58, 183)"; break;
        case "D": bgColor = "rgb(63, 81, 181)"; break;
        case "E": bgColor = "rgb(33, 150, 243)"; break;
        case "F": bgColor = "rgb(3, 169, 244)"; break;
        case "G": bgColor = "rgb(0, 188, 212)"; break;
        case "H": bgColor = "rgb(0, 150, 136)"; break;
        case "I": bgColor = "rgb(76, 175, 80)"; break;
        case "J": bgColor = "rgb(139, 195, 74)"; break;
        case "K": bgColor = "rgb(205, 220, 57)"; break;
        case "L": bgColor = "rgb(255, 193, 7)"; break;
        case "M": bgColor = "rgb(255, 152, 0)"; break;
        case "N": bgColor = "rgb(255, 87, 34)"; break;
        case "O": bgColor = "rgb(121, 85, 72)"; break;
        case "P": bgColor = "rgb(158, 158, 158)"; break;
        case "Q": bgColor = "rgb(96, 125, 139)"; break;
        case "R": bgColor = "rgb(244, 67, 54)"; break;
        case "S": bgColor = "rgb(255, 147, 134)"; break;
        case "T": bgColor = "rgb(176, 205, 219)"; break;
        case "U": bgColor = "rgb(238, 238, 238)"; break;
        case "V": bgColor = "rgb(201, 165, 152)"; break;
        case "W": bgColor = "rgb(255, 167, 114)"; break;
        case "X": bgColor = "rgb(255, 232, 80)"; break;
        case "Y": bgColor = "rgb(255, 255, 87)"; break;
        case "Z": bgColor = "rgb(219, 255, 154)"; break;
        default: bgColor = "rgb(156, 255, 160)";
    }
    return bgColor;
}
