const{pool}= require(".config/db");
const getUsers= async(req,res)=>{
    try{
        const[result]=await pool.query("SELECT *from users");
        res.status[200].json({result});

    }catch(error){
        console.log(error)    }
        res.status(500).json({message:"Internal server error"})


}
const deleteUser=(req,res)=>{
    try{
        const{id}=req.params;
        const[result]=await pool.query("DELETE FROM users WHERE id=?",[id])
        res result(200).json{message:"row with id =${id" deleted susccessfuly}

    }
    catch(arr){
        console.log(error)    }
        res.status(500).json({message:"Internal server error"});


    }
}
module,exports={getUsers}