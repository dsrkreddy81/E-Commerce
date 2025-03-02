import User from "./user.js";

export const userregister=async (req,res)=>{
    const {Name, Email, Password}=req.body;

    if(!Name||!Email||!Password){
        return res.status(400).json({success:false,message:"Provide all"});
    }
    const newUser=new User({Name, Email, Password});

    try{
        let result= await newUser.save();
        result=result.toObject();
        delete result.Password;
        res.status(201).json({success:true, data:result});
    }
    catch(error){
        console.error("Error",error.message);
        res.status(500).json({success:false,message:"server error"});
    }
};

export const userlogin=async(req,res)=>{
    const {Email, Password}=req.body;
    if(!Email||!Password){
        return res.status(400).json({success:false,message:"Provide all"});
    }
    try {
        let user = await User.findOne({ Email, Password }).select("-Password");
        if (user) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};