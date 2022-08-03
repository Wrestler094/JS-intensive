/*

У экземпляра класса должны присутствовать св-ва:
-name string
-grade string Для простоты предположим, что система грейдов будет иметь значения от L1 до L4
-hardSkills string[]
-company string


Так же должны иметься три метода:

-changeCompany(newCompanyName) - сотрудник может сменить компанию, либо же просто уволиться
-upGrade(newGradeName) - сотрудник может повысить квалификацию
-addSkill(newSkillName) - сотрудник может дополнить список своих скиллов.
*/


export class Employee {
    constructor(name = "", grade = "L1", hardSkills = [], company = "") {
        this.name = name.trim();
        this.grade = grade.trim();
        this.hardSkills = hardSkills.slice();
        this.company = company.trim();
    }

    changeCompany(newCompanyName) {
        this.company = newCompanyName.trim();
    }

    upGrade(newGradeName) {
        this.grade = newGradeName;
    }

    addSkill(newSkillName) {
        if (!this.hardSkills.includes(newSkillName)) {
            this.hardSkills.push(newSkillName.trim());
        }
    }
}