import { extendTheme } from "@mui/joy";
import { useMemo } from "react";

const useMuiTheme = () =>{

    return useMemo(()=>
        extendTheme({
            components:{
                JoyFormLabel:{
                    fontSize:10
                }
            }
        })
    )
}

export default useMuiTheme;