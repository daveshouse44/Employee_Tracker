INSERT INTO departments (name)
VALUES  ('IT'),
        ('Operations'),
        ('Legal'),
        ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Senior Engineer', 125000, 1),
        ('Junior Engineer', 60000, 1),
        ('IT Manager', 200000, 1),
        ('Operations Manager', 180000, 2),
        ('Ops Specialist', 90000, 2),
        ('Ops Technician', 55000, 2),
        ('Chief Legal Officer', 190000, 3),
        ('Human Resources Supervisor', 100000, 3),
        ('Associate Attorney', 50000, 3),
        ('Sales Manager', 175000, 4),
        ('Sales Associate', 60000, 4),
        ('Account Specialist', 90000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Arthur', 'Dent', 1, 1),
        ('Ford', 'Prefect', 2, 1),
        ('Zaphod', 'Beeblebrox', 3, null),
        ('Marvin', 'Paranoid-Android', 4, null),
        ('Trillian', 'McMillan', 5, 2),
        ('Slarti', 'Bartfast', 6, 2),
        ('Agra', 'Jag', 7, null),
        ('Alice', 'Beeblebrox', 8, 3),
        ('Allit', 'Nils', 9, 3),
        ('Anjie', 'Aseed', 10, null),
        ('Dan', 'Streetmentioner', 11, 4),
        ('Enid', 'Kapelsen', 12, 4);

SELECT employees.id AS 'ID#', CONCAT(employees.first_name, ' ', employees.last_name) AS 'Employees', title AS 'Title', salary AS 'Salary', departments.name AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Manager' FROM roles LEFT JOIN employees ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id LEFT JOIN employees e ON employees.manager_id = e.id;