package hust.edu.vn.backend.utility;

import lombok.experimental.UtilityClass;

import java.util.function.Supplier;

@UtilityClass
public class ObjectUtility {
    public <T> T getMethod(Supplier<T> supplier) {
        try {
            return supplier.get();
        } catch (Exception e) {
            return null;
        }
    }

    public boolean isAnyNotNull(Object... object) {
        for (Object o : object) {
            if (o != null) {
                return true;
            }
        }
        return false;
    }
}
