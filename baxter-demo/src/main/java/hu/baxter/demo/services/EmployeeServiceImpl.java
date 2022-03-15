package hu.baxter.demo.services;

import hu.baxter.demo.models.EmployeeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    List<EmployeeDTO> employeeDTOList;

    @Autowired
    public EmployeeServiceImpl(List<EmployeeDTO> employeeDTOList) {
        this.employeeDTOList = employeeDTOList;
    }

    @Override
    public List<EmployeeDTO> list() {
        return employeeDTOList;
    }
}
