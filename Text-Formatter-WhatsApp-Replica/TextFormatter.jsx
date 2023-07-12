import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMemo } from "react";

export default function TextFormatter({ text, style, fontSize }) {
    const formattedText = useMemo(() => {
        let characterStatus = { isBold: false, isItalic: false, isStrikethrough: false }
        return text.split('').map((char, index) => {
            let styles = {
                fontWeight: characterStatus.isBold ? 700 : 400,
                fontStyle: characterStatus.isItalic ? "italic" : "inherit",
                textDecoration: characterStatus.isStrikethrough ? "line-through" : "none",
                fontSize: fontSize || "12px",
            }

            function checkForSymbols(symbol) {
                let currentCharacters = symbol === "*" ? 'isBold' : symbol === "_" ? 'isItalic' : "isStrikethrough";
                if (symbol === text[index + 1] || !(text.indexOf(symbol, index + 1) > 0 || characterStatus[currentCharacters])) //check double symbols next to each &&  check if we have a pair of symbols
                    return <Grid2 key={index} sx={{ maxHeight: "18px" }}>
                        <Typography style={styles}>{symbol}</Typography>
                    </Grid2>
                else {
                    characterStatus[currentCharacters] = !characterStatus[currentCharacters];
                }
            }
            
            switch (char) {
                case " ": return <Grid2 key={index} sx={{ maxHeight: "18px" }}>
                    <Typography>&nbsp;</Typography>
                </Grid2>
                case "*":
                case "_":
                case "~": return checkForSymbols(char);
                default: return <Grid2 key={index} sx={{ maxHeight: "18px" }}>
                    <Typography style={styles}> {char}</Typography>
                </Grid2>
            }
        })
    }, [text, fontSize])

    return <Grid2 display={"flex"} sx={style} container>{formattedText}</Grid2>
}

