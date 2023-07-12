import Avatar from '@mui/material/Avatar';

const avatarColor = (alphabet) => {
    var color = { 'A': "#EBADAD", 'B': "#FCC6AA", 'C': "#EAE1CD", 'D': "#FFD993", 'E': "#DDFFA9", 'F': "#9CEDE9", 'G': "#A4A4C9", 'H': "#EBADAD", 'I': "#FCC6AA", 'J': "#CCB091", 'K': "#FFD993", 'L': "#DDFFA9", 'M': "#9CEDE9", 'N': "#FCC6AA", 'O': "#A4A4C9", 'P': "#EBADAD", 'Q': "#FCC6AA", 'R': "#CCB091", 'S': "#FFD993", 'T': "#DDFFA9", 'U': "#9CEDE9", 'V': "#A4A4C9", 'W': "#EBADAD", 'X': "#FCC6AA", 'Y': "#CCB091", 'Z': "#FFD993" }
    return color[alphabet];
}

export const stringAvatar = (name) => {
    let nameparts = name.split(' ');
    if (nameparts.length < 2) {
        nameparts = nameparts[0].split("_");
    }
    let alphabet = nameparts[0][0].toUpperCase();
    return {
        sx: {
            bgcolor: avatarColor(alphabet),
        },
        children:
            (nameparts.length === 1) ?
                nameparts[0][0].toUpperCase() :
                (nameparts[0][0] + nameparts[1][0]).toUpperCase()
    };
};

//Example 
export default function CustomAvatar({ style, variant, value, ...props }) {
    return <Avatar style={style} variant={variant || "circular"}{...stringAvatar(value)}{...props} ></Avatar>
}
