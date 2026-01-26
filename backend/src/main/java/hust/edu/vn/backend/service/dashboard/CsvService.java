package hust.edu.vn.backend.service.dashboard;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CsvService {

    public byte[] generateCsv(
            List<String> headers,
            List<List<String>> rows
    ) throws IOException {

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             PrintWriter writer = new PrintWriter(new OutputStreamWriter(baos, StandardCharsets.UTF_8), true)) {
            // UTF-8 BOM for Excel
            writer.write('\uFEFF');
            writer.println(String.join(",", escape(headers)));

            for (List<String> row : rows) {
                writer.println(String.join(",", escape(row)));
            }

            writer.flush();
            return baos.toByteArray();
        }
    }

    private List<String> escape(List<String> values) {
        return values.stream()
                .map(v -> {
                    if (v == null) return "";
                    if (v.contains(",") || v.contains("\"") || v.contains("\n")) {
                        return "\"" + v.replace("\"", "\"\"") + "\"";
                    }
                    return v;
                })
                .toList();
    }

    public List<String> parseLine(String line) {
        List<String> result = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (char c : line.toCharArray()) {
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                result.add(current.toString().trim());
                current.setLength(0);
            } else {
                current.append(c);
            }
        }

        result.add(current.toString().trim());
        return result;
    }

    public boolean matchHeaders(List<String> expected, List<String> actual) {
        if (CollectionUtils.isEmpty(expected) || CollectionUtils.isEmpty(actual)) {
            return false;
        }

        if (expected.size() != actual.size()) {
            return false;
        }

        for (int i = 0; i < expected.size(); i++) {
            if (!Objects.equals(normalize(expected.get(i)), normalize(actual.get(i)))){
                return false;
            }
        }
        return true;
    }

    private String normalize(String value) {
        if (value == null) {
            return "";
        }

        // Remove UTF-8 BOM (Excel issue)
        if (!value.isEmpty() && value.charAt(0) == '\uFEFF') {
            value = value.substring(1);
        }

        return value.trim();
    }
}
