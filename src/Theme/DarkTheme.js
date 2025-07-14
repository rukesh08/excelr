const { createTheme, Paper } = require("@mui/material")

const darkTheme=createTheme({
    palette:{
        mode:"dark",
        primary:{
            main:"#FF4F0F"
        },
        secondary:{
            main:"#5A20CB"
        },
        balck:{
            main:"#242B2E"
        },
        background:{
            main:"#0000000",
            default:"#0D0D0D",
            Paper:"#0D0D0D"
        },
        textColor:{
            main:"#111111"
        }

    }
})

export default darkTheme;