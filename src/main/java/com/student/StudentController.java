package com.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository repository;

    @GetMapping
    public List<Student> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Student add(@RequestBody Student student) {
        return repository.save(student);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        repository.deleteById(id);
        return "Deleted";
    }
}
