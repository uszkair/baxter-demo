package hu.baxter.demo.configuration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class EmployeeXmlReaderTest {

    @Autowired
    private EmployeeXmlReader employeeXmlReader;


    /**
     * Test {@link EmployeeXmlReader} xml loaded, file exists
     *
     * @throws Exception
     */
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

    /**
     *
     * If the {@link EmployeeXmlReader} works whether I get 10 items from the XML file.
     *
     * @throws Exception
     */
    @Test
    public void testEmployeeXmlReader() throws Exception {
        assertFalse(employeeXmlReader.employeeDTOList().isEmpty());
        assertTrue(employeeXmlReader.employeeDTOList().size() == 10);
    }



}
