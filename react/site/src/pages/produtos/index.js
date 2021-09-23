import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import LoadingBar from 'react-top-loading-bar'




import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'
import { useState, useEffect, useRef } from 'react';

import Api from '../../service/api';
const api = new Api ();



export default function Index() {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [avaliação, setAvaliação] = useState('');
    const [preçoDE, setPreçoDE] = useState('');
    const [preçoPOR, setPreçoPOR] = useState('');
    const [estoque, setEstoque] = useState('');
    const [imagem, setImagem] = useState('');
    const [descrição, setDescrição] = useState('');
    const [AlterarId, setAlterarId] = useState(0);
    const loading = useRef(null);


    async function listar() {
     let r = await api.listar(); 
     setProdutos(r);
     loading.current.complete();

    }

    async function inserir() {
        if (AlterarId === 0) {
        let r = await api.inserir(nome, categoria, preçoDE, preçoPOR, avaliação, descrição, estoque, imagem);

        if (r.erro) {
            toast.error(`${r.erro} `);
            return;
        }
        else 
        toast.dark('💕 Produto Inserido!');
        
    } else {
        let r = await api.alterar(AlterarId, nome, categoria, preçoDE, preçoPOR, avaliação, descrição, estoque, imagem);


        if(r.erro) {
        toast.error(`${r.erro}`);    }
            
        toast.dark('💕 Produto Alterado!');
}
    limparCampos();
    listar();

}
    
    function limparCampos() {
        setNome('');
        setCategoria('');
        setAvaliação('');
        setPreçoDE('');
        setPreçoPOR('');
        setEstoque('');
        setImagem('');
        setDescrição('');
        setAlterarId(0);
    }

    async function remover(id) {
        confirmAlert({
            title: 'Remover Produto',
            message: `Tem certeza que deseja remover o produto ${id}?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                    
                    let r = await api.remover(id);
                    if (r.erro)
                    toast.error(`${r.erro}`);
                    else {
                        toast.dark('💕Produto removido!');
                        listar();

                    }

                    }
                },
            {
                label: 'Não'
            }
            ]
        });
    }

    async function editar(item) {
        setNome(item.nm_produto);
        setCategoria(item.ds_categoria);
        setAvaliação(item.vl_avaliacao);
        setPreçoDE(item.vl_preco_de);
        setPreçoPOR(item.vl_preco_por);
        setEstoque(item.qtd_estoque);
        setAlterarId(item.id_produto);
        setImagem(item.img_produto);
        setDescrição(item.ds_produto);
    }

    useEffect(() => {
        listar();
    }, [])

    return (
        <Container>
            <ToastContainer />
            <LoadingBar color='#EA10C7' ref={loading} />
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div class="body-right-box">
                    <div class="new-produto-box">
                        
                        <div class="text-new-produto">
                            <div class="bar-new-produto"></div>
                            <div class="text-new-produto"> { AlterarId === 0 ? "Novo Produto" : "Alterando Produto " + AlterarId }</div>
                        </div>

                        <div class="input-new-produto"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-produto"> Nome: </div>  
                                    <div class="input"> <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> </div>
                                    <div class="number-produto1"> Preço DE:</div> 
                                    <div class="input"> <input type="text" value={preçoDE} onChange={e => setPreçoDE(e.target.value)}/> </div> 
                                </div> 
                                <div class="agp-input">
                                    <div class="number-produto"> Categoria: </div>  
                                    <div class="input"> <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)}/> </div> 
                                    <div class="number-produto1"> Preço POR: </div>  
                                    <div class="input"> <input type="text" value={preçoPOR} onChange={e => setPreçoPOR(e.target.value)} /> </div> 
                                </div>

                                <div class="agp-input">
                                    <div class="number-produto"> Avaliação: </div>  
                                    <div class="input"> <input type="text" value={avaliação} onChange={e => setAvaliação(e.target.value)} /> </div> 
                                    <div class="number-produto1"> Estoque: </div>  
                                    <div class="input"> <input type="text" value={estoque} onChange={e => setEstoque(e.target.value)} />  </div>
                                </div>
                            </div>

                     

                            <div class="agp-input">
                            <div class="Link"> Link Imagem:</div>  
                            <div class="imagem"> <input  type="text" value={imagem} onChange={e => setImagem(e.target.value)}/> </div> 
                            </div>
                            
                            
                            <div class="agp-input"> 
                            <div class="descrição-produto">  Descrição: </div>
                            <div class="descrição">  <textarea type="text" value={descrição} onChange={e => setDescrição(e.target.value)} /> </div>
                            <div class="button-create"> <button onClick={inserir}> {AlterarId === 0 ? "Cadastrar" : "Alterar"} </button> </div>
                            </div>

                                
                            
                        </div>
                    </div>
                    
          
                    <div class="produto-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-produto"> </div>
                            <div class="text-registered-produto"> Produtos Cadastrados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th> ID </th>
                                    <th> Produto </th>
                                    <th> Categoria </th>
                                    <th> Preço </th>
                                    <th> Estoque </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {produtos.map((item, i) =>
                                <tr className={i % 2 === 0 ? "linha-alternada" : ""}>
                                <td> <img src={item.img_produto} style={{width:"100px", height:"100px"} } /></td>
                                <td> {item.id_produto} </td>
                                <td title={item.nm_produto}> {item.nm_produto != null && item.nm_produto.length >= 25 ? item.nm_produto.substr(0, 25) + '...' : item.nm_produto }  </td>
                                <td> {item.ds_categoria} </td>
                                <td> {item.vl_preco_por} </td>
                                <td> {item.qtd_estoque} </td>
                                <td className="coluna-acao"> <button onClick={() => editar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                <td className="coluna-acao"> <button onClick={() => remover(item.id_produto)}> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                            </tr>
                                
                                )}
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
