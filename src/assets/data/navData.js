


const navData = {
    "Home":
    [
        [

        ],
        [
            
            {
                "title":"Sign In",
                "route":"/login",
            },

        ],
        [

 
            {
                "title":"Profile",
                "route":"/profile/"+ localStorage.getItem("id"),
            },
            {
                "title":"Log Out",
                "route":"/login",
            },
        ],
        [
            {
                "title":"Log Out",
                "route":"/login",
            },
            {
                "title":"Admin Center",
                "route":"/admin/unauthorized",
            },
        ]
    ],
}

export default navData