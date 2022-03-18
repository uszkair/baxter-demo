package hu.baxter.demo.controllers;

import hu.baxter.demo.comparators.SortedByName;
import hu.baxter.demo.models.EmployeeDTO;
import hu.baxter.demo.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest")
public class EmployeesController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeesController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     *
     *  Return all or filtered employees which are ordered by firstname and lastname.
     *
     * @param department filter to the employee list
     * @return filtered list by department
     */
    @GetMapping(path = "/employees", produces= MediaType.APPLICATION_JSON_VALUE)
    public List<EmployeeDTO> employees(@RequestParam(required = false) Optional<String> department) {

        if (department.isPresent()) {
            return employeeService.list().stream()
                    .filter(employeeDTO -> employeeDTO.getDepartment().equals(department.get()))
                    .sorted(new SortedByName())
                    .collect(Collectors.toList());
        }
        return employeeService.list()
                .stream()
                .sorted(new SortedByName())
                .collect(Collectors.toList());

    }

    /**
     *
     *  Return employees group by department.
     *
     * @return
     */
    @GetMapping(path="/employees/groupby/department", produces= MediaType.APPLICATION_JSON_VALUE)
    public Object employeesGroupByDepartment() {
        return employeeService.list()
                .stream()
                .collect(
                        Collectors.groupingBy(
                                EmployeeDTO::getDepartment,Collectors.toSet()
                        )
                );
    }
}
