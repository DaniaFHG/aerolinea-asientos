const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin21",
    database:"aerolinea"
});

/*CRUD-Get*/
app.get('/asiento',(req,res)=>{
    console.log('get lista asientos')
    mysqlConnection.query('Select * from asiento',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Get-id*/
app.get('/asiento/:id',(req,res)=>{
    console.log('get asiento')
    mysqlConnection.query('Select * from asiento where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Insert*/
app.post('/asiento',(req,res)=>{
    console.log('Insert asiento')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into asiento (Fila, Columna) values (?,?)',
    [emp.Fila,emp.Columna],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Update*/
app.put('/asiento/:id',(req,res)=>{
    console.log('Update asiento')
    let emp=req.body;
    mysqlConnection.query('update asiento set Fila=?, Columna=? where id=?',
    [emp.Fila,emp.Columna,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Delete*/
app.delete('/asiento/:id',(req,res)=>{
    console.log('Delete asiento')
    mysqlConnection.query('delete from asiento where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

app.listen(3000);