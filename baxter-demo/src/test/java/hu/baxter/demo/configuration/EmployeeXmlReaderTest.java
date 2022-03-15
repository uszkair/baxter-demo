package hu.baxter.demo.configuration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@SpringBootTest
public class EmployeeXmlReaderTest {

    @Autowired
    private EmployeeXmlReader employeeXmlReader;

    @Test
    public void testXmlAttribute() throws Exception {
        Path relPath = Paths.get("src", "test", "resources","templates", "employee.xml");
        String content = null;
        try {
            content = Files.lines(relPath).collect(Collectors.joining(System.lineSeparator()));
            System.out.println(content);
        } catch (IOException e) {
            e.printStackTrace();
        }
        assertTrue(true);
    }

    @Test
    public void testEmployeeXmlReader() throws Exception {
        assertFalse(employeeXmlReader.employeeDTOList().isEmpty());
        assertTrue(employeeXmlReader.employeeDTOList().size() == 10);
    }



}
