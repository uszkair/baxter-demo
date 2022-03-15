package hu.baxter.demo.configuration;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import hu.baxter.demo.exceptions.EmptyEmployeeListException;
import hu.baxter.demo.models.EmployeeDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.util.ResourceUtils;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.List;

@Configuration
public class EmployeeXmlReader {

    /**
     * Read employees from a XML file which is on the classpath.
     *
     *
     * @return a list of employees
     * @throws Exception while xml processing
     */
    @Bean
    public List<EmployeeDTO> employeeDTOList() throws Exception {
        InputStream is = new BufferedInputStream(new FileInputStream(ResourceUtils.getFile("classpath:templates/employee.xml")));
        List<EmployeeDTO> employeeDTOList = new XmlMapper().readValue(is, new TypeReference<List<EmployeeDTO>>() {
        });

        if(employeeDTOList == null){
            throw new EmptyEmployeeListException("Trouble trying to load in the 'employee.xml' file to processing");
        }
        return employeeDTOList;
    }
}
