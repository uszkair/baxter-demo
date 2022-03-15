package hu.baxter.demo.models;

import java.util.Objects;

public class EmployeeDTO {
    private String name;
    private String department;

    public EmployeeDTO() {
    }

    public EmployeeDTO(String name, String department) {
        this.name = name;
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        EmployeeDTO that = (EmployeeDTO) o;
        return Objects.equals(name, that.name) && Objects.equals(department, that.department);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, department);
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", department='" + department + '\'' +
                '}';
    }
}
