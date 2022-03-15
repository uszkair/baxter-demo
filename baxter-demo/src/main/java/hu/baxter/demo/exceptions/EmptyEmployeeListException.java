package hu.baxter.demo.exceptions;

/**
 *
 * If the employee XML processing is throwed
 *
 * @author robi
 */
public class EmptyEmployeeListException extends Exception{
    public EmptyEmployeeListException(String message) {
        super(message);
    }
}
