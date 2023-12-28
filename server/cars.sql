DROP TABLE IF EXISTS cars; 
CREATE TABLE IF NOT EXISTS cars(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
    ,brand VARCHAR(12) NOT NULL
    ,model VARCHAR(12) NOT NULL 
    ,year INTEGER(4) NOT NULL
    ,color VARCHAR(8) NOT NULL 
); 
INSERT INTO cars(id,brand,model,year,color) VALUES(1,'Volvo','v40','2010', 'white');
INSERT INTO cars(id,brand,model,year,color) VALUES(2,'Volkswagen','Golf','2009', 'brown');
INSERT INTO cars(id,brand,model,year,color) VALUES(3,'Audi','A6','2020', 'pink');

select * from cars;