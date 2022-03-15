package hu.baxter.demo.controllers;

import hu.baxter.demo.controllers.EmployeesController;
import hu.baxter.demo.models.EmployeeDTO;
import hu.baxter.demo.services.EmployeeService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.contentOf;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    @Test
    public void contextLoads() throws Exception {
        assertThat(employeeService).isNotNull();
    }


    @Test
    public void employees() throws Exception {

        when(employeeService.list())
                .thenReturn(Arrays.asList(
                        new EmployeeDTO("Samuel Palmisano", "finance"),
                        new EmployeeDTO("Michael Smith", "it"),
                        new EmployeeDTO("Peter Goeking", "it"),
                        new EmployeeDTO("Peter Goeking", "finance"),
                        new EmployeeDTO("George Smith", "packaging")));

        mockMvc.perform(get("/employees")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(5))
                .andExpect(jsonPath("$.[?(@.name == \"Samuel Palmisano\" && @.department == \"finance\")]").exists());

     }
    @Test
    public void employeesWithDepartment() throws Exception {
        when(employeeService.list())
                .thenReturn(Arrays.asList(
                        new EmployeeDTO("Samuel Palmisano", "finance"),
                        new EmployeeDTO("Michael Smith", "it"),
                        new EmployeeDTO("Peter Goeking", "it"),
                        new EmployeeDTO("Peter Goeking", "finance"),
                        new EmployeeDTO("George Smith", "packaging")));

        mockMvc.perform(get("/employees")
                .param("department", "packaging"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(1))
                .andExpect(jsonPath("$[0].name").value("George Smith"))
                .andExpect(jsonPath("$[0].department").value("packaging"));

    }
}
