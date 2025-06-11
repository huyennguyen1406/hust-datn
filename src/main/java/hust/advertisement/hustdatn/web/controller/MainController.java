package hust.advertisement.hustdatn.web.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/")
    public String dashboard(HttpServletRequest request, Model model) {
        return mappingModelAttributes(model, request, "/pages/misc/dashboard");
    }

    @GetMapping("/user")
    public String user(HttpServletRequest request, Model model) {
        return mappingModelAttributes(model, request, "/pages/misc/user");
    }

    @GetMapping("/product")
    public String productPage(HttpServletRequest request, Model model) {
        return mappingModelAttributes(model, request, "/pages/misc/product");
    }

    @GetMapping("/setting")
    public String setting(HttpServletRequest request, Model model) {
        return mappingModelAttributes(model, request, "/pages/misc/setting");
    }

    @GetMapping("/login")
    public String login(HttpServletRequest request, Model model) {
        return mappingModelAttributes(model, request, "/pages/misc/login");
    }

    private String mappingModelAttributes(Model model, HttpServletRequest request, String page) {
        model.addAttribute("request", request);
        return page;
    }
}
