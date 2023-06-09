import { asyncError, errorHandler } from "../../../middlewares/error";
import { Task } from "../../../models/task";
import { checkAuth, connectDB } from "../../../utils/features";

const handler = asyncError(async (req, res) => {
    await connectDB();            
    const user = await checkAuth(req);
    if(!user) return errorHandler(res, 401, "Login First");

    const taskId = req.query.id;
    const task = await Task.findById(taskId);
    if(!task) return errorHandler(res, 404, "Task not found");

    if(req.method === "PUT"){
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success: true,
            message: "Task Updated successfully",
        })
    }
    else if(req.method === "DELETE"){
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "Task Deleted successfully",
        })
    }
    else{
        return errorHandler(res, 400, "This method is not available");
    }
    
    
    
    
    const tasks = await Task.find({user: user._id})

    res.json({
        success:true,
        tasks,
    })
}
);
export default handler;

