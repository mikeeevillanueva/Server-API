create table tasks (
   title text,
   description text,
   done boolean
);

create or replace function newtask(par_title  text, par_description text, par_done boolean) returns text as
$$
  declare
    loc_title text;
    loc_res text;
  begin
     select into loc_title title from tasks where title = par_title;
     if loc_id isnull then

       insert into tasks (title, description, done) values (par_title, par_description, par_done);
       loc_res = 'OK';

     else
       loc_res = 'ID EXISTED';  
     end if;
     return loc_res;
  end;
$$
 language 'plpgsql';

create or replace function deletetask(par_id int8) returns text as
$$
  declare
    loc_id INT;
    loc_res TEXT;
  begin
     select into loc_id id from tasks where tasks.id = par_id;
     if loc_id notnull then

       DELETE from tasks WHERE id = loc_id;
       loc_res = 'OK';

     else
       loc_res = 'ID EXISTED';
     end if;
     return loc_res;
  end;
$$
 language 'plpgsql';

SELECT deletetask(1);

select newtask('Assignments','18*- API server, BusE, reading about Plagiarism, Spell Corrector', false);


create or replace function gettasks(out text, out text, out boolean) returns setof record as
$$
   select title, description, done from tasks;

$$
 language 'sql';
 
select * from gettasks();

create or replace function gettaskid(in par_id int8, out text, out text, out boolean) returns setof record as
$$
   select title, description, done from tasks where id = par_id;

$$
 language 'sql';
 
--select * from gettaskid(2);

create table userpass (
    username text primary key,
    password text
);


insert into userpass (username, password) values ('ako', 'akolagini');

create or replace function getpassword(par_username text) returns text as
$$
  declare
    loc_password text;
  begin
     select into loc_password password from userpass where username = par_username;
     if loc_password isnull then
       loc_password = 'null';
     end if;
     return loc_password;
 end;
$$
 language 'plpgsql';

select getpassword('ako');
