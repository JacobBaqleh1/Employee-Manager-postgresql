
INSERT INTO department (department_name) VALUES 
('Human Resources'), 
('Engineering'), 
('Sales');


INSERT INTO role (title, salary, department_id) VALUES 
('HR Manager', 60000, 1), 
('Software Engineer', 80000, 2), 
('Sales Associate', 50000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 2, NULL),    
('Jane', 'Smith', 1, 1),   
('Mike', 'Johnson', 3, 2);   
