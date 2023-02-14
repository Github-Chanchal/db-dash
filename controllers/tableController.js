const { prepareErrorResponse, prepareSuccessResponse } = require("../services/utilityService.js");
const sqlDbService = require("../sql_db_services/databaseService")
const {addTable,getById} = require("../db_services/masterDbService");
const tableService = require("../sql_db_services/tableService.js") 
const { Client } = require('pg');
const createTable = async (req,res)=>{
    try{
         const db_id = req?.body?.id;
         const tableName = req?.body?.tableName;
         const data = await getById(db_id);
         const ans = await tableService.createTableService(tableName,data)
         try {
            
            const data = await addTable(db_id,{"1234":{tableName:tableName}})
             return res.status(200).json(prepareSuccessResponse({ message: `Table '${tableName}' created successfully`}))
         }
         catch (err) {
             return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
         }
    }
    catch(err){
         return res.status(400).json(prepareErrorResponse({ message: `Error creating table ${err.message}` }));
    }
    
 }
module.exports ={createTable}