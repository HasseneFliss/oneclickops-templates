package com.{{GITHUB_ORG}}.{{PROJECT_NAME_SNAKE}}

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.*
import org.springframework.http.HttpStatus
import java.util.UUID

@SpringBootApplication
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}

data class Item(
    val id: String = UUID.randomUUID().toString(),
    val name: String,
    val description: String? = null,
    val price: Double = 0.0,
    val isActive: Boolean = true
)

data class HealthResponse(
    val status: String = "healthy",
    val service: String = "{{PROJECT_NAME}}",
    val version: String = "1.0.0"
)

@RestController
class MainController {
    private val items = mutableListOf<Item>()

    @GetMapping("/")
    fun root() = HealthResponse()

    @GetMapping("/health")
    fun health() = HealthResponse()

    @GetMapping("/ready")
    fun ready() = mapOf("status" to "ready")

    @GetMapping("/items")
    fun listItems() = items

    @GetMapping("/items/{id}")
    fun getItem(@PathVariable id: String) = items.find { it.id == id }
        ?: throw ItemNotFoundException("Item not found")

    @PostMapping("/items")
    @ResponseStatus(HttpStatus.CREATED)
    fun createItem(@RequestBody item: Item): Item {
        val newItem = item.copy(id = UUID.randomUUID().toString())
        items.add(newItem)
        return newItem
    }
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class ItemNotFoundException(message: String) : RuntimeException(message)
