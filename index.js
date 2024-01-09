import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://upubwlugurdogswmtlom.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


let { data: lga, error } = await supabase.from('lga').select('lga_name')


// // import mysql from 'mysql'
// // import express from 'express'
// const mysql = require('mysql')
// const express = require('express')

// const db = mysql.createConnection({
//     host: "db.upubwlugurdogswmtlom.supabase.co",
//     user: 'postgres',
//     password: 'Clashbeast993',
//     database: 'postgres',
//     port: 5432
// })

// db.connect(err => {
//     if(err) {
//         throw err
//     }
//     console.log("Connection succeeded")
// })

// const app = express()

// app.get('/', (res) => {
//     let sql = "SELECT lga_name FROM lga"
//     db.query(sql, (err) => {
//         if(err) {
//             throw err
//         }
//         res.send("Local Governments selected")
//     })
// })


// // let pu_select = document.getElementById("pu-select")
// // let option = document.createElement("option")
// // option.clas

