import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())


app.get('/produto', async (req, resp) => {
    try {
        let produtos = await db.tb_produto.findAll({order:[['id_produto', 'desc']] });
        resp.send(produtos);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!'})
             
        
    }
})

app.post('/produto', async (req, resp) => {
    try {
      let { produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo, inclusao } = req.body;
      let ProdutoRepetido = await db.tb_produto.findOne({where: { nm_produto: produto } });

      if (produto == "" || categoria == "" || precode == "" || precopor == "" || avaliacao == "" || descricao == "" || estoque == "" 
      || imagem == "" || ativo == "" || inclusao == "")
      return resp.send({ erro: 'Informe os campos necessários'})

      if  (isNaN(Number(estoque)))
      return resp.send({ erro: 'Somente números em Avaliação, Preços, Estoque'})

      if  (isNaN(Number(avaliacao)))
      return resp.send({ erro: 'Somente números em Avaliação, Preços, Estoque'})

      if  (isNaN(Number(precopor)))
      return resp.send({ erro: 'Somente números em Avaliação, Preços, Estoque'})

      if  (isNaN(Number(precode)))
      return resp.send({ erro: 'Somente números em Avaliação, Preços, Estoque'})
      
      if (ProdutoRepetido != null)
      return resp.send({ erro: 'Produto Já registrado'})
    
      
      
      else {
        
      let r = await db.tb_produto.create({
        nm_produto: produto,
        ds_categoria: categoria,
        vl_preco_de: precode,
        vl_preco_por: precopor,
        vl_avaliacao: avaliacao,
        ds_produto: descricao,
        qtd_estoque: estoque,
        img_produto: imagem,
        bt_ativo: ativo,
        dt_inclusao: new Date

      })
      resp.send(r);
      }
      
    } catch(e){
        resp.send({erro: e.toString()})
    }
     
})


app.put('/produto/:id', async(req, resp) => {
    try {
        let { produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo } = req.body;
        let { id } = req.params;
        let r = await db.tb_produto.update(
            {
            nm_produto: produto,
            ds_categoria: categoria,
            vl_preco_de: precode,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: ativo,
            dt_inclusao: new Date

            },
            {
                where: { id_produto: id}
            }
            
        )
        resp.sendStatus(200);
    } catch(e) {
        resp.send({ erro: e.toString() })

    }
})


app.delete('/produto/:id', async (req, resp) => {
    try {
        let { id } = req.params;

        let r = await db.tb_produto.destroy({ where: {id_produto: id}  })
        resp.sendStatus(200);
    }catch (e) {
        resp.send({ erro: e.toString()  })
    }
})



    






app.listen(process.env.PORT,

x => console.log(`Server up at port ${process.env.PORT}`))