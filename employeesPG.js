const { Client } = require('pg')
const client = new Client({
    user: 'support',
    host: '127.0.0.1',
    database: 'employees',
    password: 'birthday',
    port: 5432,
});
client.connect();
client
    .query('SELECT * from employee_info')
    .then(res => console.log(res.rows))
    .catch(e => console.error(e.stack))
    .then(() => client.end())
/*
ITEMS
"title","due_date","done"
"hometask","2022-08-08",True
"office_work","2022-08-08",False
"shopping","2022-08-09",False*/

/*
EMPLOYEES
"id","name","birthday"
1,"Andrew Anddrewmode","1978-04-03"
2,"Finder Pathway","1987-07-12"
3,"Dummy Duck","1997-09-22"
4,"Anna Bobcat","1988-04-30"
5,"Curt Singer","1993-02-14"
6,"Codder Baddly","1991-08-26"
7,"Yanik Torreto","1982-10-12"*/

