package hu.baxter.demo.comparators;

import hu.baxter.demo.models.EmployeeDTO;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Objects;
import java.util.StringTokenizer;
import java.util.function.Function;

public class SortedByName implements Comparator<EmployeeDTO> {

    @Override
    public int compare(EmployeeDTO o1, EmployeeDTO o2) {

        String o1FirstName = o1.getName().split(" ")[0];
        String o1LastName = o1.getName().split(" ")[1];

        String o2FirstName = o2.getName().split(" ")[0];
        String o2LastName = o2.getName().split(" ")[1];


        int result = Objects.compare(o1FirstName, o2FirstName, Comparator.naturalOrder());

        if (result != 0) {
            return result;
        }

        result = Objects.compare(o1LastName, o2LastName, Comparator.naturalOrder());
        if (result != 0) {
            return result;
        }

        return 0;
    }


}