package hu.baxter.demo.exceptions;

public class EmptyEmployeeListException extends Exception{
    public EmptyEmployeeListException(String message) {
        super(message);
    }
}
