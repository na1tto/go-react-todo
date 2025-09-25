package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todo struct {
	ID        int    `json:"id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

func main() {

	fmt.Println("Hello World!")
	app := fiber.New()

	todos := []Todo{}

	app.Get("/", func(c *fiber.Ctx) error {

		return c.Status(200).JSON(fiber.Map{"msg": "hello world"})
	})

	// insere uma todo na lista (endpoint)
	app.Post("/api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{} // {id = 0, completed = false, body = ""}

		if err := c.BodyParser(todo); err != nil {
			return err
		}
		
		// se o corpo da request for vazio
		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error":"Todo body is required"})
		}

		// atribui o id da todo e insere na lista de todos
		todo.ID = len(todos) + 1
		todos = append(todos, *todo)

		// indica que um item foi criado
		return c.Status(201).JSON(todo)
	})

	// Atualiza uma todo - torna-se completa (endpoint)
	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {

		id := c.Params("id")

		for i, todo := range todos {
			if fmt.Sprint(todo.ID) == id {
				todos[i].Completed = true
				return c.Status(200).JSON(todos[i])
			}
		}

		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	})

	log.Fatal(app.Listen(":4000"))
}
