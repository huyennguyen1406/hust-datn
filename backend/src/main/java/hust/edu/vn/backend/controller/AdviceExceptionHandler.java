package hust.edu.vn.backend.controller;

import hust.edu.vn.backend.exception.ApiStatusException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
@Slf4j
public class AdviceExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ProblemDetail> unexpectedExceptionHandler(
            RuntimeException ex,
            HttpServletRequest request) {
        log.error(ex.getMessage(), ex);
        ProblemDetail problemDetail = ProblemDetail.forStatus(500);
        problemDetail.setTitle("Internal Server Error");
        problemDetail.setDetail(ex.getMessage());
        enrich(problemDetail, request, HttpStatus.INTERNAL_SERVER_ERROR.name());
        return ResponseEntity.status(500).body(problemDetail);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpServletRequest request
    ) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("Bad Request");
        problem.setDetail("Invalid request body");

        enrich(problem, request, "VALIDATION_ERROR");

        List<Map<String, String>> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> Map.of(
                        "field", err.getField(),
                        "message", Objects.requireNonNullElse(
                                err.getDefaultMessage(),
                                "Validation failed")
                ))
                .toList();

        problem.setProperty("errors", errors);

        return ResponseEntity.badRequest().body(problem);
    }

    @ExceptionHandler(ApiStatusException.class)
    public ResponseEntity<ProblemDetail> handleResponseStatusException(
            ApiStatusException ex,
            HttpServletRequest request
    ) {
        HttpStatusCode status = ex.getStatus();
        ProblemDetail problem = ProblemDetail.forStatus(status);
        problem.setTitle(ex.getTitle());
        problem.setDetail(ex.getMessage());
        enrich(problem, request, ex.getSystemCode());
        return ResponseEntity.status(status).body(problem);
    }

    private void enrich(
            ProblemDetail problem,
            HttpServletRequest request,
            String code) {
        problem.setProperty("timestamp", Instant.now());
        problem.setProperty("path", request.getRequestURI());
        problem.setProperty("code", code);
        problem.setProperty("traceId", request.getHeader("X-Trace-Id"));
    }

}
