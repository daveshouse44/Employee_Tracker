# Employee Tracker

## Table of Contents:

-[Description](#description)

-[User-Story](#user-story)

-[Installation](#installation)

-[Mock-Up](#mock-up)

-[Walkthrough-Video](#walkthrough-video)

-[Technologies-Used](#technologies-used)

-[Contributions](#contributions)

-[Credits](#credits)

-[Contact](#contact)


## Description:

This command-line application allows users to manage a company's employee database with simple instructions, prompts and inputs.


## User-Story:

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
This App WILL help you do that
```


## Installation:

Dependencies must be installed for application functionality:

    npm i

To start the application use command:

    npm start
    or
    node app.js


## Mock-Up:

The following video shows an example of the application being used from the command line:

[![A video thumbnail shows the command-line employee management application with a play button overlaying the view.](./Assets/12-sql-homework-video-thumbnail.png)](https://2u-20.wistia.com/medias/2lnle7xnpk)

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)

As the image illustrates, the three tables were used to generate all data:

* `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `role`

    * `id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `role_id`: `INT` to hold reference to employee role

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)



### Walkthrough-Video:

[Click here to view App Walkthrough](https://drive.google.com/file/d/1FRdsB3RrgXiadhiNm1VavnWfQ3rLb4op/view)


### Technologies-Used:

* Satisfies all of the preceding acceptance criteria plus the following:

    * Uses the [Inquirer package](https://www.npmjs.com/package/inquirer).

    * Uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to a MySQL database.

    * Uses the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

    * Uses the [figlet package](https://www.npmjs.com/package/figlet) to print text as an image to the console.

    * Uses the [chalk package](https://www.npmjs.com/package/chalk) to print styled text to the console.


## Contributions:

David Tierney


## Credits:

Trilogy Education Services


## Contact:

* [GitHub](https://www.github.com/daveshouse44)

* [LinkedIn](https://www.linkedin.com/in/david-tierney-652030214/)

* [Email](mailto:daveshouse44@hotmail.com)
