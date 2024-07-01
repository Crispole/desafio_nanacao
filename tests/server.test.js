const request = require('supertest')
const server = require('../index.js')

describe('Operaciones CRUD de cafes', () => {
    it('GET /cafes => devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto.', async () => {
        const response = await request(server).get("/cafes");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).not.toHaveLength(0);
})

    it('DELETE /cafes/:id => Obtiene un código 404 al intentar eliminar un café con un id que no existe', async () => {
        const jwt = 'token';
        const nonExistentCafeId = 9999;
        const response = await request(server)
            .delete(`/cafes/${nonExistentCafeId}`)
            .set('Authorization', `Bearer ${jwt}`);
        expect(response.statusCode).toBe(404);
})

    it('POST /cafes => Agrega un nuevo cafe y devuelve un código 201', async () => {
        const cafe = { id: 6, nombre: "Nuevo Café" };
        const response = await request(server)
            .post("/cafes")
            .send(cafe);
        const cafes = response.body;
        const statusCode = response.statusCode;
            expect(cafes).toContainEqual(cafe);
            expect(statusCode).toBe(201);
    });
})

    it('PUT /cafes/:id => Devuelve un status code 400 al intentar actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload', async () => {
        const idEnUrl = 9;
        const cafeActualizado = { id: 10, nombre: 'Café Actualizado' };
        const respuesta = await request(server)
            .put(`/cafes/${idEnUrl}`)
            .send(cafeActualizado);
        expect(respuesta.statusCode).toBe(400);
})