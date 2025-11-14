// admin login controller function 

export const login=async(req,res)=>{
    const {name,password,role}=req.body;

    // check admin credentials is missing;
    if(!name || !password || !role){
        return res.status(401).json({
            "message":"Sorry missing credentials"
        })
    }
    const newname=req.body?.name.toLowerCase();
    const newpassword=req.body?.password.toLowerCase();
    const newrole=req.body?.role.toLowerCase();

    if(newname==='rahul' || newpassword==='rahul' ||  newrole==='admin'){
        return res.status(201).json({
            "message":"Admin Logged In Successfully!!",
        })
    }
}