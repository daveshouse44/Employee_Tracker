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
VALUES  ('Arthur', 'Dent', 1, null),
        ('Ford', 'Prefect', 2, null),
        ('Zaphod', 'Beeblebrox', 3, 1),
        ('Marvin', 'Paranoid-Android', 4, 2),
        ('Trillian', 'McMillan', 5, null),
        ('Slarti', 'Bartfast', 6, null),
        ('Agra', 'Jag', 7, 3),
        ('Alice', 'Beeblebrox', 8, null),
        ('Allit', 'Nils', 9, null),
        ('Anjie', 'Aseed', 10, 4),
        ('Dan', 'Streetmentioner', 11, null),
        ('Enid', 'Kapelsen', 12, null);