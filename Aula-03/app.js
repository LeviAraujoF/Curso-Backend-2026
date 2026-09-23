const port = 3000;

const express = require("express");

const app = express();

app.use(express.json());

let pecas = [
    {
        id: 1,
        nome: "Processador Ryzen 5 5600",
        marca: "AMD",
        preco: 850,
        categoria: "Processador"
    },
    {
        id: 2,
        nome: "Processador Core i5 12400F",
        marca: "Intel",
        preco: 980,
        categoria: "Processador"
    },
    {
        id: 3,
        nome: "Placa de Vídeo RTX 4060",
        marca: "NVIDIA",
        preco: 2200,
        categoria: "Placa de Vídeo"
    },
    {
        id: 4,
        nome: "Placa de Vídeo RX 7600",
        marca: "AMD",
        preco: 1850,
        categoria: "Placa de Vídeo"
    },
    {
        id: 5,
        nome: "Memória RAM 16GB DDR4",
        marca: "Kingston",
        preco: 290,
        categoria: "Memória RAM"
    },
    {
        id: 6,
        nome: "SSD NVMe 1TB",
        marca: "Kingston",
        preco: 430,
        categoria: "SSD"
    },
    {
        id: 7,
        nome: "Fonte 650W 80 Plus Bronze",
        marca: "Corsair",
        preco: 400,
        categoria: "Fonte"
    },
    {
        id: 8,
        nome: "Placa-Mãe B550M",
        marca: "Gigabyte",
        preco: 690,
        categoria: "Placa-Mãe"
    },
    {
        id: 9,
        nome: "Cooler AG400",
        marca: "DeepCool",
        preco: 150,
        categoria: "Cooler"
    },
    {
        id: 10,
        nome: "Gabinete Gamer",
        marca: "Redragon",
        preco: 330,
        categoria: "Gabinete"
    }
];

// GET - Listar todas as peças
app.get("/getAllPecas", (req, res) => {

    console.log("Listaram todas as peças");

    res.status(200).json({
        success: true,
        erro: 0,
        message: "Peças listadas com sucesso",
        data: pecas
    });

});

// POST - Criar nova peça
app.post("/createNewPeca", (req, res) => {

    const newPeca = req.body;

    if (!newPeca || newPeca == "") {
        console.log("Impossível criar nova peça, body vazio");

        res.status(500).json({
            success: false,
            erro: 666,
            message: "Falha ao criar nova peça"
        });

        return;
    }

    pecas.push(newPeca);

    res.status(201).json({
        success: true,
        erro: 0,
        message: "Peça criada com sucesso",
        data: newPeca
    });

});

// PUT - Atualizar peça
app.put("/updatePeca/:id", (req, res) => {

    const idPeca = parseInt(req.params.id);
    const pecaUpdate = req.body;

    const pecaIndex = pecas.findIndex(peca => peca.id === idPeca);

    if (pecaIndex !== -1) {

        pecas[pecaIndex] = pecaUpdate;

        res.status(202).json({
            success: true,
            erro: 0,
            message: "Peça atualizada com sucesso",
            data: pecaUpdate
        });

        return;
    }

    res.status(500).json({
        success: false,
        erro: 667,
        message: "Peça não existe na base"
    });

});

// DELETE - Deletar peça
app.delete("/deletePeca/:id", (req, res) => {

    const idDelete = parseInt(req.params.id);

    const pecaIndex = pecas.findIndex(peca => peca.id === idDelete);

    if (pecaIndex !== -1) {

        pecas.splice(pecaIndex, 1);

        res.status(200).json({
            success: true,
            erro: 0,
            message: "Peça deletada com sucesso"
        });

        return;
    }

    res.status(500).json({
        success: false,
        erro: 667,
        message: "Peça não existe na base"
    });

});

app.listen(port, () => {
    console.log(`Aplicação na porta ${port}`);
});