const productModelSchema = require("../models/productModelSchema")
const addProduct= async (req,res) =>{
    //const id = req.params.venderId;
   
    try{
        const productAdd = await new productModelSchema(req.body)
        productAdd.venderId = req.params.id
        const filePath=`/uploads/${req.file.filename}`;
       productAdd.productImage= filePath;
        try{
            const product = await productAdd.save();
            res.status(201).json({
                success:true,
                message:"product added successfully",
            })
        }catch(err){
            res.status(400).json({
                success:false,
                message:"Error occur"+err.message,
            });
        }
    }catch(err){
        res.status(400).json({
            success:false,
            message:"Error occur"+err.message,
        });
    }
}
const productList = async (req,res)=>{
    try{
        const productList = await productModelSchema.find();
        res.status(200).json({
            success:true,
            message:"Product List are : ",
            data: productList,
        });

    }catch(err){
        res.status(400).json({
            success:false,
            message:"Error occur "+err.message
        });
    }
}

const productDetails = async (req,res) =>{
    //const id=req.params.id;
    try{
        const productDetail = await productModelSchema.findOne({productId:req.params.productId})
       
        .populate({
            path:"venderId",
            select:"venderName venderEmail city"
        })
        
        res.status(200).json({
            success: true,
            message : "Here is the detals of product",
            productDetail: productDetail,
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:"Error occur "+err.message
        });
    }
}

const productDelete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteproduct = await productModelSchema.findByIdAndDelete(id, { $set: req.body });
        res.status(200).json({
            success: true,
            message: "Your  product  deleted successfully"
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const editProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const updateProduct = await productModelSchema.findByIdAndUpdate(id, { $set: req.body });
        updateProduct.save();
        res.status(201).json({
            success: true,
            message: "Thanku for your product.Your product edited successfully",
            updateProduct: updateProduct
        });
    } catch (err) {
        res.status(400).json({
            success: "failure",
            message: "error occur" + err.message
        });
    }
}

module.exports = {
    addProduct,
    productList,
    productDetails,
    productDelete,
    editProduct
}