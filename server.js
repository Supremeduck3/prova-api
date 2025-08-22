import express from "express"
import princesas from "./src/data/princesas.js";

const app = express();
app.use(express.json());
const port = 3000

app.get("/",(req, res) => {
    res.send("Bem vindo ao mundo das princesas!")
})

app.listen(port, () =>{
    console.log(`O servidor está rodando em http://localhost:${port}`)
})

app.get("/princesas", (req,res) => {
    res.send(princesas)
})
app.get("/princesas/:id", (req, res)=>{
    let id = parseInt(req.params.id);
    const princess = princesas.find(b => b.id === id);

    if(princess){
        res.json({
            sucess:true,
            message:`Sua princesa foi achada!`,
            data: princess
        })
    }else{
        res.status(404).json({
            sucess:false,
            error:"Sua princesa não foi achada",
            message:`nenhuma princesa com esse id foi encontrada ${id}`
        });
    }
});
app.get("/princesas/nome/:nome", (req, res)=>{
    let nome = req.params.nome.toLowerCase();
    const nomeprincesa = princesas.filter(b => b.nome.toLowerCase().includes(nome));

    if (nomeprincesa.length > 0){
        res.status(200).json(nomeprincesa);
    }else{
        res.status(404).json({error})
        console.log("Não foi possivel encotrar uma princesa com esse nome!")
    }
    });
app.get("/princesas/reino/:reino", (req, res)=>{
    let reino = req.params.reino.toLowerCase();
    const reinodaprincessa = princesas.filter(b => b.reino.toLowerCase().includes(reino));

    if (reinodaprincessa.length > 0){
        res.status(200).json(reinodaprincessa);
    }else{
        res.status(404).json({error})
        console.log("Não foi possivel encotrar uma princesa com esse nome!")
    }
    });
    app.get("/princesas/ativas/sim", (req, res)=>{
    const ativa = princesas.filter(a => a.ativa);
    if(ativa == true){
        res.status(200).json(ativa);
    }else{
        res.status(404).json({error})
    }

});