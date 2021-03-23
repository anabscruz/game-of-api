const gameApi = require('../../server');
const request = require("supertest");

var tempId;

var currentTargaryanLord = {
    "name": "Daenerys Targaryen",
    "seasons":[1,2,3,4,5,6,7,8]
}

var houseTargaryan = {
    "name": "House Targaryen of King's Landing",
    "region": "The Crownlands",
    "founded": "House Targaryen: >114 BCHouse Targaryen of King's Landing:1 AC",
    "currentLord": currentTargaryanLord
};

var currentBoltonLord = {
    "name": "Ramsay Bolton",
    "seasons":[3,4,5,6]
}

var houseBolton = {
    "name": "House Bolton of the Dreadfort",
    "region": "The Noerth",
    "founded": "NA",
    "currentLord": currentBoltonLord
};

describe("POST /house ", () => {
    test("O atual lord deve ser um objeto com nome e temporadas em que apareceu", async () => {
        const body = houseTargaryan;
        const response = await request(gameApi).post("/house").send(body);
        tempId = response.body._id;
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /houseById ", () => {
    test("Deve retornar dados da casa buscada por ID", async () => {
        const response = await request(gameApi).get(`/houseById/${tempId}`);
        expect(response.body._id).toEqual(tempId);
        expect(response.statusCode).toBe(200);
    });

    test("O atual lord deve conter um array com as temporadas em que apareceu", async () => {
        const response = await request(gameApi).get(`/houseById/${tempId}`);
        expect(response.body.currentLord.seasons).toEqual(expect.arrayContaining(houseTargaryan.currentLord.seasons));
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /houseByName ", () => {
    test("Deve retornar dados da casa buscada por nome", async () => {
        const response = await request(gameApi).get(`/houseByName/${houseTargaryan.name}`);
        expect(response.body.name).toEqual(houseTargaryan.name);
        expect(response.statusCode).toBe(200);
    });
});

//Atualizar para PUT
describe("PUT /houseByName ", () => {
    test("Deve atualizar dados da casa", async () => {
        currentLord = {
            "name": "Aegon Targaryen",
            "seasons":[1,2,3,4,5,6,7,8]
        }

        houseTargaryan.currentLord = currentLord;

        const response = await request(gameApi).put(`/house/${tempId}`).send(houseTargaryan);
        expect(response.body.currentLord.name).toEqual("Aegon Targaryen");
        expect(response.statusCode).toBe(200);

        houseTargaryan = response.body;
    });
});

describe("POST /house ", () => {
    test("Inserindo casa Bolton", async () => {
        const body = houseBolton;
        const response = await request(gameApi).post("/house").send(body);
        tempId = response.body._id;
        expect(response.statusCode).toBe(200);

        houseBolton = response.body;
    });
});

describe("GET /houses ", () => {
    test("Busca de casas -> a casa incluída deve estar na lista retornada", async () => {
        const response = await request(gameApi).get(`/houses`);
        expect(response.body).toEqual(
            expect.arrayContaining([houseTargaryan])
        );
        expect(response.body).toEqual(
            expect.arrayContaining([houseBolton])
        );
        expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /house ", () => {
    test("A casa deve ser excluída", async () => {
        const response = await request(gameApi).delete(`/house/${tempId}`);
        expect(response.body.message).toEqual("A casa foi extinta :´(");
        expect(response.statusCode).toBe(200);
    });

    // como não tem tratamento para evitar de inserir mais de uma vez a mesma casa, 
    // estou considerando aqui o ID e não o nome da casa
    test("Se a casa não existem, não deve mais ser encontrada na busca", async () => {
        const response = await request(gameApi).get(`/houseById/${tempId}`);
        expect(response.body).toBeNull();
        expect(response.statusCode).toBe(200);
    });
});