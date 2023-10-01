const express = require('express');
const router = express.Router()
module.exports = router;

// router.get("/", function (req,res){
//     res.render("EmploPage",{});
// })
router.post("/Add", function(req,res){
    //קליטת הנתונים
    let name =req.body.name;
    // יצירת שאילתה לשמירת שורה
    let Query=`INSERT INTO employees (\`name\`) VALUES ('${name}')`;
    console.log("Adding employee",Query);
    db_pool.query(Query, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;
        }else{
            res.status(200).json({message: "OK",lastId:rows.insertId});
        }

    });

});

router.patch("/Edit", function(req,res){
    let id =req.body.id;
    let name =req.body.name;
    // יצירת שאילתה לשמירת שורה
    let Query=`UPDATE \`employees\` SET \`name\`='${name}' WHERE id='${id}'`;
    console.log("update employee",Query);
    db_pool.query(Query, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;a
        }else{
            res.status(200).json({message: "OK",lastId:rows.insertId});
        }

    });

});

router.delete("/Delete", function(req,res){
    let id =req.body.id;
    // יצירת שאילתה לשמירת שורה
    let Query=`DELETE FROM \`employees\` WHERE id='${id}'`;
    console.log("delete employee",Query);
    db_pool.query(Query, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;
        }else{
            res.status(200).json({message: "OK",lastId:rows.insertId});
        }

    });

});


router.get("/List",(req, res) => {

    let q="SELECT * FROM `employees` ";

    db_pool.query(q, function(err, rows, fields){

        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json(rows );
        }

    });


    // res.send("good morning");
});

