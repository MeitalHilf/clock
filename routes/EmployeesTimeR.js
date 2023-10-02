const express = require('express');
const router = express.Router()
module.exports = router;

router.get("/",function (req,res){
    res.render("EmployeesTime",{});
})

router.post("/Add", function(req,res){
    //קליטת הנתונים
    let {name} =req.body;
    // יצירת שאילתה לשמירת שורה
    let Query=`INSERT INTO \`employees-time\` (name,entry,date) VALUES ('${name}',CURRENT_TIMESTAMP(),CURRENT_DATE())`;
    console.log("Adding employees time",Query);
    db_pool.query(Query, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;
        }else{
            res.status(200).json({message: "OK",lastId:rows.insertId});
        }

    });

});

router.post("/Exit", function(req,res){

    let {name} =req.body;
    let Query = `UPDATE \`employees-time\`
    SET \`exit\` = CURRENT_TIMESTAMP()
    WHERE \`name\` = '${name}'`;
    console.log("Exit employee time",Query);
    db_pool.query(Query, (err, rows) => {
        if (err)
            res.status(500).json({ message: err }); // throw err;
        else if (rows.affectedRows === 0) {
            res.status(404).json({ message: "No record found for the given name and date" });
        } else {
            res.status(200).json({ message: "Clock out successfully" });
        }
    });

});

router.delete("/Delete", function(req,res){
    let id =req.body.id;
    // יצירת שאילתה לשמירת שורה
    let Query=`DELETE FROM \`employees-time\` WHERE id='${id}'`;
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

    let q="SELECT * FROM `employees-time` ";

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

router.patch("/Edit", function(req,res){
    let id =req.body.id;
    let name =req.body.name;
    // יצירת שאילתה לשמירת שורה
    let Query=`UPDATE \`employees-time\` SET \`name\`='${name}' WHERE id='${id}'`;
    console.log("update employee time",Query);
    db_pool.query(Query, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;a
        }else{
            res.status(200).json({message: "OK",lastId:rows.insertId});
        }

    });

});


