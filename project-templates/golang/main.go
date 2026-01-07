package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Item struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description,omitempty"`
	Price       float64 `json:"price"`
	IsActive    bool    `json:"isActive"`
}

type HealthResponse struct {
	Status  string `json:"status"`
	Service string `json:"service"`
	Version string `json:"version"`
}

var items []Item

func main() {
	r := gin.Default()

	// Health endpoints
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, HealthResponse{Status: "healthy", Service: "{{PROJECT_NAME}}", Version: "1.0.0"})
	})
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, HealthResponse{Status: "healthy", Service: "{{PROJECT_NAME}}", Version: "1.0.0"})
	})
	r.GET("/ready", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ready"})
	})

	// CRUD endpoints
	r.GET("/items", func(c *gin.Context) {
		c.JSON(http.StatusOK, items)
	})
	r.GET("/items/:id", func(c *gin.Context) {
		id := c.Param("id")
		for _, item := range items {
			if item.ID == id {
				c.JSON(http.StatusOK, item)
				return
			}
		}
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
	})
	r.POST("/items", func(c *gin.Context) {
		var item Item
		if err := c.ShouldBindJSON(&item); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		item.ID = uuid.New().String()
		items = append(items, item)
		c.JSON(http.StatusCreated, item)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "{{SERVICE_PORT}}"
	}
	r.Run(":" + port)
}
